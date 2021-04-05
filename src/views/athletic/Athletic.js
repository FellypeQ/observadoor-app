import { React, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../../autenntication/api";

import {
  FormControl,
  TextField,
  Typography,
  MenuItem,
  Fab,
  Button,
  Backdrop,
  CircularProgress,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  makeStyles,
  Slider,
  Divider,
} from "@material-ui/core";

import Inputs from "../../components/Inputs";
import Game from "../../components/Game";
import Navbar from "../../components/Navbar";

const useStyles = makeStyles({
  text: {
    fontSize: "0.8rem",
  },
});

function Athletic(props) {
  const { id, gameId, athleteId } = props.match.params;
  const [loading, setLoading] = useState({ athlete: false });

  const classes = useStyles();

  const history = useHistory();
  const idChampionship = props.match.params.id;
  const idGame = props.match.params.gameId;
  const idAthlete = props.match.params.athleteId;
  const nomeObsevador = JSON.parse(localStorage.getItem("loggedInUser"));
  const [championship, setChampionship] = useState("");
  const [game, setGame] = useState({
    gameName: "",
    dateGame: "",
    category: "",
    teamA: "",
    teamB: "",
  });
  const [athletePhotos, setAthletePhotos] = useState({
    principal: "",
    others: [],
    documents: [],
  });
  const [athlete, seAthlete] = useState({
    idGame: idGame,
    idChampionship: idChampionship,
    picture: athletePhotos.principal,
    name: "",
    year: "",
    birthDate: "",
    team: "",
    shirtNumber: "",
    skillLeg: "",
    shortPass: "",
    longPass: "",
    header: "",
    position: "",
    velocity: "",
    reactionPower: "",
    mobility: "",
    finalization: "",
    comentary: "",
    contacts: [
      {
        name: "",
        phone: "",
        responsable: "",
      },
    ],
    avaliationStatus: "",
    avaliationInClub: "",
    competitionEvaluators: "",
    morePhotos: [],
    documentPhotos: [],
    userID: "",
  });
  const [pageAthlete, setPageAthlete] = useState(1);

  useEffect(async () => {
    setLoading({ ...loading, athlete: true });

    try {
      const respChampionship = await api.get(
        `${process.env.REACT_APP_API_BASE}championship/${idChampionship}`
      );
      setChampionship(respChampionship.data.name);
    } catch (error) {
      setLoading({ ...loading, athlete: false });
      console.error(error);
    }
    try {
      const respGame = await api.get(
        `${process.env.REACT_APP_API_BASE}game/${idGame}`
      );
      setGame({
        gameName: respGame.data.gameName,
        dateGame: respGame.data.dateGame.replace("Z", ""),
        category: respGame.data.category,
        teamA: respGame.data.teamA,
        teamB: respGame.data.teamB,
      });

      if (props.match.params.athleteId) {
        try {
          const respAthlete = await api.get(
            `${process.env.REACT_APP_API_BASE}athlete/${idAthlete}`
          );

          seAthlete({
            idGame: respAthlete.data.idGame,
            idChampionship: respAthlete.data.idChampionship,
            pictture: respAthlete.data.pictture,
            name: respAthlete.data.name,
            year: respAthlete.data.year,
            birthDate: respAthlete.data.birthDate,
            team: respAthlete.data.team,
            shirtNumber: respAthlete.data.shirtNumber,
            skillLeg: respAthlete.data.skillLeg,
            shortPass: respAthlete.data.shortPass,
            longPass: respAthlete.data.longPass,
            header: respAthlete.data.header,
            position: respAthlete.data.position,
            velocity: respAthlete.data.velocity,
            reactionPower: respAthlete.data.reactionPower,
            mobility: respAthlete.data.mobility,
            finalization: respAthlete.data.finalization,
            comentary: respAthlete.data.comentary,
            contacts: respAthlete.data.contacts,
            avaliationStatus: respAthlete.data.avaliationStatus,
            avaliationInClub: respAthlete.data.avaliationInClub,
            competitionEvaluators: respAthlete.data.competitionEvaluators,
            morePhotos: respAthlete.data.morePhotos,
            documentPhotos: respAthlete.data.documentPhotos,
            userID: respAthlete.data.userID,
          });
        } catch (error) {
          setLoading({ ...loading, athlete: false });
          console.error(error);
        }
      }
      setLoading({ ...loading, athlete: false });
    } catch (error) {
      setLoading({ ...loading, athlete: false });
      console.error(error);
    }
  }, []);

  const handleChange = (event, slider, name, value) => {
    if (slider === true) {
      seAthlete({
        ...athlete,
        [name]: value,
      });
      return;
    }

    seAthlete({
      ...athlete,
      [event.target.name]: event.target.value,
    });
  };
  function changeContacts(event, typeChange, index, key, value) {
    event.preventDefault();

    if (typeChange === "change") {
      let tempListContact = athlete.contacts;

      tempListContact[index][key] = value;

      seAthlete({
        ...athlete,
        contacts: tempListContact,
      });
    }
    if (typeChange === "add") {
      let tempListContact = athlete.contacts;

      tempListContact.push({
        name: "",
        phone: "",
        responsable: "",
      });

      seAthlete({
        ...athlete,
        contacts: tempListContact,
      });
    }
    if (typeChange === "delete") {
      let tempListContact = athlete.contacts;

      tempListContact.splice(index, 1);

      seAthlete({
        ...athlete,
        contacts: tempListContact,
      });
    }
  }
  const handleChangePageAvance = () => {
    if (pageAthlete === 3) {
      return;
    }
    let newPage = pageAthlete;
    setPageAthlete(newPage + 1);
  };
  const handleChangePageRegresse = () => {
    if (pageAthlete === 1) {
      return;
    }
    let newPage = pageAthlete;
    setPageAthlete(newPage - 1);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (idAthlete) {
      console.log("atualizando");
      try {
        const respUpdateAthlete = await api.patch(
          `${process.env.REACT_APP_API_BASE}athlete/${idAthlete}`,
          athlete
        );
        console.log("atualizado");
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("criando");
      try {
        const respCreateAthlete = await api.post(
          `${process.env.REACT_APP_API_BASE}athlete`,
          athlete
        );
        console.log(respCreateAthlete);
        history.push(
          `/campeonatos/detalhes/${idChampionship}/jogos/${idGame}/${respCreateAthlete.data.result._id}`
        );
        console.log("criado");
        window.location.reload(true);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleDelete = async () => {
    try {
      const respDeleteAthlete = await api.delete(
        `${process.env.REACT_APP_API_BASE}athlete/${idAthlete}`,
        athlete
      );
      history.push(
        `/campeonatos/detalhes/${idChampionship}/jogos/${idGame}/athlets`
      );
    } catch (error) {
      console.error(error);
    }
  };

  function saveImage(event, group) {
    event.preventDefault();

    setAthletePhotos({
      ...athletePhotos,
      [group]:
        "https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340",
    });

    //handleSave(event);
  }

  const marks = [
    {
      value: 0,
      label: "ruim",
    },
    {
      value: 30,
      label: "normal",
    },
    {
      value: 60,
      label: "bom",
    },
    {
      value: 100,
      label: "acima da média",
    },
  ];
  function valuetext(text) {
    let tempValue = marks.find((mark) => mark.label === text);

    if (tempValue !== undefined) {
      tempValue = marks.find((mark) => mark.label === text).value;
    } else {
      tempValue = 0;
    }

    return tempValue;
  }
  function changeSlider(name, value) {
    const label = marks.find((mark) => mark.value === value).label;

    handleChange("slider", true, name, label);
  }
  return (
    <div className="full-screen">
      <Backdrop open={loading.athlete}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Navbar championship={idChampionship} game={gameId} athlete={athleteId} />

      <Game
        gameName={game.gameName}
        dateGame={game.dateGame}
        category={game.category}
        teamA={game.teamA}
        teamB={game.teamB}
        disabled={"disabled"}
        noButton={true}
      />

      <form className="mg-y-2">
        <Typography variant="subtitle1">
          {props.location.pathname.includes("novo")
            ? "Novo Atleta"
            : "Editar Atleta"}
        </Typography>
        <TextField
          label="Nome"
          type="text"
          className="wid-60"
          variant="outlined"
          size="small"
          margin="dense"
          name="name"
          value={athlete.name}
          InputProps={{ className: "input-smaller" }}
          onChange={handleChange}
        />
        <TextField
          label="Ano de nascimento"
          type="number"
          InputProps={{ className: "input-smaller" }}
          InputLabelProps={{ style: { fontSize: "max(0.7rem)" } }}
          className="wid-35"
          variant="outlined"
          size="small"
          margin="dense"
          name="year"
          value={athlete.year}
          onChange={handleChange}
        />
        <TextField
          label="Data de nascimento"
          type="date"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            className: "input-smaller",
            style: { fontSize: "max(0.9rem)" },
          }}
          className="wid-45"
          variant="outlined"
          size="small"
          margin="dense"
          name="birthDate"
          value={
            athlete.birthDate
              ? athlete.birthDate.split("T")[0]
              : athlete.birthDate
          }
          onChange={handleChange}
        />
        <TextField
          label="Equipe do atleta"
          select
          className="wid-50"
          InputProps={{ className: "input-smaller" }}
          variant="outlined"
          size="small"
          margin="dense"
          name="team"
          value={athlete.team}
          onChange={handleChange}
        >
          {[game.teamA, game.teamB].map((el, idx) => (
            <MenuItem key={idx} value={el}>
              {el}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Perna de maior habilidade"
          select
          className="wid-60"
          InputProps={{ className: "input-smaller" }}
          InputLabelProps={{ style: { fontSize: "max(0.85rem)" } }}
          variant="outlined"
          size="small"
          margin="dense"
          name="skillLeg"
          value={athlete.skillLeg}
          onChange={handleChange}
        >
          {["Esquerda", "Direita"].map((el, idx) => (
            <MenuItem key={idx} value={el}>
              {el}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Numero camisa"
          type="number"
          className="wid-35"
          variant="outlined"
          size="small"
          margin="dense"
          InputProps={{ className: "input-smaller" }}
          InputLabelProps={{ style: { fontSize: "max(0.8rem)" } }}
          name="shirtNumber"
          value={athlete.shirtNumber}
          onChange={handleChange}
        />
      </form>
      {pageAthlete === 1 && (
        <form>
          <Divider className="mg-y-2" />
          <Typography variant="subtitle2">Fundamentos</Typography>
          <Typography className={classes.text}>Passe curto</Typography>
          <Slider
            name="shortPass"
            step={null}
            marks={marks}
            valueLabelDisplay="off"
            value={valuetext(athlete.shortPass)}
            onChange={(event, value) => {
              changeSlider("shortPass", value);
            }}
          />
          <Typography className={classes.text}>Passe longo</Typography>
          <Slider
            name="longPass"
            step={null}
            marks={marks}
            valueLabelDisplay="off"
            value={valuetext(athlete.longPass)}
            onChange={(event, value) => {
              changeSlider("longPass", value);
            }}
          />
          <Typography className={classes.text}>Cabeceio</Typography>
          <Slider
            name="header"
            step={null}
            marks={marks}
            valueLabelDisplay="off"
            value={valuetext(athlete.header)}
            onChange={(event, value) => {
              changeSlider("header", value);
            }}
          />
          <Typography className={classes.text}>Posicionamento</Typography>
          <Slider
            name="position"
            step={null}
            marks={marks}
            valueLabelDisplay="off"
            value={valuetext(athlete.position)}
            onChange={(event, value) => {
              changeSlider("position", value);
            }}
          />
          <Typography className={classes.text}>Velocidade</Typography>
          <Slider
            name="velocity"
            step={null}
            marks={marks}
            valueLabelDisplay="off"
            value={valuetext(athlete.velocity)}
            onChange={(event, value) => {
              changeSlider("velocity", value);
            }}
          />
          <Typography className={classes.text}>Poder de reação</Typography>
          <Slider
            name="reactionPower"
            step={null}
            marks={marks}
            valueLabelDisplay="off"
            value={valuetext(athlete.reactionPower)}
            onChange={(event, value) => {
              changeSlider("reactionPower", value);
            }}
          />
          <Typography className={classes.text}>Mobilidade</Typography>
          <Slider
            name="mobility"
            step={null}
            marks={marks}
            valueLabelDisplay="off"
            value={valuetext(athlete.mobility)}
            onChange={(event, value) => {
              changeSlider("mobility", value);
            }}
          />
          <Typography className={classes.text}>Finalização</Typography>
          <Slider
            name="finalization"
            step={null}
            marks={marks}
            valueLabelDisplay="off"
            value={valuetext(athlete.finalization)}
            onChange={(event, value) => {
              changeSlider("finalization", value);
            }}
          />
          <TextField
            label="Adicionar comentário"
            multiline
            rows={3}
            className="wid-95"
            variant="outlined"
            size="small"
            margin="dense"
            name="comentary"
            value={athlete.comentary}
            onChange={handleChange}
          />
        </form>
      )}
      <form className="disp-flex flex-direct-col">
        {pageAthlete === 2 && (
          <div>
            <h4>Contatos</h4>
            {athlete.contacts.map((contact, index) => (
              <div key={index} className="bdtt">
                <Inputs
                  label="Nome: "
                  placeholder="Nome do contato"
                  type="text"
                  name="name"
                  value={contact.name}
                  onChange={(event) =>
                    changeContacts(
                      event,
                      "change",
                      index,
                      "name",
                      event.target.value
                    )
                  }
                />
                <Inputs
                  label="Telefone: "
                  placeholder="Telefone do contato"
                  type="text"
                  name="phone"
                  value={contact.phone}
                  onChange={(event) =>
                    changeContacts(
                      event,
                      "change",
                      index,
                      "phone",
                      event.target.value
                    )
                  }
                />
                <Inputs
                  format="select"
                  label="Responsável: "
                  name="responsable"
                  value={contact.responsable}
                  options={[
                    "Selecione o responsárvel",
                    "Pai",
                    "Mãe",
                    "Empresário",
                    "Tio(a)",
                    "Irmão",
                    "Irmã",
                    "Amigo(a)",
                    "Outro",
                  ]}
                  onChange={(event) =>
                    changeContacts(
                      event,
                      "change",
                      index,
                      "responsable",
                      event.target.value
                    )
                  }
                />
                <button onClick={(event) => changeContacts(event, "add")}>
                  Adicionar outro contato
                </button>
                {index > 0 && (
                  <button
                    onClick={(event) => changeContacts(event, "delete", index)}
                  >
                    Escluir contato
                  </button>
                )}
              </div>
            ))}
            <h5>Status da avaliação:</h5>
            <Inputs
              format="radio"
              type="radio"
              name="avaliationStatus"
              value={athlete.avaliationStatus}
              onChange={handleChange}
              options={["Aprovado", "Observar", "Aprovado direto"]}
            />
            <h5>Agendar avaliação no clube:</h5>
            <Inputs
              format="radio"
              type="radio"
              name="avaliationInClub"
              value={athlete.avaliationInClub}
              onChange={handleChange}
              options={["Prioridade", "Normal"]}
            />
            <h5>Concorrência de avaliadores:</h5>
            <Inputs
              format="radio"
              type="radio"
              name="competitionEvaluators"
              value={athlete.competitionEvaluators}
              onChange={handleChange}
              options={["Alta", "Normal", "Baixa"]}
            />
          </div>
        )}
        {pageAthlete === 3 && (
          <div>
            <h4>Adicionar fotos do atleta:</h4>
            <h4>Adicionar documentos do atleta:</h4>
          </div>
        )}
      </form>
      <div className="disp-flex just-sp-evenly align-center flex-wrap">
        {pageAthlete > 1 && (
          <button
            className="btn btn-blue mg-y-2 "
            onClick={handleChangePageRegresse}
          >
            Voltar
          </button>
        )}
        <button
          className="btn btn-black mg-y-2 "
          onClick={handleChangePageAvance}
        >
          {pageAthlete === 1 && "Adicionar mais informações"}
          {pageAthlete === 2 && "Adicionar fotos e documentos"}
          {pageAthlete === 3 && "Ver ficha do atleta"}
        </button>
        <button className="btn btn-green mg-y-2 " onClick={handleSave}>
          Salvar
        </button>
        <button className="btn btn-red mg-y-2 " onClick={handleDelete}>
          Excluir
        </button>
        <Link
          to={`/campeonatos/detalhes/${idChampionship}/jogos`}
          className="text-decore-none"
        >
          <button className="btn btn-blue mg-y-2 ">Voltar para jogos</button>
        </Link>
      </div>
    </div>
  );
}

export default Athletic;

/*
<FormControl component="fieldset">
  <FormLabel component="legend">Perna de maior habilidade</FormLabel>
  <RadioGroup
    aria-label="gender"
    name="skillLeg"
    className="flex-direct-row"
    value={athlete.skillLeg}
    onChange={handleChange}
  >
    <FormControlLabel
      value="Esquerda"
      control={<Radio />}
      label="Esquerda"
    />
    <FormControlLabel
      value="Direita"
      control={<Radio />}
      label="Direita"
    />
  </RadioGroup>
</FormControl>
*/
/*
{!idAthlete ? (
  <p>Para inserir fotos, é necessário salvar o cadastro antes</p>
) : (
  <>
    <img alt="picture" src={athletePhotos.principal} />
    <Inputs
      label="Foto atleta"
      type="file"
      className="disp-block"
      onChange={(event) => {
        saveImage(event, "principal");
      }}
    />
  </>
)}
*/
