import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import AppTextInput from "../components/AppTextInput";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Login here</Text>
            <Text style={styles.subtitle}>Welcome back, you've been missed!</Text>
          </View>
          <View style={styles.inputContainer}>
            <AppTextInput placeholder="Email" />
            <AppTextInput placeholder="Password" />
          </View>
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate("DashboardScreen")} style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate("Register")} style={styles.link}>
            <Text style={styles.linkText}>Create new account</Text>
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
    marginBottom: Spacing * 3,
    
  },
  title: {
    fontSize: FontSize.xLarge,
    color: '#5618db',
    fontFamily: Font["poppins-bold"],
    marginBottom: Spacing,
    top: 29,
    
  },
  subtitle: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: FontSize.large,
    maxWidth: "60%",
    textAlign: "center",
    top: 35,
    
  },
  inputContainer: {
    marginVertical: Spacing * 3,
  },
  forgotPassword: {
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: FontSize.small,
    color: '#5618db',
  },
  button: {
    padding: Spacing * 2,
    backgroundColor: '#5618db',
    marginVertical: Spacing * 3,
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

export default LoginScreen;
