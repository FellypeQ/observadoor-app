import { React, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../../autenntication/api";

import { TextField, Fab, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ReplyIcon from "@material-ui/icons/Reply";

import Game from "../../components/Game";
import Navbar from "../../components/Navbar";

function AthleticList(props) {
  const history = useHistory();
  const { id, gameId, athleteId } = props.match.params;
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
    try {
      const respChampionship = await api.get(
        `${process.env.REACT_APP_API_BASE}championship/${idChampionship}`
      );
      setChampionship(respChampionship.data.name);
    } catch (error) {
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
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
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
        <Link
          className="text-decore-none"
          to={`/campeonatos/detalhes/${idChampionship}/jogos/${gameId}/${athlete._id}`}
          key={idx}
        >
          <div className="disp-flex just-sp-evenly mg-x-1 game">
            <div className="disp-flex flex-direct-col align-center">
              <p>Nome do atleta</p>
              <p>{athlete.name}</p>
            </div>
            <div className="disp-flex flex-direct-col align-center">
              <p>Número da camisa</p>
              <p>{athlete.shirtNumber}</p>
            </div>
          </div>
        </Link>
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
