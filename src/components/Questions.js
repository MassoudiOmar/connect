import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  ImageBackground,
  Animated,
  Vibration
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useTranslation } from 'react-i18next';
import Loader from "../helpers/Loader";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sound from 'react-native-sound';
import flipcardSound from "../assets/soundEffect/flipcard-91468.mp3"
import shuffleCardSound from "../assets/soundEffect/shuffle-92719.mp3"
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const cardData = [
  { opacity: 2, scale: 1.2 },
  { opacity: 1.9, scale: 1.1 },
  { opacity: 1.8, scale: 1.0 },
];
let startTime = new Date().getMinutes() + ":" + new Date().getSeconds();

const Questions = ({ navigation }) => {
  const { t } = useTranslation();
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("")
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [buttonState, setbuttonState] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [Level, setLevel] = useState("");
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const [mixingAnimation] = useState(new Animated.Value(0));
  const [cardRefs, setCardRefs] = useState(Array(cardData.length).fill(null).map(() => useRef(new Animated.Value(0))));


  const flipCardSound = new Sound(flipcardSound, null, (error) => {
    if (error) {
      console.log('Error loading flipcard sound:', error);
    }
  });

  const shuffleSound = new Sound(shuffleCardSound, null, (error) => {
    if (error) {
      console.log('Error loading shuffle sound:', error);
    }
  });


  const navigateToResult = () => {

    setQuestion([])
    setQuestions([])
    setUsedQuestions([])
    navigation.navigate("Results", { questionsAnswered: usedQuestions?.length })
  }
  const getDataFromStorage = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);

      return value;
    } catch (error) {
      console.error('Error retrieving data: ', error);
      return null;
    }
  };
  const setDataIfNotExists = async (key, value) => {
    try {
      const existingValue = await getDataFromStorage("Level");

      if (existingValue === null) {
        await AsyncStorage.setItem('Level', "surface");
        setLevel("surface")

      } else {
        setLevel(value)

      }
    } catch (error) {
      console.error('Error setting data: ', error);
    }
  };

  const flipCard = (index) => {
    if (index === 0) {
      flipCardSound.play()
      Animated.timing(flipAnimation, {
        toValue: isFlipped ? 0 : 180,
        duration: 1200,
        useNativeDriver: false,
      }).start();
      setTimeout(() => {
        setIsFlipped(!isFlipped);
        setbuttonState(!buttonState);
      }, 600);
    }
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
    transform: [{ rotateY: backInterpolate }]
  };




  const getQuestionsOfCategory = (id) => {

    var questions = [
      "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. ",
      "Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500",
      "uand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cin",
      "les, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années",
      "Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.",
      "On sait depuis longtemps que travailler avec du texte lisible et contenant du",
      "souvent intentionnellement (histoire d'y rajouter de petits clins d'oeil, voire des phrases embarassant",
    ];
    setQuestions(questions);
    setQuestion(questions[Math.floor(Math.random() * questions.length)]);
    setUsedQuestions([
      ...usedQuestions,
      Math.floor(Math.random() * questions.length),
    ]);

  };



  useEffect(() => {
    getQuestionsOfCategory(5);
    setDataIfNotExists()
  }, []);

  const dataToSend = {
    key1: startTime,
    key2: usedQuestions?.length,
    key3: questions?.length,
  };


  const startMixingAnimation = () => {
    getQuestionsOfCategory();
    Vibration.vibrate()
    shuffleSound.play()
    const cardVibrationDistance = 10;
    const duration = 100;
    const cardAnimations = cardRefs.map((cardRef, index) => {
      const cardAnimationSequence = [
        {
          toValue: cardVibrationDistance,
          duration: duration / 2,
          useNativeDriver: false,
        },
        {
          toValue: -cardVibrationDistance,
          duration: duration,
          useNativeDriver: false,
        },
        {
          toValue: 0,
          duration: duration / 2,
          useNativeDriver: false,
        },
      ];

      return Animated.sequence([
        Animated.timing(cardRef.current, cardAnimationSequence[0]),
        Animated.timing(cardRef.current, cardAnimationSequence[1]),
        Animated.timing(cardRef.current, cardAnimationSequence[2]),
      ]);
    });

    Animated.parallel(cardAnimations).start();
  };



  return (
    <>
      {
        question && questions ?
          <View style={styles.container}>
            <ImageBackground
              source={require("../assets/images/background.png")}
              style={styles.imageBackground}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Menu", { dataToSend })}
                style={styles.topBar}
              >
                <Feather name="list" size={RFValue(20)} color="#F4CFB9" />
                <Text
                  style={{
                    textAlign: "center",
                    color: "#F4CFB9",
                    fontSize: RFValue(20),
                    fontWeight: 400,
                  }}
                >
                  {t('Level')} 1: surface
                </Text>
              </TouchableOpacity>

              <View style={styles.cardContainer}>

                {cardData.map((card, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        position: "absolute",
                        zIndex: cardData.length - index,
                        top: windowHeight * 0.07 * index,
                        opacity: card.opacity,
                        transform: [{ scale: card.scale }],
                        marginTop: windowHeight * 0.004,
                      }}
                    >

                      <TouchableOpacity onPress={() => flipCard(index)}>
                        <Animated.View
                          style={[
                            styles.card,
                            index === 0 ? (isFlipped ? styles.backCard : styles.frontCard) : {},
                            index === 0 ? (isFlipped ? backAnimatedStyle : frontAnimatedStyle) : {},
                            index === 0 ? null : { transform: [{ translateX: cardRefs[index].current }] }
                          ]}
                        >
                          {index === 0 ? (
                            !isFlipped ? (
                              index === 0 && usedQuestions?.length >= questions?.length ? <TouchableOpacity
                                onPress={() => (0 === 0 ? flipCard(0) : jiggleCard(0))}
                              >
                                <Image
                                  source={require("../assets/images/special-card-front.png")}
                                  style={styles.cardImage}
                                />
                                <View style={styles.textContainer0}>
                                  <Text style={styles.categoryText0}>CARTE SPECIALE</Text>
                                </View>
                              </TouchableOpacity> : <Image
                                source={require("../assets/images/card4.png")}
                                style={styles.cardImage}
                              />
                            ) : (
                              index === 0 && usedQuestions?.length >= questions?.length ? <TouchableOpacity
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
                                      <SimpleLineIcons
                                        name="credit-card"
                                        style={{
                                          fontSize: RFValue(25),
                                          marginRight: RFValue(10),
                                          color: "#F4CFB9",
                                        }}
                                      />
                                      <Text style={styles.PayerbuttonText}>Payer</Text>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                                <View style={styles.iconContainer}>
                                  <EvilIcons
                                    name="share-apple"
                                    size={RFValue(30)}
                                    color="#650A11"
                                  />
                                </View>
                              </TouchableOpacity> :
                                <TouchableOpacity
                                  style={styles.card2Touchable}
                                  onPress={() => flipCard(index)}
                                >
                                  <Text style={styles.cardText}>{question}</Text>
                                  <View style={styles.iconContainer}>
                                    <EvilIcons
                                      name="share-apple"
                                      size={RFValue(30)}
                                      color="#650A11"
                                    />
                                  </View>
                                </TouchableOpacity>
                            )
                          ) : (
                            <Image
                              source={require("../assets/images/card4.png")}
                              style={styles.cardImage}
                            />
                          )}
                        </Animated.View>
                      </TouchableOpacity>

                    </View>
                  );
                })}
              </View>
              {!buttonState ? (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={startMixingAnimation}

                  >
                    <Text style={styles.buttonText}>{t('mix')}</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      usedQuestions?.length >= questions?.length
                        ? navigateToResult()
                        : flipCard(0)
                    }
                    activeOpacity={0.7}
                  >
                    <Text style={styles.buttonText}>
                      {t('next')}
                      <Entypo
                        name="controller-play"
                        style={{
                          fontSize: 20,
                          marginLeft: 5,
                          color: "#650A11",
                        }}
                      />
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </ImageBackground>
          </View> : <Loader />
      }

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: "#F4CFB9",
    display: "flex",
    borderRadius: 10,
    justifyContent: "space-around",
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
    flex: 1.5,
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
    flexDirection: "row",
  },
  buttonText: {
    color: "#650A11",
    fontSize: RFValue(25),
  },


  cardTouchableSpecialCard: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
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

  textContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10,
    height: "90%",
  },

  categoryText: {
    fontSize: RFValue(20),
    textAlign: "center",
    fontWeight: "400",
  },

  categoryText1: {
    fontSize: RFValue(20),
    fontWeight: "600",
  },
  PayerbuttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  Payerbutton: {
    backgroundColor: "#650A11",
    height: RFValue(30),
    width: windowWidth * 0.45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    flexDirection: "row",
  },
  PayerbuttonText: {
    color: "#F4CFB9",
    fontSize: RFValue(15),
  },
});

export default Questions;
