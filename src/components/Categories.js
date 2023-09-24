import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTranslation } from 'react-i18next';
import i18n from "../../i18n";
import Loader from "../helpers/Loader.js";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Import images using destructuring
import redImage from "../../src/assets/images/back-red.png";
import yellowImage from "../../src/assets/images/back-yellow.png";
import blueImage from "../../src/assets/images/back-blue.png";
import coupleCardImage from "../../src/assets/images/CoupleCard2.png";
import familleCardImage from "../../src/assets/images/FamilleCard2.png";
import amisCardImage from "../../src/assets/images/AmisCard2.png";

const Categories = ({ navigation }) => {
  const { t } = useTranslation();

  const YourDataArray = [
    {
      title: "COUPLE",
      imageUrlSource: coupleCardImage,
      background: "back-red",
    },
    {
      title: t('FAMILY'),
      imageUrlSource: familleCardImage,
      background: "back-yellow",
    },
    {
      title: t('friends'),
      imageUrlSource: amisCardImage,
      background: "back-blue",
    },
  ];

  const [backgroundColor, setBackgroundColor] = useState(
    YourDataArray[0].background
  );

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.carouselItem}>
        <TouchableOpacity onPress={() => navigation.navigate("Questions")}>
          <Image source={item.imageUrlSource} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={[styles.categoryText, { color: "#F4CFB9" }]}>
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };


  return (
    <>
      {
        blueImage && yellowImage && redImage ?
          <SafeAreaView style={styles.container}>
            <ImageBackground
              source={
                backgroundColor === "back-red"
                  ? redImage
                  : backgroundColor === "back-yellow"
                    ? yellowImage
                    : backgroundColor === "back-blue"
                      ? blueImage
                      : null
              }
              style={styles.imageBackground}
            >
              <View style={{ alignItems: "center" }}>

                <Text style={styles.categories}>{t('chooseCategory')}</Text>
              </View>
              <View style={styles.innerContainer}>
                <Carousel
                  data={YourDataArray}
                  renderItem={renderItem}
                  onSnapToItem={(index) =>
                    setBackgroundColor(YourDataArray[index].background)
                  }
                  sliderWidth={windowWidth}
                  itemWidth={windowWidth * 0.76}
                  layout={"default"}
                />
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate("Questions")}
                >
                  <Text style={styles.buttonText}>{t('play')}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => {
                const newLanguage = i18n.language === 'en' ? 'fr' : 'en';
                i18n.changeLanguage(newLanguage);
              }}
                style={styles.languageContainer}>
                <Image
                  source={{
                    uri: "https://t4.ftcdn.net/jpg/01/71/57/89/360_F_171578974_eNhE6sEpc6jsK6Py7IxhTbIZZQ7878Wb.jpg",
                  }}
                  style={styles.flagImage}
                />
                <Text style={styles.languageText}>{t('lange')}</Text>
              </TouchableOpacity>
            </ImageBackground>
          </SafeAreaView>

          : <Loader />
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: "#562024",
  },
  carouselItem: {
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: RFValue(450),
    height: RFValue(450),

    resizeMode: "contain",
    shadowColor: "black",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
  textContainer: {
    position: "absolute",
    bottom: "15%",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText: {
    fontSize: RFValue(20),
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#F4CFB9",
    height: RFValue(40),
    width: windowWidth * 0.7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(100),
    marginBottom: RFValue(20),
    marginTop: RFValue(20),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: RFValue(3),
    },
    shadowOpacity: 0.27,
    shadowRadius: RFValue(4.65),
  },
  categories: {
    fontSize: RFValue(33),
    textAlign: "center",
    color: "#F4CFB9",
    paddingTop: windowHeight * 0.1,
    width: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "#650A11",
    fontSize: RFValue(20),
  },
  languageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: RFValue(20),
    marginBottom: RFValue(20),
    height: RFValue(30),
  },
  flagImage: {
    width: RFValue(25),
    height: RFValue(25),
    borderRadius: RFValue(10),
    borderWidth: RFValue(3),
    borderColor: "#F4CFB9",
  },

  languageText: {
    marginLeft: RFValue(10),
    fontSize: RFValue(20),
    color: "#F4CFB9",
  },
});

export default Categories;
