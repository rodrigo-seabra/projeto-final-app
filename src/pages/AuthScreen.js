import React, { useContext } from "react";
import { View, StyleSheet, Button } from "react-native";
import Login from "./Login";
import CadastroUsuario from "./CadastroUsuario";
import { AuthContext } from "../context/AuthContext";

export default function AuthScreen() {
  const { showCadastro, toggleScreen } = useContext(AuthContext);

  return (
    <>
      {showCadastro ? <CadastroUsuario /> : <Login />}
      <Button
        title={
          showCadastro
            ? "Já tem uma conta? Faça login"
            : "Não tem uma conta? Cadastre-se"
        }
        onPress={toggleScreen}
      />
    </>
  );
}

const styles = StyleSheet.create({});
