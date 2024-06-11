import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import CustomAlert from "../components/CustomAlert";
import SelectDate from "../components/SelectDate";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CadastroObjeto() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [objetoNome, setObjetoNome] = useState("");
  const [objetoCor, setObjetoCor] = useState("");
  const [objetoObservacao, setObjetoObservacao] = useState("");
  const [objetoLocalDesaparecimento, setObjetoLocalDesaparecimento] = useState("");
  const [objetoFoto, setObjetoFoto] = useState("");
  const [objetoDtDesaparecimento, setObjetoDtDesaparecimento] = useState(new Date());
  const [objetoStatus, setObjetoStatus] = useState();
  const [erro, setErro] = useState(false);

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

  function closeAlert() {
    setAlertVisible(false);
  }

  async function CadastroObj() {
    await fetch("http://10.139.75.37:5251/api/Objeto/CreateObjeto", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        objetoNome: objetoNome,
        objetoCor: objetoCor,
        objetoFoto: objetoFoto,
        objetoStatus: objetoStatus,
        objetoObservacao: objetoObservacao,
        objetoLocalDesaparecimento: objetoLocalDesaparecimento,
        objetoDtDesaparecimento: objetoDtDesaparecimento.toISOString(),
        usuarioId: usuarioId,
      }),
    })
      .then((res) => {
        if (res.status == 200) {
          setObjetoCor("");
          setObjetoFoto("");
          setObjetoNome("");
          setObjetoStatus("");
          setObjetoDtDesaparecimento(new Date());
          setObjetoLocalDesaparecimento("");
          setAlertVisible(true);
          setAlertMessage("Objeto cadastrado com sucesso!");
          setAlertType("success");
        } else {
          throw new Error("Failed to create cadastrado");
        }
      })
      .catch((err) => setErro(true));
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Image source={require("../../assets/LogoAPP.png")} style={styles.img} />
        <View style={styles.inputView}>
          <TextInput
            inputMode="text"
            style={styles.inputText}
            placeholder="Nome do objeto"
            placeholderTextColor="#fff"
            value={objetoNome}
            onChangeText={(digitado) => setObjetoNome(digitado)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            inputMode="text"
            style={styles.inputText}
            placeholder="cor do objeto"
            placeholderTextColor="#fff"
            value={objetoCor}
            onChangeText={(digitado) => setObjetoCor(digitado)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            inputMode="numeric"
            style={styles.inputText}
            placeholder="status"
            placeholderTextColor="#fff"
            value={objetoStatus}
            onChangeText={(digitado) => setObjetoStatus(digitado)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            inputMode="text"
            style={styles.inputText}
            placeholder="Observação"
            placeholderTextColor="#fff"
            value={objetoObservacao}
            onChangeText={(digitado) => setObjetoObservacao(digitado)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            inputMode="text"
            style={styles.inputText}
            placeholder="Local de desaparecimento"
            placeholderTextColor="#fff"
            value={objetoLocalDesaparecimento}
            onChangeText={(digitado) => setObjetoLocalDesaparecimento(digitado)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            inputMode="text"
            style={styles.inputText}
            placeholder="Foto do objeto"
            placeholderTextColor="#fff"
            value={objetoFoto}
            onChangeText={(digitado) => setObjetoFoto(digitado)}
          />
        </View>
        <View>
          <Text style={styles.textDt}>Data de desaparecimento</Text>
          <SelectDate
            date={objetoDtDesaparecimento}
            onChange={(event, selectedDate) =>
              setObjetoDtDesaparecimento(selectedDate || objetoDtDesaparecimento)
            }
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={CadastroObj}>
          <Text style={styles.loginText}>CADASTRAR</Text>
        </TouchableOpacity>
        <Modal
          visible={alertVisible}
          transparent
          animationType="fade"
          onRequestClose={closeAlert}
        >
          <TouchableWithoutFeedback onPress={closeAlert}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <CustomAlert
            message={alertMessage}
            type={alertType}
            onClose={closeAlert}
          />
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 15,
    paddingVertical: 100,
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  section: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
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
  textDt: {
    textAlign: 'center',
    fontSize: 20,
    height: 35,
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
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  img: {
    width: "95%",
    height: "20%",
    marginTop: 25,
  },
});
