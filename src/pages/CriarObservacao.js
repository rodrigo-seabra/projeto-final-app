import React, { useState } from "react";
import {
  ScrollView,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
} from "react-native";

import SelectDate from "../components/SelectDate"; // Certifique-se de que o nome do componente exportado corresponde

export default function CriarObservacao({ backToHome, usuarioId, objetoId }) {
  const [observacoesDescricao, setObservacoesDescricao] = useState("");
  const [observacoesData, setObservacoesData] = useState(new Date());
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState(false);

  async function postObservacao() {
    await fetch(
      "http://192.168.7.10000:5251/api/Observacoes/CreateObservacao",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          observacoesDescricao: observacoesDescricao,
          observacoesData: observacoesData.toISOString(),
          usuarioId: usuarioId,
          objetoId: objetoId,
        }),
      }
    )
      .then((res) => {
        if (res.status == 200) {
          setSucesso(true);
          setObservacoesDescricao("");
          setObservacoesData(new Date());
        } else {
          throw new Error("Failed to create observation");
        }
      })
      .catch((err) => setErro(true));
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
      <SelectDate
        date={observacoesData}
        onChange={(event, selectedDate) =>
          setObservacoesData(selectedDate || observacoesData)
        }
      />
      <TouchableOpacity style={styles.loginBtn} onPress={postObservacao}>
        <Text style={styles.loginText}>Cadastrar Observação</Text>
      </TouchableOpacity>

      {/* Modal de Sucesso */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={sucesso}
        onRequestClose={() => setSucesso(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Observação cadastrada com sucesso!
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setSucesso(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Erro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={erro}
        onRequestClose={() => setErro(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Erro ao cadastrar observação. Revise os campos e tente novamente.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setErro(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#32CD32",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
