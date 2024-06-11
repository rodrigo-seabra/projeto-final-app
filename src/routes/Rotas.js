import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext, useEffect, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

import CadastroObjeto from "../pages/CadastroObjeto";
import Home from "../pages/Home";
import AuthScreen from "../pages/AuthScreen";
import Busca from "../pages/Busca";

export default function Rotas() {
  const { logado, cadastro } = useContext(AuthContext);
  const [usuarioSalvoNoAsyncS, setUsuarioSalvoNoAsyncS] = useState(false);

  useEffect(() => {
    const verificarUsuarioAsyncStorage = async () => {
      const userId = await AsyncStorage.getItem("userId");
      if (userId !== null) {
        setUsuarioSalvoNoAsyncS(true);
      }
    };
    verificarUsuarioAsyncStorage();
  }, []);

  return (
    <NavigationContainer>
      {logado || usuarioSalvoNoAsyncS ? (
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
            name="Cadastrar objeto desaparecido"
            component={CadastroObjeto}
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
          <Tab.Screen
            name="Buscar pessoa"
            component={Busca}
            options={{
              tabBarLabel: "Busca",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="card-search-outline" color={color} size={40} />
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
