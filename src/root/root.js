import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Categories from "../components/Categories";
import Questions from "../components/Questions";
import Menu from "../components/Menu";
import Results from "../components/results";
import SpecialCard from "../components/Special-card";

const Stack = createStackNavigator();

function Root() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false, headerLeft: null }}
          name="Categories"
          component={Categories}
        />
        <Stack.Screen
          options={{ headerShown: false, headerLeft: null }}
          name="Questions"
          component={Questions}
        />
        <Stack.Screen
          options={{ headerShown: false, headerLeft: null }}
          name="Menu"
          component={Menu}
        />
        <Stack.Screen
          options={{ headerShown: false, headerLeft: null }}
          name="Results"
          component={Results}
        />
        <Stack.Screen
          options={{ headerShown: false, headerLeft: null }}
          name="SpecialCard"
          component={SpecialCard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Root;
