import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importe o ícone que deseja usar

export default function User() {

  const { getUserDetails, userInfos, Logout } = useContext(AuthContext);

  async function getUserInfo() {
    getUserDetails();
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  async function handleLogout() {
    Logout();
  }

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/LogoAPP.png")} style={styles.img} />
      <Text style={styles.title}>Olá {userInfos.usuarioNome}</Text>
      <View style={styles.userInfo}>
        <View style={styles.infoItem}>
          <Icon name="envelope" size={30} color="#fff" style={styles.icon} />
          <Text style={styles.text}>{userInfos.usuarioEmail}</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="phone" size={30} color="#fff" style={styles.icon} />
          <Text style={styles.text}>{userInfos.usuarioTelefone}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="sign-out" size={20} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  img: {
    width: '95%',
    height: '20%',
  },
  title: {
    margin: 10,
    fontSize: 40,
    fontWeight: '500',
    color: 'white',
  },
  userInfo: {
    width: '80%',
    backgroundColor: '#696969',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#32CD32',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonIcon: {
    marginRight: 10,
  },
});