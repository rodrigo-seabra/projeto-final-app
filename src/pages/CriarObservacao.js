import React, { useEffect, useState } from 'react'
import { ScrollView, View, TextInput, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';


export default function CriarObservacao({ backToHome, usuarioId, objetoId }) {
  const [observacoesDescricao, setObservacoesDescricao] = useState('');
  const [observacoesData, setObservacoesData] = useState('');
  const [sucesso, setSucesso] = useState(false)
  const [erro, setErro] = useState(false)

  async function postObservacao() {
        await fetch('http://10.139.75.37:5251/api/Observacoes/CreateObservacao', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        observacoesDescricao: observacoesDescricao,
        observacoesData: "2024-06-05T17:47:01.781Z",
        usuarioId: usuarioId,
        objetoId: objetoId
      })
    }).then(res => {
      if (res.status == 200) {
        setSucesso(true);
        setObservacoesDescricao('');
        setObservacoesData('');
      } else {
        throw new Error('Failed to create observation');
      }
    })
      .catch(err => setError(true))

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
          placeholder="Data da observação (YYYY-MM-DDTHH:MM:SS.sssZ)"
          placeholderTextColor="#fff"
          value={observacoesData}
          onChangeText={(text) => setObservacoesData(text)}
        />
      </View>
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
            <Text style={styles.modalText}>Observação cadastrada com sucesso!</Text>
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
            <Text style={styles.modalText}>Erro ao cadastrar observação. Revise os campos e tente novamente.</Text>
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
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: -100,
    left: 15,
    backgroundColor: '#32CD32',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputView: {
    width: '85%',
    backgroundColor: '#696969',
    borderRadius: 5,
    height: 60,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 65,
    color: '#fff',
  },
  loginBtn: {
    width: '85%',
    backgroundColor: '#32CD32',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
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
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#32CD32',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});