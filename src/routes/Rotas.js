import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { AuthContext } from "../context/AuthContext";

const Tab = createBottomTabNavigator();

import CriarObservacao from "../pages/CriarObservacao";
import Home from "../pages/Home";
import AuthScreen from "../pages/AuthScreen";

export default function Rotas() {
  const { logado, cadastro } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {logado ? (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#32CD32",
            tabBarInactiveTintColor: "white",
            tabBarStyle: { backgroundColor: "black", height: 60 },
            tabBarShowLabel: false,
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="home-circle-outline"
                  color={color}
                  size={40}
                />
              ),
            }}
          />
          <Tab.Screen
            name="CriarObservacao"
            component={CriarObservacao}
            options={{
              tabBarLabel: "Obs",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="plus-circle-outline"
                  color={color}
                  size={40}
                />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <AuthScreen />
      )}
    </NavigationContainer>
  );
}
