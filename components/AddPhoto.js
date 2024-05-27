import React, { useState } from 'react';
import { View, Button, StyleSheet, ScrollView, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddPhoto = () => {
  const [rgbValues, setRgbValues] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const extractRgbValues = async () => {
    try {
      if (!selectedImage) {
        console.error('No image selected');
        return;
      }

      const formData = new FormData();
      formData.append('image', { uri: selectedImage.uri, name: 'image.jpg', type: 'image/jpeg' });

      const response = await fetch('http://192.168.0.8:5000/app', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setRgbValues(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImage(result);
        setRgbValues([]); // Clear previous RGB values when a new image is selected
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImage(result);
        setRgbValues([]); // Clear previous RGB values when a new image is selected
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Pick an Image" onPress={pickImage} />
        <Button title="Take a Photo" onPress={takePhoto} />
      </View>
      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage.uri }} style={styles.image} />
          <Button title="Extract RGB Values" onPress={extractRgbValues} />
        </View>
      )}
      {/* Display RGB values */}
      <ScrollView style={styles.rgbContainer}>
        {rgbValues.map((rgb, index) => (
          <Text key={index} style={styles.rgbText}>{`RGB(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`}</Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 10,
  },
  rgbContainer: {
    maxHeight: 200,
  },
  rgbText: {
    fontSize: 16,
    marginVertical: 2,
  },
});

export default AddPhoto;
