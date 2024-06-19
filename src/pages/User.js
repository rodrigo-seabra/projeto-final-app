import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import Icon from "react-native-vector-icons/FontAwesome"; // Importe o ícone que deseja usar
import Objeto from "../components/Objeto";
import { ActivityIndicator } from "react-native";
import Detalhes from "./Detalhes";
import CriarObservacao from "./CriarObservacao";
import DetalhesUsuario from "./DetalhesUsuario";

export default function User() {
  const [objetos, setObjetos] = useState([]);
  const { getUserDetails, userInfos, Logout } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [onDetails, setOnDetails] = useState(false);
  const [selectedObjeto, setSelectedObjeto] = useState(null);
  const [onNovaObservacao, setOnNovaObservacao] = useState(false);
  const [userDetails, setUserDetails] = useState(false);

  async function getAllUserObjs() {
    await fetch(
      "http://192.168.7.109:5251/api/Objeto/GetAllObjsByUserId/" +
        userInfos.usuarioId,
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setObjetos(json);
      })
      .catch((err) => setError(true));
  }

  useEffect(() => {
    getAllUserObjs();
  }, []);

  async function getUserInfo() {
    getUserDetails();
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  async function handleLogout() {
    Logout();
  }

  const handleDetails = (objeto) => {
    setSelectedObjeto(objeto);
    setOnDetails(true);
    setOnNovaObservacao(false);
  };

  const handleNovaObservacao = () => {
    setOnNovaObservacao(true);
    setOnDetails(false);
  };
  const handleHome = () => {
    setOnNovaObservacao(false);
    setOnDetails(false);
  };

  const handleUserDetails = () => {
    setUserDetails(true);
  };

  if (userDetails) {
    return (
      <>
        <DetalhesUsuario setUserDetails={setUserDetails} />
      </>
    );
  }

  if (onNovaObservacao) {
    return (
      <>
        <CriarObservacao
          objetoId={selectedObjeto.objetoId}
          usuarioId={selectedObjeto.usuarioId}
          backToHome={() => handleHome()}
        />
      </>
    );
  }

  if (onDetails) {
    return (
      <>
        <Detalhes
          objeto={selectedObjeto}
          setOnDetails={setOnDetails}
          onNovaObs={() => handleNovaObservacao()}
        />
      </>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/LogoAPP.png")} style={styles.img} />
      <Text style={styles.title}>Olá {userInfos.usuarioNome}</Text>
      <View style={styles.userInfo}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleUserDetails}
        >
          <Text style={styles.buttonText}>Veja seus detalhes aqui</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Seus objetos</Text>
      {objetos.length > 0 ? (
        <FlatList
          data={objetos}
          renderItem={({ item }) => (
            <Objeto
              objetoNome={item.objetoNome}
              objetoCor={item.objetoCor}
              objetoFoto={item.objetoFoto}
              objetoId={item.objetoId}
              onDetails={() => handleDetails(item)}
              onNovaObservacao={() => handleNovaObservacao()}
            />
          )}
          keyExtractor={(item) => item.objetoId.toString()}
          contentContainerStyle={styles.lista}
          horizontal={false}
          numColumns={2}
        />
      ) : (
        <ActivityIndicator size="large" color="#00ff00" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  img: {
    marginTop: 5,
    width: "60%",
    height: "10%",
  },
  title: {
    margin: 5,
    fontSize: 26,
    fontWeight: "500",
    color: "white",
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
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  buttonIcon: {
    marginRight: 10,
  },
});
