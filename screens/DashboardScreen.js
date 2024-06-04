import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import TimePicker from '../components/TimePicker';
import AppTextInput from '../components/AppTextInput';
import { useUser } from '../contexts/UserContext'; // Import the useUser hook
import axios from 'axios';

const Spacing = {
  small: 8,
  medium: 16,
  large: 24,
};

const Colors = {
  primary: '#007bff',
  lightGray: '#f0f0f0',
  gray: '#cccccc',
};

const FontSize = {
  small: 14,
  medium: 16,
  large: 20,
};

const Font = {
  'poppins-bold': 'Poppins-Bold',
  'poppins-regular': 'Poppins-Regular',
};

const DashboardScreen = ({ navigation }) => {
  const { user } = useUser(); // Access user context
  const [remarks, setRemarks] = useState('');

  const handleSaveRemarks = async () => {
    if (!user || !user.email) {
      Alert.alert('Error', 'User not logged in');
      return;
    }

    try {
      const response = await axios.post('http://192.168.85.11:5001/save-remarks', { email: user.email, remarks });
      if (response.data.status === 'success') {
        Alert.alert('Success', 'Remarks saved successfully');
      } else {
        Alert.alert('Error', response.data.data);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={[styles.text, { fontSize: 25, marginLeft: 15, fontWeight: 'bold' }]}>Time</Text>
        <TimePicker />
        
        <View>
          <Text style={[{ bottom: 40, top: 10, fontSize: 20, marginLeft: 15, fontWeight: 'bold', marginTop:10,marginBottom:20 }]}>Remarks And Symptoms</Text>
          <AppTextInput
            placeholder="Remarks / Symptoms" 
            value={remarks}
            onChangeText={setRemarks}
            multiline
          />
        </View>
      </View>

      <View>
        <TouchableOpacity onPress={handleSaveRemarks} style={styles.saveButton}>
          <Text style={styles.buttonText}>Save Remarks</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity onPress={() => navigation.navigate("calander")} style={styles.calendarButton}>
          <Text style={styles.buttonText}>Calendar</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity onPress={() => navigation.navigate("FeedBack")} style={styles.feedback}>
          <Text style={styles.feedback1}>FeedBack</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.large,
  },
  section: {
    top: 50,
    padding: 10,
    marginBottom: Spacing.small,
  },
  feedback: {
    backgroundColor: '#5618db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedback1: {
    textAlign: 'center',
    color: 'white',
    fontSize: FontSize.medium,
  },
  calendarButton: {
    backgroundColor: '#5618db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#5618db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: FontSize.medium,
  },
  text: {
    fontSize: 50,
  },
});

export default DashboardScreen;
