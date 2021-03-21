import { React, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../autenntication/authContext";
import api from "../../autenntication/api";
import {
  ThemeProvider,
  CircularProgress,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import themes from "../../themes";

function Login(props) {
  const [formLogin, setFormLogin] = useState({ email: "", senha: "" });
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState({
    login: false,
  });
  const [error, setError] = useState({
    login: "",
  });

  const history = useHistory();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormLogin({ ...formLogin, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    localStorage.clear();

    setLoading({
      ...loading,
      login: true,
    });

    try {
      const respLogin = await api.post(
        `${process.env.REACT_APP_API_BASE}usuario/login`,
        formLogin
      );
      authContext.setLoggedInUser({ ...respLogin.data });
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...respLogin.data })
      );
      history.push("/campeonatos");
      window.location.reload(true);
    } catch (error) {
      let description = "";
      switch (error.response.status) {
        case 401:
          description = "Email ou senha incorretos";
          break;
        default:
          description = "Erro no servidor, por favor, tente novamente";
          break;
      }

      setLoading({
        ...loading,
        login: false,
      });
      setError({
        ...error,
        login: description, //error.response.status,
      });
      console.error("respLogin", error);
    }
  };

  return (
    <div
      className=" full-screen disp-flex just-center align-center login background-image"
      style={{ backgroundImage: "url('/images/background-lgoin.jpg')" }}
    >
      <ThemeProvider theme={themes}>
        <form
          className="disp-flex flex-direct-col align-center just-center just-sp-evenly pad-2 background-gray"
          onSubmit={handleSubmit}
        >
          <p className="text-24px text-center">Bem vindo ao Observadoor!</p>
          {loading.login ? (
            <CircularProgress color="primary" size={80} />
          ) : (
            <>
              <TextField
                label="E-mail"
                required={true}
                type="email"
                error={error.login !== "" ? true : false}
                helperText={error.login}
                name="email"
                value={formLogin.email}
                onChange={handleChange}
              />
              <TextField
                label="Senha"
                required={true}
                type="password"
                error={error.login !== "" ? true : false}
                helperText={error.login}
                name="senha"
                value={formLogin.senha}
                onChange={handleChange}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
              >
                Entrar
              </Button>
              <Link href="/register">Não tem Cadastro? Cadastre-se!</Link>
            </>
          )}
        </form>
      </ThemeProvider>
    </div>
  );
}

export default Login;
