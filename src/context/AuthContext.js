import { createContext, useState } from "react";

export const AuthContext = createContext(0);

function AuthProvider({ children }) {
  const [logado, setLogado] = useState(false);
  const [error, setError] = useState(false);
  const [cadastro, setCadastro] = useState(false);

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
      .then((res) => (res.status == 200 ? setCadastro(true) : setError(true)))
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
      .then((res) => (res.status == 200 ? setLogado(true) : setError(true)))
      .catch((err) => setError(true));
  }

  function trocarFuncao() {
    setCadastro(true);
  }
  return (
    <AuthContext.Provider
      value={{
        logado: logado,
        Login,
        error: error,
        cadastro: cadastro,
        RealizaCadastro,
        trocarFuncao,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
