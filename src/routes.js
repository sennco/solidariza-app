import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./pages/Home/index";
import Login from "./pages/Login/index";
import Ionicons from "react-native-vector-icons/Ionicons"; // Importando ícones

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"; // Ícone para Home
          } else if (route.name === "Login") {
            iconName = focused ? "log-in" : "log-in-outline"; // Ícone para Login
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007BFF", // Cor do ícone ativo
        tabBarInactiveTintColor: "gray",  // Cor do ícone inativo
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarLabel: "Início" }} // Rótulo customizado
      />
      <Tab.Screen
        name="Login"
        component={Login}
        options={{ tabBarLabel: "Entrar" }} // Rótulo para Login
      />
    </Tab.Navigator>
  );
}
