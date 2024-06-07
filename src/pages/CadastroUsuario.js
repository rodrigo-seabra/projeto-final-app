import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useState } from "react";
import { Modal } from "react-native";
import CustomAlert from "../components/CustomAlert";

export default function CadastroUsuario() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  async function RealizaCadastro() {
    await fetch("http://192.168.7.100:5251/api/Usuario/CreateUser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        usuarioEmail: email,
        usuarioNome: username,
        usuarioSenha: password,
        usuarioTelefone: phone,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setAlertMessage(
          json.usuarioId
            ? "Cadastro realizado com sucesso!"
            : "Erro ao cadastrar. Tente novamente."
        );
        setAlertType(json.usuarioId ? "success" : "error");
        setAlertVisible(true);
        setEmail("");
        setPhone("");
        setPassword("");
        setUsername("");
      })
      .catch((err) => {
        setAlertMessage("Erro ao cadastrar. Tente novamente.");
        setAlertType("error");
        setAlertVisible(true);
      });
  }

  function closeAlert() {
    setAlertVisible(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <View style={styles.inputView}>
          <TextInput
            inputMode="text"
            style={styles.inputText}
            placeholder="Nome de usuário"
            placeholderTextColor="#fff"
            TextInput={username}
            onChangeText={(digatado) => setUsername(digatado)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            inputMode="email"
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#fff"
            TextInput={email}
            onChangeText={(digatado) => setEmail(digatado)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            inputMode="numeric"
            style={styles.inputText}
            placeholder="Telefone"
            placeholderTextColor="#fff"
            TextInput={phone}
            onChangeText={(digatado) => setPhone(digatado)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            inputMode="text"
            secureTextEntry
            style={styles.inputText}
            placeholder="Senha"
            placeholderTextColor="#fff"
            TextInput={password}
            onChangeText={(digatado) => setPassword(digatado)}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={RealizaCadastro}>
          <Text style={styles.loginText}>CADASTRAR</Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          visible={alertVisible}
          animationType="fade"
          onRequestClose={() => setAlertVisible(false)}
        >
          <TouchableWithoutFeedback onPress={closeAlert}>
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <CustomAlert
                  message={alertMessage}
                  type={alertType}
                  onClose={closeAlert}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    width: "100%",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    width: "100%",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginBottom: 20,
  },
  inputViewHalf: {
    width: "48%", // Usamos 48% em vez de 50% para deixar um pequeno espaço entre os campos
    backgroundColor: "#696969",
    borderRadius: 5,
    height: 60,
    paddingHorizontal: 20,
  },
  inputView: {
    width: "85%",
    backgroundColor: "#696969",
    borderRadius: 5,
    height: 60,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 65,
    color: "#fff",
  },
  loginBtn: {
    width: "85%",
    backgroundColor: "#32CD32",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 100,
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  img: {
    width: "95%",
    height: "20%",
    marginTop: 55,
  },
  msgErro: {
    fontWeight: "500",
    fontSize: 24,
    color: "red",
  },
  msgSucesso: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 26,
    color: "#32CD32",
  },
});
