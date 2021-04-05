import { React, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../../autenntication/api";

import {
  FormControl,
  FormGroup,
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
  InputLabel,
} from "@material-ui/core";
import PostAddIcon from "@material-ui/icons/PostAdd";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import ReplyIcon from "@material-ui/icons/Reply";

import Inputs from "../../components/Inputs";
import Game from "../../components/Game";
import Navbar from "../../components/Navbar";
import CardContact from "../../components/CardContact";

const useStyles = makeStyles({
  MuiTypography: {
    body1: {
      fontSize: "0.8rem",
    },
  },
  text: {
    fontSize: "0.8rem",
  },
  danger: {
    backgroundColor: "#ef9a9a",
    "&:hover": { backgroundColor: "#af4448" },
  },
});

function Athletic(props) {
  const { id, gameId, athleteId } = props.match.params;
  const idChampionship = id;

  const [loading, setLoading] = useState({ athlete: false });

  const classes = useStyles();

  const history = useHistory();
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
    idGame: gameId,
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
    } catch (error) {
      setLoading({ ...loading, athlete: false });
      console.error(error);
    }
    try {
      const respGame = await api.get(
        `${process.env.REACT_APP_API_BASE}game/${gameId}`
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
            `${process.env.REACT_APP_API_BASE}athlete/${athleteId}`
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

    if (athleteId) {
      console.log("atualizando");
      try {
        const respUpdateAthlete = await api.patch(
          `${process.env.REACT_APP_API_BASE}athlete/${athleteId}`,
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
          `/campeonatos/detalhes/${idChampionship}/jogos/${gameId}/${respCreateAthlete.data.result._id}`
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
        `${process.env.REACT_APP_API_BASE}athlete/${athleteId}`,
        athlete
      );
      history.push(
        `/campeonatos/detalhes/${idChampionship}/jogos/${gameId}/athlets`
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
          <>
            <div className="mg-y-2">
              <TextField
                label="Status da avaliação"
                select
                className="wid-50"
                InputProps={{ className: "input-smaller" }}
                variant="outlined"
                size="small"
                margin="dense"
                name="avaliationStatus"
                value={athlete.avaliationStatus}
                onChange={handleChange}
              >
                {["Aprovado", "Observar", "Aprovado direto"].map((el, idx) => (
                  <MenuItem key={idx} value={el}>
                    {el}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Concorrência"
                select
                className="wid-45"
                InputProps={{ className: "input-smaller" }}
                variant="outlined"
                size="small"
                margin="dense"
                name="competitionEvaluators"
                value={athlete.competitionEvaluators}
                onChange={handleChange}
              >
                {["Baixa", "Normal", "Alta"].map((el, idx) => (
                  <MenuItem key={idx} value={el}>
                    {el}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                Agendar avaliação no clube
              </FormLabel>
              <RadioGroup
                name="avaliationInClub"
                className="flex-direct-row"
                value={athlete.avaliationInClub}
                onChange={handleChange}
                size="small"
              >
                <FormControlLabel
                  className={classes.MuiTypography}
                  value="Baixa"
                  control={<Radio />}
                  label="Baixa"
                />
                <FormControlLabel
                  value="Normal"
                  control={<Radio />}
                  label="Normal"
                />
                <FormControlLabel
                  value="Prioridade"
                  control={<Radio />}
                  label="Prioridade"
                />
              </RadioGroup>
            </FormControl>

            <InputLabel className="mg-y-2">Contatos</InputLabel>
            {athlete.contacts.map((contact, index, arr) => (
              <CardContact
                contact={contact}
                index={index}
                quantity={arr.length}
                changeContacts={changeContacts}
              />
            ))}
          </>
        )}
        {pageAthlete === 3 && (
          <div>
            <h4>Adicionar fotos do atleta:</h4>
            <h4>Adicionar documentos do atleta:</h4>
          </div>
        )}
      </form>
      <div className="disp-flex just-sp-evenly align-center flex-wrap">
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<PostAddIcon />}
          onClick={handleChangePageAvance}
        >
          {pageAthlete === 1 && "Mais informações"}
          {pageAthlete === 2 && "Fotos e documentos"}
          {pageAthlete === 3 && "Ficha do atleta"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          startIcon={<SaveIcon />}
          onClick={handleSave}
        >
          Salvar
        </Button>
        {athleteId && (
          <Button
            variant="contained"
            className={classes.danger}
            size="small"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Excluir
          </Button>
        )}
        {pageAthlete > 1 ? (
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<ReplyIcon />}
            onClick={handleChangePageRegresse}
          >
            Voltar
          </Button>
        ) : (
          <Link
            to={`/campeonatos/detalhes/${idChampionship}/jogos/${gameId}/athlets`}
            className="text-decore-none"
          >
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<ReplyIcon />}
            >
              Atletas
            </Button>
          </Link>
        )}
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
{!athleteId ? (
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
