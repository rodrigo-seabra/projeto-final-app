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
  Animated,
} from "react-native";
import React, { useContext, useState, useEffect, useRef } from "react";
import CustomAlert from "../components/CustomAlert";
import SelectDate from "../components/SelectDate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function CadastroObjeto() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [objetoNome, setObjetoNome] = useState("");
  const [objetoCor, setObjetoCor] = useState("");
  const [objetoObservacao, setObjetoObservacao] = useState("");
  const [objetoLocalDesaparecimento, setObjetoLocalDesaparecimento] =
    useState("");
  const [objetoFoto, setObjetoFoto] = useState("");
  const [objetoDtDesaparecimento, setObjetoDtDesaparecimento] = useState(
    new Date()
  );
  const [erro, setErro] = useState(false);
  const fade = useRef(new Animated.Value(0)).current;
  const [usuarioId, setUsuarioId] = useState();

  useFocusEffect(
    React.useCallback(() => {
      fade.setValue(0);
      Animated.timing(fade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, [])
  );

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
    await fetch("http://192.168.7.109:5251/api/Objeto/CreateObjeto", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        objetoNome: objetoNome,
        objetoCor: objetoCor,
        objetoFoto: objetoFoto,
        objetoStatus: 1,
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
          setObjetoObservacao("");
          setObjetoNome("");
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
      <Animated.View style={{ height: "100%", width: "100%", opacity: fade }}>
        <View style={styles.container}>
          <Image
            source={require("../../assets/LogoAPP.png")}
            style={styles.img}
          />
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
              onChangeText={(digitado) =>
                setObjetoLocalDesaparecimento(digitado)
              }
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
                setObjetoDtDesaparecimento(
                  selectedDate || objetoDtDesaparecimento
                )
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
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 15,
    paddingVertical: 65,
    paddingBottom: 200,
  },
  container: {
    width: "100%",
    alignItems: "center",
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
    textAlign: "center",
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
