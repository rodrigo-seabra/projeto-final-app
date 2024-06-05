import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useContext } from 'react';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { AuthContext } from "../context/AuthContext";

const Tab = createBottomTabNavigator();

import CadastroUsuario from '../pages/CadastroUsuario';
import CriarObservacao from '../pages/CriarObservacao';
import Detalhes from '../pages/Detalhes';
import Login from '../pages/Login';
import Home from '../pages/Home';

export default  function Rotas()
{
    const { logado } = useContext(AuthContext);

    if (!logado) {
        return (<Login />)
    }

    return(
        <NavigationContainer>
            <Tab.Navigator screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#32CD32',
                tabBarInactiveTintColor: 'white',
                tabBarStyle: { backgroundColor: 'black', height: 60 },
                tabBarShowLabel: false,
            }}>
                <Tab.Screen name="Home" component={Home} options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home-circle-outline" color={color} size={40} />
                    ),
                }} />
                <Tab.Screen name="CriarObservacao" component={CriarObservacao} options={{
                    tabBarLabel: "Obs",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home-circle-outline" color={color} size={40} />
                    ),
                }} />
                <Tab.Screen name="CadastroUsuario" component={CadastroUsuario} options={{
                    tabBarLabel: "Cadastro",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home-circle-outline" color={color} size={40} />
                    ),
                }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
