import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  ImageBackground,
  Animated
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
// import { SimpleLineIcons, FontAwesome5 } from "react-native-vector-icons";
// import { EvilIcons } from "react-native-vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SpecialCard = ({ navigation }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const flipCard = () => {
    Animated.timing(flipAnimation, {
      toValue: isFlipped ? 0 : 180,
      duration: 800, // Adjust the duration for animation speed
      useNativeDriver: false,
    }).start();

    setIsFlipped(!isFlipped);
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };
  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.imageBackground}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Menu")}
          style={styles.topBar}
        >
          {/* <FontAwesome5 name="list-ul" size={RFValue(20)} color="#F4CFB9" /> */}
        </TouchableOpacity>

        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={flipCard}>
            <Animated.View
              style={[
                styles.card,
                isFlipped ? backAnimatedStyle : frontAnimatedStyle,
              ]}
            >
              {isFlipped ? (
                <TouchableOpacity
                  style={styles.cardTouchable}
                  onPress={() => (0 === 0 ? flipCard(0) : jiggleCard(0))}
                >
                  <Image
                    source={require("../assets/images/special-card-front.png")}
                    style={styles.cardImage}
                  />
                  <View style={styles.textContainer0}>
                    <Text style={styles.categoryText0}>CARTE SPECIALE</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.card2Touchable}
                  onPress={() => flipCard(0)}
                >
                  <Image
                    source={require("../assets/images/special-card-back.png")}
                    style={styles.cardImage}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.categoryText}>
                      Les cartes spéciales pour seulement
                    </Text>
                    <Text style={styles.categoryText1}>1 euro par mois</Text>
                    <View style={styles.PayerbuttonContainer}>
                      <TouchableOpacity
                        style={styles.Payerbutton}
                        activeOpacity={0.7}
                      >
                        {/* <SimpleLineIcons
                          name="credit-card"
                          style={{
                            fontSize: RFValue(25),
                            marginRight: RFValue(10),
                            color: "#F4CFB9",
                          }}
                        /> */}
                        <Text style={styles.PayerbuttonText}>Payer</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.iconContainer}>
                    {/* <EvilIcons
                      name="share-apple"
                      size={RFValue(30)}
                      color="#650A11"
                    /> */}
                  </View>
                </TouchableOpacity>
              )}
            </Animated.View>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Mélanger</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#650A11"
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: "#562024",
  },
  topBar: {
    height: windowHeight * 0.2,
    justifyContent: "center",
    padding: 10,
  },
  cardContainer: {
    flex: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: RFValue(230),
    height: RFValue(300),
  },
  cardTouchable: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    width: RFValue(235),
    height: RFValue(325),
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 0.5,
  },
  card2Touchable: {
    top: 0,
    left: 0,
    width: RFValue(235),
    height: RFValue(320),

    display: "flex",
  },
  cardText: {
    fontSize: RFValue(24),
    color: "#650A11",
    textAlign: "center",
  },
  iconContainer: {
    alignSelf: "center",
    padding: 10,
  },
  buttonContainer: {
    flex: 1.5, // This will take up 20% of the available space
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#F4CFB9",
    height: RFValue(40),
    width: windowWidth * 0.7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  buttonText: {
    color: "#650A11",
    fontSize: RFValue(20),
  },
  textContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
    height: "100%",
  },
  categoryText: {
    fontSize: RFValue(20),
    textAlign: "center",
    fontWeight: "400",
  },
  textContainer0: {
    position: "absolute",
    top: "75%",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  categoryText0: {
    fontSize: RFValue(20),
    fontWeight: "600",
    color: "#650A11",
  },
  textContainer1: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText1: {
    fontSize: RFValue(20),
    fontWeight: "600",
  },
  textContainer2: {
    position: "absolute",
    bottom: "30%",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText2: {
    fontSize: RFValue(20),
    fontWeight: "600",
    color: "#650A11",
  },

  PayerbuttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  Payerbutton: {
    backgroundColor: "#650A11",
    height: RFValue(35),
    width: windowWidth * 0.55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    flexDirection: "row",
  },
  PayerbuttonText: {
    color: "#F4CFB9",
    fontSize: RFValue(20),
  },




});

export default SpecialCard;
