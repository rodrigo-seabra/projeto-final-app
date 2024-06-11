import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function Infos ({ objeto, usuario, setOnDetails }) {
  return (
    <View style={styles.headerContainer}>
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
      <Text style={styles.commentsTitle}>Observações</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#000',
    padding: 20,
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#32CD32',
    padding: 10,
    borderRadius: 5,
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
    height: 300,
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
  commentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#32CD32',
    marginTop: 20,
    marginBottom: 10,
  },
});


