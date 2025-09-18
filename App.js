import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import AddExpenseScreen from "./src/screens/AddExpenseScreen";
import AnalyticsScreen from "./src/screens/AnalyticsScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: "Expenses" }}
      />
      <HomeStack.Screen
        name="AddExpense"
        component={AddExpenseScreen}
        options={{ headerTitle: "Add Expense" }}
      />
    </HomeStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false, // hide header for bottom tabs
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStackScreen}
          options={{ title: "Home" }}
        />
        <Tab.Screen
          name="Analytics"
          component={AnalyticsScreen}
          options={{ title: "Analytics" }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Settings" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
