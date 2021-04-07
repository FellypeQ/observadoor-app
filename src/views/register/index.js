import { React, useEffect, useState } from "react";
import "./style.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { KeyboardTimePicker } from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Avatar from "@material-ui/core/Avatar";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [nr_celular, setNrCelular] = useState("");
  const [dt_nascimento, setDtNascimento] = useState("");
  const [genero, setGenero] = useState("1");
  const [error, setError] = useState({
    username: "",
    email: "",
    name: "",
    sobrenome: "",
    genero: "",
    password: "",
    nr_celular: "",
    dt_nascimento: "",
  });

  const handleDateChange = (date) => {
    setDtNascimento(date);
  };

  const history = useHistory();

  async function handleAddObservador(e) {
    e.preventDefault();
    const usuario = {
      username,
      email,
      name,
      sobrenome,
      genero,
      password,
      nr_celular,
      dt_nascimento,
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE}usuarios`, usuario);
      history.push("/campeonatos");
    } catch (error) {
      if (error.response.status === 406) {
        setError({
          username: error.response.data.erros.username || "",
          email: error.response.data.erros.email || "",
          name: error.response.data.erros.name || "",
          sobrenome: error.response.data.erros.sobrenome || "",
          genero: error.response.data.erros.genero || "",
          password: error.response.data.erros.password || "",
          nr_celular: error.response.data.erros.nr_celular || "",
          dt_nascimento: error.response.data.erros.dt_nascimento || "",
        });
        alert(
          "Erro ao tentar cadastrar. Por favor verificar campos em vermelho"
        );
        return;
      }
      alert("Erro ao tentar cadastrar. Por favor verificar: " + error);
    }
  }
  return (
    <div
      className=" full-screen disp-flex just-center align-center login background-image"
      style={{ backgroundImage: "url('/images/background-lgoin.jpg')" }}
    >
      <form
        className="disp-flex flex-direct-col align-center just-center backgroundColor"
        style={{ backgroundColor: "Gainsboro", opacity: "95%" }}
        onSubmit={handleAddObservador}
      >
        <div className="obsergvador-header">
          <Avatar
            alt="Observador"
            className="classes.large"
            src="https://st2.depositphotos.com/3474805/6388/v/600/depositphotos_63886329-stock-illustration-man-looking-through-spyglass.jpg"
          />
        </div>
        <TextField
          label="Username"
          id="outlined-basic"
          variant="outlined"
          required
          error={error.username.length > 0 ? true : false}
          helperText={error.username}
          size="small"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          id="outlined-basic"
          variant="outlined"
          size="small"
          required
          error={error.email.length > 0 ? true : false}
          helperText={error.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Senha"
          type="password"
          id="outlined-basic"
          variant="outlined"
          size="small"
          required
          error={error.password.length > 0 ? true : false}
          helperText={error.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Nome"
          id="outlined-basic"
          variant="outlined"
          size="small"
          required
          error={error.name.length > 0 ? true : false}
          helperText={error.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Sobrenome"
          id="outlined-basic"
          variant="outlined"
          size="small"
          required
          error={error.sobrenome.length > 0 ? true : false}
          helperText={error.sobrenome}
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
        />
        <TextField
          label="Celular"
          id="outlined-basic"
          variant="outlined"
          size="small"
          required
          error={error.nr_celular.length > 0 ? true : false}
          helperText={error.nr_celular}
          value={nr_celular}
          onChange={(e) => setNrCelular(e.target.value)}
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            label="Data de Nascimento"
            color="primary"
            margin="normal"
            id="date-picker-dialog"
            format="MM/dd/yyyy"
            required
            size="small"
            error={error.dt_nascimento.length > 0 ? true : false}
            helperText={error.dt_nascimento}
            value={dt_nascimento}
            onChange={handleDateChange}
            className="formatacaoCalendar"
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        <div>
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="top"
          >
            <FormControlLabel
              value="1"
              control={<Radio color="primary" />}
              label="Masculino"
              labelPlacement="end"
              onChange={(e) => setGenero(e.target.value)}
            />
            <FormControlLabel
              value="2"
              control={<Radio color="primary" />}
              label="Feminino"
              labelPlacement="end"
              onChange={(e) => setGenero(e.target.value)}
            />
          </RadioGroup>
        </div>

        <Button variant="contained" color="primary" type="submit">
          Cadastrar
        </Button>
        <div className="jaCadastrado">
          <p color="black">
            Já tem Cadastro?{" "}
            <Link className="redirect-home" to={"/"}>
              Entre Aqui!
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
