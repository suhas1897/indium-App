import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
const { height } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

const WelcomeScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView>
      <View style={styles.container1}>
        <ImageBackground
          style={{
            top: 71,
            height: height / 5,
            width: 125,
            aspectRatio: 4 / 5.5,
            alignItems: 'center',
            justifyContent: 'center',

          }}
          resizeMode="contain"
          source={require("../assets/images/welcome2.png")} />
      </View>
      <View style={styles.container}>
  <ImageBackground
    style={{
      display: 'flex',
      // backgroundColor: 'black',
      height: height / 3,
      width: 340,
      aspectRatio: 4 / 3,
      
      left: 30
       // Aligns the image container horizontally
    }}
    resizeMode="contain"
    source={require("../assets/images/welcome-img.png")}
  />
</View>
        <View
          style={{
            paddingHorizontal: Spacing * 4,
            paddingTop: Spacing * 4,
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xxLarge,
              color: '#5618db',
              fontFamily: Font["poppins-bold"],
              textAlign: "center",
              bottom: 70
            }}
          >
            Precision Diagnosis Colorful Solutions
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: Spacing * 2,
            paddingTop: Spacing * 6,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => navigate("Login")}
            style={{
              backgroundColor: '#5618db',
              paddingVertical: Spacing * 1.5,
              paddingHorizontal: Spacing * 2,
              width: "48%",
              borderRadius: Spacing,
              shadowColor: Colors.primary,
              bottom: 50,
              shadowOffset: {
                width: 0,
                height: Spacing,
              },
              shadowOpacity: 0.3,
              shadowRadius: Spacing,
            }}
          >
            <Text
              style={{
                fontFamily: Font["poppins-bold"],
                color: Colors.onPrimary,
                fontSize: FontSize.large,
                textAlign: "center",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate("Register")}
            style={{
              paddingVertical: Spacing * 1.5,
              paddingHorizontal: Spacing * 2,
              width: "48%",
              borderRadius: Spacing,
              bottom: 50,
            }}
          >
            <Text
              style={{
                fontFamily: Font["poppins-bold"],
                color: Colors.text,
                fontSize: FontSize.large,
                textAlign: "center",
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({

  inputContainer: {
    marginVertical: Spacing * 0,
  },
  container: {
    // backgroundColor: 'pink',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    // backgroundColor: 'pink',
    display: 'flex',
    alignSelf: 'center', // Aligns the image itself to the center
      justifyContent: 'center', // Aligns the image container vertically
      alignItems: 'center',
  }
});


export default WelcomeScreen;

