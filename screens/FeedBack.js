import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppTextInput from '../components/AppTextInput';
import Spacing from '../constants/Spacing';
import Font from '../constants/Font';
import FontSize from '../constants/FontSize';

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmitFeedback = () => {
    // Implement submission logic (e.g., send feedback to server)
    console.log('Rating:', rating);
    console.log('Feedback:', feedback);
    // Reset state after submission
    setRating(0);
    setFeedback('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((index) => (
          <TouchableOpacity key={index} onPress={() => handleRating(index)}>
            <Ionicons
              name={index <= rating ? 'star' : 'star-outline'}
              size={32}
              color={index <= rating ? 'gold' : 'gray'}
            />
          </TouchableOpacity>
        ))}
      </View>
      <AppTextInput
        placeholder="Enter your feedback"
        value={feedback}
        onChangeText={setFeedback}
        multiline
        style={styles.feedbackInput}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitFeedback}>
        <Text style={styles.submitButtonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    top: 50,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    top: 50,
  },
  feedbackInput: {
    borderWidth: 3,
    borderColor: '#f1f3ff',
    shadowOffset: { width: 4, height: Spacing },
    fontFamily: Font['poppins-regular'],
    fontSize: FontSize.medium,
    padding: Spacing * 2,
    backgroundColor: '#f1f3ff',
    borderRadius: Spacing,
    marginVertical: Spacing,
    width: 310,
    top: 40,
    textAlign: 'center',
    shadowColor: '#007bff', // Using a static value for Colors.primary
    shadowOpacity: 0.2,
    shadowRadius: Spacing,
  },
  submitButton: {
    backgroundColor: '#5618db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    top: 50,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FeedbackPage;
