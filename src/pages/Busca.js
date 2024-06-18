import { View, Text, StyleSheet, TextInput, ActivityIndicator, Image, Animated, Button } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';


export default function Busca() {
  const fade = useRef(new Animated.Value(0)).current;
  const [usuarios, setUsuarios] = useState([])
  const [busca, setBusca] = useState('')
  const [error, setError] = useState(false)
  const [filtro, setFiltro] = useState()


  useFocusEffect(
    React.useCallback(() => {
      fade.setValue(0)
      Animated.timing(fade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, [])
  )


  async function getUsuarios() {
    await fetch('http://10.139.75.37:5251/api/Objeto/GetAllObjetos', {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    })
      .then(res =>  res.json())
      .then(json => setUsuarios(json))
      .catch(err => setError(true))
  }
  useEffect(() => {
    getUsuarios()
  }, [])
  useEffect(() => {
    setFiltro(usuarios.filter((item) => item.objetoNome == busca)[0])
  }, [busca])

  return (
    <View style={styles.container}>
      <Animated.View style={{opacity: fade, width: '100%', height:'100%'}}>
        <Image source={require("../../assets/LogoAPP.png")} style={styles.img} />
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Pesquisar..."
            value={busca}
            onChangeText={(digitado) => setBusca(digitado)}
            placeholderTextColor="#fff"
          />
          <TouchableOpacity >
            <AntDesign name="search1" size={24} color="#00ff00" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.title}>Objeto</Text>
        </View>
        {busca !== '' && !filtro && (
          <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#00ff00" />
        )}
        {filtro && busca !== '' && (
          <View style={styles.card}>
        <Image source={{ uri: filtro.objetoFoto  }} style={styles.image} />
        <Text style={styles.userName}>{filtro.objetoNome}</Text>
            <View style={styles.userInfoContainer}>
              <FontAwesome name="phone" size={18} color="white" style={styles.icon} />
              <Text style={styles.userInfo}>{`Observação: ${filtro.objetoObservacao}`}</Text>
            </View>
            <View style={styles.userInfoContainer}>
              <FontAwesome name="map-marker" size={18} color="white" style={styles.icon} />
              <Text style={styles.userInfo}>{`Local: ${filtro.objetoLocalDesaparecimento}`}</Text>
            </View>
          </View>
        )}
      </Animated.View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    overflow: 'hidden',
  },
  searchContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2.2,
    borderRadius: 5,
    borderColor: '#00ff00',
    backgroundColor: '#2c2c2c'
  },
  icon: {
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: 'white',
    marginLeft: 10,
  },
  user: {
    color: 'white',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#2c2c2c',
    borderWidth: 2,
    borderColor: '#00ff00',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  userName: {
    color: 'white',
    fontSize: 28,
    fontWeight: '500',
    marginBottom: 5,
    marginTop: 5,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
  titleBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 40,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  img: {
    width: "95%",
    height: "20%",
    marginTop: 25,
  },
})
