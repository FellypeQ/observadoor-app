import { React, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../../autenntication/api";

import {
  CircularProgress,
  Backdrop,
  Button,
  makeStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import ReplyIcon from "@material-ui/icons/Reply";
import ReplyAllIcon from "@material-ui/icons/ReplyAll";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import ChampionshipInfo from "../../components/ChampionshipInfo";
import Game from "../../components/Game";
import Navbar from "../../components/Navbar";

const useStyles = makeStyles({
  root: { margin: "1%" },
  danger: {
    backgroundColor: "#ef9a9a",
    "&:hover": { backgroundColor: "#af4448" },
  },
});

function NewGame(props) {
  const classes = useStyles();

  const idChampionship = props.match.params.id;
  const idGame = props.match.params.gameId;

  const nomeObsevador = localStorage.login;
  const [championship, setChampionship] = useState({
    name: "",
    localization: "",
    competionDate: "",
    category: "",
    responsable: "",
    details: "",
  });
  const [game, setGame] = useState({
    _id: "",
    idChampionship: "",
    gameName: "",
    dateGame: "",
    category: "",
    teamA: "",
    teamB: "",
  });
  const [loading, setLoading] = useState({ game: false });
  const history = useHistory();

  useEffect(async () => {
    setLoading({ ...loading, game: true });
    try {
      const respChampionship = await api.get(
        `${process.env.REACT_APP_API_BASE}championship/${idChampionship}`
      );
      setChampionship({
        name: respChampionship.data.name,
        localization: respChampionship.data.localization,
        competionDate: respChampionship.data.competionDate
          ? respChampionship.data.competionDate.split("T")[0]
          : "",
        category: respChampionship.data.category,
        responsable: respChampionship.data.responsable,
        details: respChampionship.data.details,
      });
      setGame({
        ...game,
        idChampionship: respChampionship.data._id,
      });
    } catch (error) {
      console.error("respChampionship", error);
    }

    if (idGame) {
      try {
        const respGame = await api.get(
          `${process.env.REACT_APP_API_BASE}game/${idGame}`
        );
        setGame({
          _id: respGame.data._id,
          idChampionship: respGame.data.idChampionship,
          gameName: respGame.data.gameName,
          dateGame: respGame.data.dateGame.replace("Z", ""),
          category: respGame.data.category,
          teamA: respGame.data.teamA,
          teamB: respGame.data.teamB,
        });
        setLoading({ ...loading, game: false });
      } catch (error) {
        setLoading({ ...loading, game: false });
        console.error("respGame", error);
      }
    } else {
      setLoading({ ...loading, game: false });
    }
  }, []);

  const handleChange = (event) => {
    setGame({
      ...game,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setLoading({ ...loading, game: true });

    if (idGame) {
      try {
        const response = await api.patch(
          `${process.env.REACT_APP_API_BASE}game/${game._id}`,
          game
        );
        history.push(`/campeonatos/detalhes/${idChampionship}/jogos`);
      } catch (error) {
        console.error(error);
      }
    } else {
      const { _id, ...NewGame } = game;

      const response = await api.post(
        `${process.env.REACT_APP_API_BASE}game`,
        NewGame
      );
      history.push(`/campeonatos/detalhes/${idChampionship}/jogos`);
    }
  };

  const handleLikeAthletic = async (event, id) => {
    event.preventDefault();
    setLoading({ ...loading, game: true });

    if (idGame) {
      try {
        const respUpdateGame = await api.patch(
          `${process.env.REACT_APP_API_BASE}game/${game._id}`,
          game
        );
        history.push(
          `/campeonatos/detalhes/${idChampionship}/jogos/${idGame}/novo-atleta`
        );
      } catch (error) {
        setLoading({ ...loading, game: false });
        console.error("respUpdateGame", error);
      }
    } else {
      const { _id, ...NewGame } = game;

      try {
        const respNewGame = await api.post(
          `${process.env.REACT_APP_API_BASE}game`,
          NewGame
        );
        history.push(
          `/campeonatos/detalhes/${idChampionship}/jogos/${respNewGame.data.result._id}/novo-atleta`
        );
      } catch (error) {
        setLoading({ ...loading, game: false });
        console.error("respNewGame", error);
      }
    }
  };

  const handleOtherGame = async (event) => {
    event.preventDefault();
    setLoading({ ...loading, game: true });

    if (idGame) {
      try {
        const respUpdateGame = await api.patch(
          `${process.env.REACT_APP_API_BASE}game/${game._id}`,
          game
        );
        history.push(`/campeonatos/detalhes/${idChampionship}/jogos/novo`);
        setGame({
          _id: "",
          idChampionship: "",
          gameName: "",
          dateGame: "",
          category: "",
          teamA: "",
          teamB: "",
        });
      } catch (error) {
        setLoading({ ...loading, game: false });
        console.error("respUpadateGame", error);
      }
    } else {
      const { _id, ...NewGame } = game;

      try {
        const respNewGame = await api.post(
          `${process.env.REACT_APP_API_BASE}game`,
          NewGame
        );
        history.push(`/campeonatos/detalhes/${idChampionship}/jogos/novo`);
        setGame({
          _id: "",
          idChampionship: "",
          gameName: "",
          dateGame: "",
          category: "",
          teamA: "",
          teamB: "",
        });
      } catch (error) {
        setLoading({ ...loading, game: false });
        console.error("respNewGame", error);
      }
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    setLoading({ ...loading, game: true });

    try {
      const respDeleteGame = await api.delete(
        `${process.env.REACT_APP_API_BASE}game/${idGame}`
      );
      history.push(`/campeonatos/detalhes/${idChampionship}/jogos`);
    } catch (error) {
      setLoading({ ...loading, game: false });
      console.error("respDeleteGame", error);
    }
  };

  const { id, gameId, athleteId } = props.match.params;

  return (
    <div className="full-screen">
      <Backdrop open={loading.game}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Navbar championship={id} game={gameId} athlete={athleteId} />
      <ChampionshipInfo
        name={championship.name}
        nomeObsevador={nomeObsevador}
        localization={championship.localization}
        competionDate={championship.competionDate}
        category={championship.category}
        responsable={championship.responsable}
        disabled={"disabled"}
      />
      <section>
        <h3 className="mg-b-2">
          {props.location.pathname.includes("novo")
            ? "Novo Jogo"
            : "Editar Jogo"}
        </h3>
        <Game
          gameName={game.gameName}
          dateGame={game.dateGame}
          category={game.category}
          teamA={game.teamA}
          teamB={game.teamB}
          handleChange={handleChange}
          idGame={game._id}
          handleLikeAthletic={handleLikeAthletic}
        />
      </section>
      <section className="mg-t-5 disp-flex flex-wrap align-center just-sp-evenly">
        <Button
          className={classes.root}
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleSave}
          startIcon={<SaveIcon />}
        >
          Salvar
        </Button>
        <Button
          className={classes.root}
          variant="contained"
          size="small"
          onClick={handleOtherGame}
          startIcon={<AddCircleOutlineIcon />}
        >
          Adicionar outro Jogo
        </Button>
        <Link
          to={`/campeonatos/detalhes/${idChampionship}/jogos`}
          className="text-decore-none wid-30"
        >
          <Button
            className={`${classes.root} wid-95`}
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<ReplyIcon />}
          >
            Voltar
          </Button>
        </Link>
        {idGame && (
          <Button
            startIcon={<DeleteIcon />}
            className={`${classes.danger} ${classes.root}`}
            size="small"
            onClick={handleDelete}
          >
            Excluir
          </Button>
        )}
      </section>
    </div>
  );
}

export default NewGame;
