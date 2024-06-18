import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SelectDate from "../components/SelectDate";
import CustomAlert from "../components/CustomAlert";

export default function CriarObservacao({ backToHome, objetoId }) {
  const [observacoesDescricao, setObservacoesDescricao] = useState("");
  const [observacoesLocal, setObservacoesLocal] = useState("");
  const [observacoesData, setObservacoesData] = useState(new Date());
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [usuarioId, setUsuarioId] = useState();

  useEffect(() => {
    const verificarUsuarioAsyncStorage = async () => {
      const userId = await AsyncStorage.getItem("userId");
      if (userId !== null) {
        setUsuarioId(userId);
      }
    };
    verificarUsuarioAsyncStorage();
  }, []);

  async function postObservacao() {
    await fetch("http://10.139.75.37:5251/api/Observacoes/CreateObservacao", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        observacoesDescricao: observacoesDescricao,
        observacoesData: observacoesData.toISOString(),
        observacaoLocal: observacoesLocal,
        usuarioId: usuarioId,
        objetoId: objetoId,
      }),
    })
    .then((res) => {
      if (res.status == 200) {
        setAlertVisible(true);
        setAlertMessage("Observação cadastrada com sucesso!");
        setAlertType("success");
        setObservacoesDescricao("");
        setObservacoesData(new Date());
      } else {
        throw new Error("Failed to create observation");
      }
    })
    .catch((err) => {
      setAlertVisible(true);
      setAlertMessage(
        "Erro ao cadastrar observação. Revise os campos e tente novamente."
      );
      setAlertType("error");
    });
  }

  function closeAlert() {
    setAlertVisible(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputView}>
        <TouchableOpacity style={styles.backButton} onPress={backToHome}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.inputText}
          placeholder="Descrição da observação"
          placeholderTextColor="#fff"
          value={observacoesDescricao}
          onChangeText={(text) => setObservacoesDescricao(text)}
        />

      </View>
      <View style={styles.inputView}>
      <TextInput
          style={styles.inputText}
          placeholder="Local da observação"
          placeholderTextColor="#fff"
          value={observacoesLocal}
          onChangeText={(text) => setObservacoesLocal(text)}
        />
      </View>
      <SelectDate
        date={observacoesData}
        onChange={(event, selectedDate) =>
          setObservacoesData(selectedDate || observacoesData)
        }
      />
      <TouchableOpacity style={styles.loginBtn} onPress={postObservacao}>
        <Text style={styles.loginText}>Cadastrar Observação</Text>
      </TouchableOpacity>
      {alertVisible && (      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        type={alertType}
        onClose={closeAlert}
      />)}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: -100,
    left: 15,
    backgroundColor: "#32CD32",
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
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
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  loginBtn: {
    width: "85%",
    backgroundColor: "#32CD32",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
