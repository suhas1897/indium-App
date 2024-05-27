import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import TimePicker from '../components/TimePicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import AppTextInput from '../components/AppTextInput';
import AddPhoto from '../components/AddPhoto';

type Props = NativeStackScreenProps<RootStackParamList, "FeedBack">;

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

const DashboardScreen: React.FC<Props> = ({ navigation: { navigate }}) => {
  const [remarks, setRemarks] = useState('');

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
        <TouchableOpacity onPress={() => navigate("calander")} style={styles.calendarButton}>
          <Text style={styles.buttonText}>Calendar</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity onPress={() => navigate("FeedBack")} style={styles.feedback}>
          <Text style={styles.feedback1}>FeedBack</Text>
        </TouchableOpacity>
      </View>

      <View>
        <AddPhoto />
        
        
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
  buttonText: {
    color: 'white',
    fontSize: FontSize.medium,
  },
  text: {
    fontSize: 50,
  },
  addpicker: {
    // backgroundColor: 'black',
  },
});

export default DashboardScreen;
