import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View, Text, ActivityIndicator, Button, TouchableOpacity } from 'react-native'

export default function Detalhes({ objeto, setOnDetails, onNovaObs }) {
  const [usuario, setUsuario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function getUser() {
    await fetch('http://10.139.75.37:5251/api/Usuario/GetUserId/' + objeto.usuarioId, {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    })
      .then(res => res.json())
      .then(json => setUsuario(json))
      .finally(setLoading(false))
      .catch(err => setError(true))
  }
  useEffect(() => {
    getUser()
  }, [])

  if (loading) {
    return <ActivityIndicator size="large" color="#32CD32" />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => setOnDetails(false)}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{objeto.objetoNome}</Text>
      <Image source={{ uri: objeto.objetoFoto }} style={styles.image} />
      <Text style={styles.label}>Cor: <Text style={styles.value}>{objeto.objetoCor}</Text></Text>
      <Text style={styles.label}>Observação: <Text style={styles.value}>{objeto.objetoObservacao}</Text></Text>
      <Text style={styles.label}>Local de Desaparecimento: <Text style={styles.value}>{objeto.objetoLocalDesaparecimento}</Text></Text>
      <Text style={styles.label}>Data de Desaparecimento: <Text style={styles.value}>{new Date(objeto.objetoDtDesaparecimento).toLocaleDateString()}</Text></Text>
      <Text style={styles.label}>Data de Encontro: <Text style={styles.value}>{new Date(objeto.objetoDtEncontro).toLocaleDateString()}</Text></Text>
      <Text style={styles.label}>Status: <Text style={styles.value}>{objeto.objetoStatus == 1 ? 'Desaparecido' : 'Achado'}</Text></Text>
      <Text style={styles.label}>Usuário: <Text style={styles.value}>{usuario.usuarioNome}</Text></Text>
      <TouchableOpacity style={styles.button} onPress={onNovaObs}>
        <Text style={styles.buttonText}>Nova Observação</Text>
      </TouchableOpacity>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#32CD32',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#32CD32',
    padding: 15,
    borderRadius: 5,
  },
  buttonText:{
    color: '#fff',
    fontWeight: 'bold',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#32CD32',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#32CD32',
    marginBottom: 10,
  },
  value: {
    color: '#fff',
  },
});
