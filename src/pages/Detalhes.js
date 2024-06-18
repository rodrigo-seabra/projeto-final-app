import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View, Text, ActivityIndicator, Button, TouchableOpacity, ScrollView } from 'react-native'
import Infos from '../components/Infos';


export default function Detalhes({ objeto, setOnDetails, onNovaObs }) {
  const [usuario, setUsuario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [observacoes, setObservacoes] = useState([]);

  async function getUser() {
    await fetch('http://10.139.75.37:5251/api/Usuario/GetUserId/' + objeto.usuarioId, {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    })
      .then(res => res.json())
      .then(json => setUsuario(json))
      .finally(() => setLoading(false))
      .catch(err => setError(true));
  }

  async function getObservacao() {
    await fetch('http://10.139.75.37:5251/api/Observacoes/GetObservacaoObjetoId/' + objeto.objetoId, {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    })
      .then(res => res.json())
      .then(json => setObservacoes(json))
      .finally(() => setLoading(false))
      .catch(err => setError(true));
  }

  useEffect(() => {
    getUser();
    getObservacao();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#32CD32" />
      </View>
    );
  }

  return (
    <ScrollView  contentContainerStyle={styles.container}>
      <Infos objeto={objeto} usuario={usuario} setOnDetails={setOnDetails} />
      <View style={styles.observacoesContainer}>
      {observacoes.length === 0 ? (
        <Text style={styles.noObservacoesText}>Nenhuma observação cadastrada</Text>
      ) : (
        observacoes.map((obs, index) => (
          <View key={index} style={styles.observacaoCard}>
            <Text style={styles.observacaoText}>{obs.observacoesDescricao}</Text>
            <Text style={styles.observacaoLocal}>Local: {obs.observacaoLocal}</Text>
            <Text style={styles.observacaoDate}>{new Date(obs.observacoesData).toLocaleDateString()}</Text>
          </View>
        ))
      )}
      </View>
      <TouchableOpacity style={styles.button} onPress={onNovaObs}>
        <Text style={styles.buttonText}>Nova Observação</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingTop: 50,
    paddingBottom: 300,
  },
  observacoesContainer: {
    marginVertical: 10,
  },
  observacaoCard: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  observacaoText: {
    color: '#fff',
    fontSize: 16,
  },
  observacaoLocal: {
    color: '#fff',
    marginVertical: 2,
    fontSize: 15,
  },
  observacaoDate: {
    color: '#bbb',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#32CD32',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noObservacoesText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
