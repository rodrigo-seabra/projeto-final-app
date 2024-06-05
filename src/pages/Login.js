import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();

  const { Login, error } = useContext(AuthContext);

  function RealizaLogin() {
    Login(email, senha);
  
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          inputMode='email'
          style={styles.inputText}
          placeholder="Telefone, nome de usuário ou email"
          placeholderTextColor="#fff"
          value={email}
          onChangeText={(digitado) => setEmail(digitado)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          inputMode='text'
          secureTextEntry
          style={styles.inputText}
          placeholder="Senha"
          placeholderTextColor="#fff"
          value={senha}
          onChangeText={(digitado) => setSenha(digitado)}
        />
      </View>
      <TouchableOpacity style={styles.forgotBtn}>
        <Text style={styles.forgotText}>Esqueceu a senha?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={RealizaLogin}>
        <Text style={styles.loginText}>ENTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerBtn}>
        <Text style={styles.registerText}>Não tem uma conta? Cadastre-se.</Text>
      </TouchableOpacity>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Revise os campos e tente novamente</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: "#32CD32",
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
  forgotBtn: {
    width: '80%',
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  forgotText: {
    color: '#fff',
    fontSize: 15,
    color: "#32CD32",
  },
  registerBtn: {
    width: '80%',
    alignItems: 'center',
  },
  registerText: {
    color: '#fff',
    fontSize: 15,
  },
  img: {
    width: "95%",
    height: "20%",
  },
  errorContainer: {
    marginTop: 10,
  },
  errorText: {
    color: 'red',
  },
});