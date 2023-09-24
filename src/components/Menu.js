import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import  AntDesign  from "react-native-vector-icons/AntDesign";
import { useRoute } from "@react-navigation/native";
import calculateTimeDifference from "../helpers/calculTime"
import { useTranslation } from 'react-i18next';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Menu = ({ navigation }) => {
  const route = useRoute();
  const { t } = useTranslation();

  const dataReceived = route.params.dataToSend;
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.imageBackground}
      >
        <View style={styles.menuItem1}>
          <TouchableOpacity style={styles.menuItem1Element}>
            <View style={styles.menuItem1InnerText}>
              <Text
                style={{
                  color: "#650A11",
                  fontSize: RFValue(25),
                  fontWeight: 500,
                }}
              >
                {calculateTimeDifference(
                  dataReceived?.key1,
                  new Date().getMinutes() + ":" + new Date().getSeconds()
                )}
                / 20:00
              </Text>
              <Text style={{ color: "#650A11", fontSize: RFValue(17) }}>
                <Text
                  style={{
                    color: "#650A11",
                    fontSize: RFValue(20),
                    fontWeight: 500,
                  }}
                >
                  {t('Level')} 1 :
                </Text>
                surface
              </Text>
              <Text style={{ color: "#650A11", fontSize: RFValue(17) }}>
                <Text
                  style={{
                    color: "#650A11",
                    fontSize: RFValue(20),
                    fontWeight: 500,
                  }}
                >
                  {t('RemainingQuestions')} :
                </Text>
                {dataReceived?.key3 - dataReceived?.key2}/{dataReceived?.key3}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.menuItem2}>
          <TouchableOpacity style={styles.menuItem2Element} activeOpacity={0.7}>
            <View style={styles.menuItem2InnerText}>
              <Text
                style={{
                  color: "#650A11",
                  fontSize: RFValue(25),
                  fontWeight: 500,
                }}
              >
                {t('Level')} 1 : surface
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{
                    uri: "https://t4.ftcdn.net/jpg/01/71/57/89/360_F_171578974_eNhE6sEpc6jsK6Py7IxhTbIZZQ7878Wb.jpg",
                  }}
                  style={styles.flagImage}
                />
                <Text
                  style={{
                    width: "70%",
                    padding: 10,
                    color: "#650A11",
                    fontWeight: 400
                  }}
                >
                  {t('level1Description')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.menuItem3}>
          <TouchableOpacity style={styles.menuItem3Element} activeOpacity={0.7}>
            <View style={{ flexDirection: "row" }}>
              <AntDesign name="setting" style={styles.icons} />
              <Text
                style={{
                  color: "#650A11",
                  fontSize: RFValue(17),
                  fontWeight: 500,
                }}
              >
                {t('Parameters')}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <AntDesign name="filetext1" style={styles.icons} />
              <Text
                style={{
                  color: "#650A11",
                  fontSize: RFValue(17),
                  fontWeight: 500,
                }}
              >
                {t('GameRules')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.menuItem}>
          <View style={styles.QuitterbuttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Categories")}
              style={styles.Quitterbutton}
              activeOpacity={0.7}
            >
              <Text style={styles.QuitterbuttonText}>  {t('LeaveTheGame')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ContinuerbuttonContainer}>
            <TouchableOpacity
              style={styles.Continuerbutton}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Questions")}
            >
              <Text style={styles.buttonText}>  {t('Continue')}</Text>
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
    flexDirection: "column",
    backgroundColor: "#650A11",
  },
  menuItem1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  menuItem2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  menuItem3: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  menuItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: "#562024",
  },
  text: {
    color: "white",
    fontSize: 18,
  },
  buttonContainer: {
    flex: 2, // This will take up 20% of the available space
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#F4CFB9",
    height: windowHeight * 0.2,
    width: windowWidth * 0.85,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  buttonText: {
    color: "#650A11",
    fontSize: windowWidth * 0.05,
  },
  menuItem1Element: {
    top: 0,
    left: 0,
    padding: 8,
    backgroundColor: "#F4CFB9",
    width: RFValue(300),
    height: RFValue(140),
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  menuItem2Element: {
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
  menuItem3Element: {
    top: 0,
    left: 0,
    padding: 10,
    backgroundColor: "#F4CFB9",
    width: RFValue(300),
    height: RFValue(110),
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 20,
    alignItems: "center",
  },
  menuItem1InnerText: {
    textAlign: "center",
    borderColor: "#650A11",
    borderWidth: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 20,
    flex: 1,
  },
  menuItem2InnerText: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 20,
    flex: 1,
  },

  QuitterbuttonContainer: {
    flex: 1, // Reduce this value to give less space
    justifyContent: "center",
    alignItems: "center",
  },
  Quitterbutton: {
    height: RFValue(40),
    width: windowWidth * 0.65,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#F4CFB9",
  },
  ContinuerbuttonContainer: {
    flex: 1.5, // Increase this value to give more space
    justifyContent: "flex-start",
    alignItems: "center",
  },
  Continuerbutton: {
    backgroundColor: "#F4CFB9",
    height: RFValue(40),
    width: windowWidth * 0.65,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  QuitterbuttonText: {
    color: "#F4CFB9",
    fontSize: RFValue(18),
  },
  buttonText: {
    color: "#650A11",
    fontSize: RFValue(20),
  },
  flagImage: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(100),
    borderWidth: RFValue(1),
    borderColor: "#650A11",
  },
  icons: {
    fontSize: RFValue(25),
    color: "#650A11",
  },
});

export default Menu;
