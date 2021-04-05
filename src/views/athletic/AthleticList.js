import { React, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../../autenntication/api";

import {
  TextField,
  Fab,
  Button,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ReplyIcon from "@material-ui/icons/Reply";

import Game from "../../components/Game";
import Navbar from "../../components/Navbar";
import CardAthlete from "../../components/CardAthlete";

function AthleticList(props) {
  const history = useHistory();
  const { id, gameId, athleteId } = props.match.params;
  const [loading, setLoading] = useState({ athlete: false });

  const idChampionship = id;

  const [championship, setChampionship] = useState("");
  const [game, setGame] = useState({
    gameName: "",
    dateGame: "",
    category: "",
    teamA: "",
    teamB: "",
  });
  const [athleteList, setAthleteList] = useState([]);

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
        `${process.env.REACT_APP_API_BASE}game/${gameId}`
      );
      setGame({
        gameName: respGame.data.gameName,
        dateGame: respGame.data.dateGame,
        category: respGame.data.category,
        teamA: respGame.data.teamA,
        teamB: respGame.data.teamB,
      });

      try {
        const respAthlete = await api.get(
          `${process.env.REACT_APP_API_BASE}athletes/${gameId}`
        );
        setAthleteList(respAthlete.data);
        setLoading({ ...loading, athlete: false });
      } catch (error) {
        setLoading({ ...loading, athlete: false });
        console.error(error);
      }
    } catch (error) {
      setLoading({ ...loading, athlete: false });
      console.error(error);
    }
  }, []);

  const handleLikeAthletic = () => {
    history.push(
      `/campeonatos/detalhes/${idChampionship}/jogos/${gameId}/novo-atleta`
    );
  };

  return (
    <div className="full-screen">
      <Backdrop open={loading.athlete}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Navbar championship={idChampionship} game={gameId} athlete={athleteId} />
      <TextField
        label="Nome do Campeonato"
        type="text"
        InputProps={{
          disableUnderline: true,
          style: {
            fontSize: "1.5rem",
            height: "30px",
          },
        }}
        size="medium"
        value={championship}
        disabled="disabled"
      />
      <Game
        gameName={game.gameName}
        dateGame={game.dateGame}
        category={game.category}
        teamA={game.teamA}
        teamB={game.teamB}
        disabled={"disabled"}
        noButton={true}
        handleLikeAthletic={handleLikeAthletic}
      />
      {athleteList.map((athlete, idx) => (
        <>
          <CardAthlete
            athlete={athlete}
            idx={idx}
            championship={idChampionship}
            game={gameId}
            link={`/campeonatos/detalhes/${idChampionship}/jogos/${gameId}/${athlete._id}`}
          />
        </>
      ))}
      <Link
        to={`/campeonatos/detalhes/${idChampionship}/jogos`}
        className="text-decore-none disp-flex just-center"
      >
        <Button
          className=""
          variant="outlined"
          color="primary"
          size="small"
          startIcon={<ReplyIcon />}
        >
          Voltar
        </Button>
      </Link>
      <Link
        className="wid-40 text-decore-none"
        to={`/campeonatos/detalhes/${idChampionship}/jogos/${gameId}/novo-atleta`}
      >
        <Fab color="primary" aria-label="Adicionar Campeonato" size="small">
          <AddIcon />
        </Fab>
      </Link>
    </div>
  );
}

export default AthleticList;
