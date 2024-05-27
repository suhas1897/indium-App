import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import DatePicker from "../components/DatePicker";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import AppTextInput from "../components/AppTextInput";
import Calander from "../components/Calander";
import registercal from "../components/Registercal";
import Registercal from "../components/Registercal";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');

  const validateEmail = (email: string) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handleSignUp = () => {
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Proceed with sign-up process
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Create account</Text>
            </View>
            <View style={styles.inputContainer}>
              <AppTextInput placeholder="Full Name" />
              <AppTextInput
                placeholder="Email"
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
                style={styles.input}
              />
              <AppTextInput placeholder="Phone Number" /> 
              
            </View>
            <View style={styles.inputContainer}>
            <Registercal />
              {/* <DatePicker  value={dob} onChangeText={setDob}  />  */}
              <AppTextInput placeholder="Address" />
              <AppTextInput placeholder="Password" />
              <AppTextInput placeholder="Confirm Password" />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate("Login")} style={styles.link}>
              <Text style={styles.linkText}>Already have an account</Text>
            </TouchableOpacity>
            <View style={styles.socialContainer}>
              <Text style={styles.socialText}>Or continue with</Text>
              <View style={styles.socialIcons}>
                <TouchableOpacity style={styles.socialIcon}>
                  <Ionicons name="logo-google" color={Colors.text} size={Spacing * 2} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                  <Ionicons name="logo-apple" color={Colors.text} size={Spacing * 2} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                  <Ionicons name="logo-facebook" color={Colors.text} size={Spacing * 2} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing * 2,
    
  },
  titleContainer: {
    alignItems: "center",
    flexDirection: 'column'
  },
  title: {
    fontSize: FontSize.xLarge,
    color: '#5618db',
    fontFamily: Font["poppins-bold"],
    marginVertical: Spacing * 3,
    top: 30
  },
  inputContainer: {
    marginVertical: Spacing * 0,
  },
  input: {
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.small,
    padding: Spacing * 2,
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
    marginVertical: Spacing,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  button: {
    padding: Spacing * 1,
    backgroundColor: '#5618db',
    marginVertical: Spacing * 1,
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
  },
  buttonText: {
    fontFamily: Font["poppins-bold"],
    color: Colors.onPrimary,
    textAlign: "center",
    fontSize: FontSize.large,
  },
  link: {
    padding: Spacing,
  },
  linkText: {
    fontFamily: Font["poppins-semiBold"],
    color: Colors.text,
    textAlign: "center",
    fontSize: FontSize.small,
  },
  socialContainer: {
    marginVertical: Spacing * 3,
    alignItems: "center",
  },
  socialText: {
    fontFamily: Font["poppins-semiBold"],
    color: '#5618db',
    textAlign: "center",
    fontSize: FontSize.small,
  },
  socialIcons: {
    marginTop: Spacing,
    flexDirection: "row",
    justifyContent: "center",
  },
  socialIcon: {
    padding: Spacing,
    backgroundColor: Colors.gray,
    borderRadius: Spacing / 2,
    marginHorizontal: Spacing,
  },
});

export default RegisterScreen;
