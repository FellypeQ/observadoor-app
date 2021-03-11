import { React, useState } from "react";
import { Link,useHistory } from "react-router-dom";

function Login(props) {
  const [formLogin, setFormLogin] = useState({ email: "", senha: "" });

  const history = useHistory();

  const handleChange = (event) => {
    const name = event.target.attributes.name.value;
    const value = event.currentTarget.value;
    setFormLogin({ ...formLogin, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //localStorage.clear();
    localStorage.setItem("login", formLogin.email.split("@")[0]);
    history.push("/campeonatos");
  };

  return (
    <div
      className=" full-screen disp-flex just-center align-center login background-image"
      style={{ backgroundImage: "url('/images/background-lgoin.jpg')" }}
    >
      <form
        className="disp-flex flex-direct-col align-center just-center"
        onSubmit={handleSubmit}
      >
        <label className="text-24px text-center">
          Bem vindo ao Observadoor!
        </label>
        <label>E-mail</label>
        <input
          type="email"
          placeholder="digite seu e-mail"
          name="email"
          value={formLogin.email}
          onChange={handleChange}
        />
        <label>Senha</label>
        <input
          type="password"
          placeholder="Digite sua senha"
          name="senha"
          value={formLogin.senha}
          onChange={handleChange}
        />
        <button className="btn btn-black text-18px">Entrar </button>
        <Link
          to={`/register`}
          className="btn btn-blue text-14px mg-b-5 text-decore-none"
        >
          Não tem Cadastro? Cadastre-se!
        </Link>
      </form>
    </div>
  );
}

export default Login;
