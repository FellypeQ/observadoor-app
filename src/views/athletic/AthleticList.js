import { React, useEffect, useState } from "react";

import Inputs from "../../components/Inputs";
import Game from "../../components/Game";
import api from "../../autenntication/api";
import { Link, useHistory } from "react-router-dom";

function AthleticList(props) {
  const history = useHistory();
  const idChampionship = props.match.params.id;
  const idGame = props.match.params.gameId;
  const nomeObsevador = JSON.parse(localStorage.getItem("loggedInUser"));
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
        `${process.env.REACT_APP_API_BASE}game/${idGame}`
      );
      setGame({
        gameName: respGame.data.gameName,
        dateGame: respGame.data.dateGame.replace("Z", ""),
        category: respGame.data.category,
        teamA: respGame.data.teamA,
        teamB: respGame.data.teamB,
      });

      try {
        const respAthlete = await api.get(
          `${process.env.REACT_APP_API_BASE}athletes/${idGame}`
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
      `/campeonatos/detalhes/${idChampionship}/jogos/${idGame}/novo-atleta`
    );
  };

  return (
    <div>
      <Inputs
        type="year"
        className="text-30px wid-90 disp-flex just-center mg-b-2"
        placeholder="Nome do Campeonato "
        name="name"
        value={championship}
        disabled="disabled"
      />
      <div className="disp-flex just-end mg-b-2">
        <h4>{nomeObsevador.user.name}</h4>
      </div>
      <Game
        gameName={game.gameName}
        dateGame={game.dateGame}
        category={game.category}
        teamA={game.teamA}
        teamB={game.teamB}
        disabled={"disabled"}
        noButton={false}
        handleLikeAthletic={handleLikeAthletic}
      />
      {athleteList.map((athlete, idx) => (
        <Link
          className="text-decore-none"
          to={`/campeonatos/detalhes/${idChampionship}/jogos/${idGame}/${athlete._id}`}
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
        className="text-decore-none"
      >
        <button className="btn btn-blue mg-y-2 wid-100">
          Voltar para jogos
        </button>
      </Link>
    </div>
  );
}

export default AthleticList;
