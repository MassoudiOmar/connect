import 'react-native-gesture-handler';
import React, { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Root from "./src/root/root";
import './i18n'; 

const App = () => {
  return (
    <SafeAreaView style={[styles.container]}>
      <Root />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default App;


