import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Icon from "react-native-vector-icons/FontAwesome"; // Importe o ícone que deseja usar
import { Image } from "react-native";

export default function DetalhesUsuario({ setUserDetails }) {
  const { getUserDetails, userInfos, Logout } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  async function handleLogout() {
    Logout();
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    getUserDetails();
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setUserDetails(false)}
      >
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
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
        <View style={styles.infoItem}>
          <Icon name="lock" size={30} color="#fff" style={styles.icon} />
          <TextInput
            style={styles.text}
            secureTextEntry={!showPassword}
            value={userInfos.usuarioSenha}
            editable={false}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? "eye-slash" : "eye"}
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon
            name="sign-out"
            size={20}
            color="#fff"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000",
    paddingTop: 50, // Adiciona padding para o botão de voltar
  },
  img: {
    alignItems: "flex-start",
    width: "90%",
    height: "15%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#32CD32",
    marginBottom: 20,
  },
  userInfo: {
    width: "80%",
    backgroundColor: "#696969",

    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
    alignSelf: "center",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    flex: 1,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#32CD32",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonIcon: {
    marginRight: 10,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#32CD32",
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
