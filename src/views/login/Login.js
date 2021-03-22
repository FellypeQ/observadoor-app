import { React, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../autenntication/authContext";
import api from "../../autenntication/api";
import {
  CircularProgress,
  TextField,
  Button,
  Link,
  FormControl,
  OutlinedInput,
  Input,
  InputAdornment,
  IconButton,
  InputLabel,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

function Login(props) {
  const [formLogin, setFormLogin] = useState({ email: "", senha: "" });
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState({
    login: false,
  });
  const [error, setError] = useState({
    login: "",
  });
  const [passwordView, setPasswordView] = useState(false);

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

  function render(login) {
    if (login) {
      return <CircularProgress color="primary" size={80} />;
    } else {
      return (
        <>
          <TextField
            label="E-mail"
            required={true}
            type="email"
            error={error.login !== "" ? true : false}
            name="email"
            value={formLogin.email}
            onChange={handleChange}
          />
          <FormControl className="wid-65">
            <InputLabel required={true}>Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={passwordView ? "text" : "password"}
              name="senha"
              value={formLogin.senha}
              onChange={handleChange}
              required={true}
              size="small"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={(event) => {
                      setPasswordView(!passwordView);
                    }}
                    edge="end"
                  >
                    {passwordView ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            classes="mg-y-2"
          >
            Entrar
          </Button>
          <Link href="/register">Não tem Cadastro? Cadastre-se!</Link>
        </>
      );
    }
  }
  return (
    <div
      className=" full-screen disp-flex just-center align-center login background-image"
      style={{ backgroundImage: "url('/images/background-lgoin.jpg')" }}
    >
      <FormControl
        className="disp-flex flex-direct-col align-center just-center just-sp-evenly background-gray"
        onSubmit={handleSubmit}
      >
        <p className="text-24px text-center">Bem vindo ao Observadoor!</p>
        {render(loading.login)}
      </FormControl>
    </div>
  );
}

export default Login;
