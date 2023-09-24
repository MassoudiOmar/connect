import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text,
  Dimensions,
  ImageBackground,
} from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { RFValue } from "react-native-responsive-fontsize";

export default function AlertComponent() {
  const [showBox, setShowBox] = useState(true);

  const showConfirmDialog = () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this beautiful box?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            setShowBox(false);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

  return (
    <ImageBackground
      source={require("../assets/images/background.png")} // Replace with the actual path to your local image
      style={styles.imageBackground}
    >
      <View style={styles.screen}>
        {showBox && (
          <View style={styles.box}>
            <Text style={styles.title}>Rappel</Text>
            <Text style={styles.paragraph}>
              Le Lorem Ipsum est simplement du faux texte employé dans la
              composition et la mise en page avant impression
            </Text>
          </View>
        )}
        <View style={styles.ContinuerbuttonContainer}>
          <TouchableOpacity style={styles.Continuerbutton} activeOpacity={0.7}>
            <Text style={styles.buttonText}>Continuer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

// Kindacode.com
// Just some styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: "#562024",
  },
  box: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.3,
    backgroundColor: "#F4CFB9",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
    borderWidth: 0.5,
    borderColor: "black",
  },
  text: {
    fontSize: 30,
  },
  title: {
    color: "#500F14",
    fontSize: windowWidth * 0.07,
    flex: 1,
  },
  paragraph: {
    color: "#650A11",
    fontSize: windowWidth * 0.05,
    textAlign: "center",
    flex: 2,
  },

  Continuerbutton: {
    backgroundColor: "#F4CFB9",
    height: RFValue(40),
    width: windowWidth * 0.3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: "black",
  },
  buttonText: {
    color: "#650A11",
    fontSize: windowWidth * 0.05,
  },
  ContinuerbuttonContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
