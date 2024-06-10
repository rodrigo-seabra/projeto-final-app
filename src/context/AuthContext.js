import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext(0);

function AuthProvider({ children }) {
  const [logado, setLogado] = useState(false);
  const [successLogin, setSuccessLogin] = useState(null);
  const [successCadastro, setSuccessCadastro] = useState(false);

  const [error, setError] = useState(false);
  const [cadastro, setCadastro] = useState(false);
  const [showCadastro, setShowCadastro] = useState(false); // Estado para alternar entre as telas

  async function RealizaCadastro(email, username, password, phone) {
    await fetch("http://192.168.7.100:5251/api/Usuario/CreateUser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        usuarioEmail: email,
        usuarioNome: username,
        usuarioSenha: password,
        usuarioTelefone: phone,
      }),
    })
      .then((res) => {
        if (res.status == 200) {
          setSuccessCadastro(true);
          setTimeout(() => {
            setSuccessCadastro(false);
            setShowCadastro(false);
          }, 2000);
        } else {
          setError(true);
        }
      })
      .catch((err) => setError(true));
  }

  async function Login(email, senha) {
    await fetch("http://192.168.7.100:5251/api/Usuario/Login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        UsuarioEmail: email,
        UsuarioSenha: senha,
      }),
    })
      .then((res) => res.json())
      .then(async (json) => {
        if (json.success) {
          try {
            await AsyncStorage.setItem(
              "userId",
              json.user.usuarioId.toString()
            );
          } catch (err) {
            setError(true);
          }
          console.log("CHEGOU");
          setSuccessLogin(true);
          setTimeout(() => {
            setLogado(true);
            setSuccessLogin(false);
          }, 2000);
        } else {
          setError(true);
        }
      })
      .catch((err) => setError(true));
  }

  function toggleScreen() {
    setShowCadastro(!showCadastro);
  }

  return (
    <AuthContext.Provider
      value={{
        logado,
        Login,
        error,
        cadastro,
        RealizaCadastro,
        showCadastro,
        toggleScreen,
        successCadastro,
        successLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
