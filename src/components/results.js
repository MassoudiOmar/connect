import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTranslation } from 'react-i18next';
import { useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Results = ({ navigation }) => {
  const { t } = useTranslation();
  const route = useRoute();
  const questionsAnswered = route.params.questionsAnswered
  const getDataFromStorage = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      console.log(value)
      return value;
    } catch (error) {
      console.error('Error retrieving data: ', error);
      return null;
    }
  };

  const setDataIfNotExists = async (key, value) => {
    try {
      const existingValue = await getDataFromStorage("Level");

      if (existingValue === 'surface') {
        await AsyncStorage.setItem('Level', "coeur");
      } else if (existingValue === 'coeur') {
        await AsyncStorage.setItem('Level', "Miroir");
      } 
      
      else {
        console.log('Data already exists:', existingValue);
      }
      navigation.goBack()
    } catch (error) {
      console.error('Error setting data: ', error);
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://res.cloudinary.com/dm6yw4dn0/image/upload/v1694971192/bckg_F%C3%A9licitations_nefieo.png",
        }}
        style={styles.imageBackground}
      >
        <View style={styles.innerContainer}>
          <View>
            <TouchableOpacity
              style={styles.menuItem1Element}
              activeOpacity={0.7}
            >
              <View style={styles.menuItem1InnerText}>
                <Text
                  style={{
                    color: "#650A11",
                    fontSize: RFValue(25),
                    fontWeight: 800,
                  }}
                >
                  {t('Congratulations')} !
                </Text>
                <Text
                  style={{
                    width: "80%",
                    padding: 10,
                    color: "#650A11",
                    fontWeight: 400,
                    textAlign: "center",
                    fontSize: RFValue(15),
                  }}
                >
                  {t('youAnswered')} {questionsAnswered} questions
                </Text>
                <Text
                  style={{
                    width: "80%",
                    padding: 10,
                    color: "#650A11",
                    fontWeight: 500,
                    textAlign: "center",
                    fontSize: RFValue(15),
                  }}
                >
                  {t('nextlevel')}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.menuItem2Element}
              activeOpacity={0.7}
            >
              <View style={styles.menuItem2InnerText}>
                <TouchableOpacity onPress={() => { navigation.navigate('Questions') }} style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      color: "#F4CFB9",
                      fontWeight: 500,
                      textAlign: "center",
                      fontSize: RFValue(15),
                    }}
                  >
                    {t('noNextLevel')}</Text>
                </TouchableOpacity >
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.menuItem3Element}
              activeOpacity={0.7}
              onPress={setDataIfNotExists}
            >
              <View style={styles.menuItem3InnerText}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      color: "#650A11",
                      fontWeight: 500,
                      textAlign: "center",
                      fontSize: RFValue(15),
                    }}
                  >
                    {t('moveToTheNextLevel')}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
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
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  menuItem1Element: {
    top: 0,
    left: 0,
    padding: 10,
    backgroundColor: "#F4CFB9",
    width: RFValue(300),
    height: RFValue(170),
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 20,
  },
  menuItem1InnerText: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 20,
    flex: 1,
  },
  menuItem2Element: {
    top: 0,
    left: 0,
    margin: 10,
    backgroundColor: "#650A11",
    width: RFValue(300),
    height: RFValue(60),
    borderRadius: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderColor: "#F4CFB9",
    borderWidth: 0.5,
    borderRadius: 10,
  },
  menuItem2InnerText: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
  },
  menuItem3Element: {
    top: 0,
    left: 0,
    backgroundColor: "#F4CFB9",
    width: RFValue(300),
    height: RFValue(40),
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 20,
  },
  menuItem3InnerText: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 30,
    flex: 1,
  },
});

export default Results;
