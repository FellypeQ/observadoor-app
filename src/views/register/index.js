import { React, useEffect, useState } from "react";
import './style.css'
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardTimePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Avatar from '@material-ui/core/Avatar';

export default function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [genero, setGenero] = useState('');
    const [password, setPassword] = useState('');
    const [nr_celular, setNrCelular] = useState('');
    const [dt_nascimento, setDtNascimento] = useState(new Date('2014-08-18T21:11:54'));

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
            dt_nascimento
        };

        try {
            await axios.post(
                `${process.env.REACT_APP_API_BASE}usuarios`, usuario
            )
            history.push("/campeonatos");
        } catch (error) {
            alert("Erro ao tentar cadastrar. Por favor verificar: " + error)
        }
    }

    return (
        <div
            className=" full-screen disp-flex just-center align-center login background-image"
            style={{ backgroundImage: "url('/images/background-lgoin.jpg')" }}
        >
            <div className="content">


                <form className="disp-flex flex-direct-col align-center just-center backgroundColor"
                    style={{ backgroundColor: "Gainsboro", opacity: "95%" }}
                    onSubmit={handleAddObservador}>
                    <div className="obsergvador-header">
                        <Avatar alt="Observador"
                            className="classes.large"
                            src="https://st2.depositphotos.com/3474805/6388/v/600/depositphotos_63886329-stock-illustration-man-looking-through-spyglass.jpg" />
                    </div>
                    <TextField id="outlined-basic" label="Username" variant="outlined" value={username} onChange={e => setUsername(e.target.value)} />
                    <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} />
                    <TextField type="password" id="outlined-basic" label="Senha" variant="outlined" value={password} onChange={e => setPassword(e.target.value)} />
                    <TextField id="outlined-basic" label="Nome" variant="outlined" value={name} onChange={e => setName(e.target.value)} />
                    <TextField id="outlined-basic" label="Sobrenome" variant="outlined" value={sobrenome} onChange={e => setSobrenome(e.target.value)} />
                    <TextField id="outlined-basic" label="Celular" variant="outlined" value={nr_celular} onChange={e => setNrCelular(e.target.value)} />

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            color="primary"
                            margin="normal"
                            id="date-picker-dialog"
                            label="Data de Nascimento"
                            format="MM/dd/yyyy"
                            value={dt_nascimento}
                            onChange={handleDateChange}
                            className="formatacaoCalendar"
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <div>
                        <RadioGroup row aria-label="position" name="position" defaultValue="top">
                            <FormControlLabel
                                value="1"
                                control={<Radio color="primary" />}
                                label="Masculino"
                                labelPlacement="end"
                                onChange={e => setGenero(e.target.value)}
                            />
                            <FormControlLabel
                                value="2"
                                control={<Radio color="primary" />}
                                label="Feminino"
                                labelPlacement="end"
                                onChange={e => setGenero(e.target.value)}
                            />
                        </RadioGroup>
                    </div>

                    <Button color="primary" type="submit">Cadastrar</Button>
                    <div className="jaCadastrado">
                        <p color="black">Já tem Cadastro? <Link className="redirect-home" to={'/'}>Entre Aqui!</Link></p>
                    </div>

                </form>
            </div>
        </div>

    );
}