import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./pages/Home/index";
import Login from "./pages/Login/index";
import Profile from "./pages/Profile/index"; 
import Ionicons from "react-native-vector-icons/Ionicons"; 

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Login") {
            iconName = focused ? "log-in" : "log-in-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007BFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarLabel: "Início", headerShown: false }}
      />
      <Tab.Screen
        name="Login"
        component={Login}
        options={{ tabBarLabel: "Entrar", headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabRoutes} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
