import axios from "axios";
import { React, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import ChampionshipInfo from "../../components/ChampionshipInfo";
import Game from "../../components/Game";

function NewGame(props) {
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
    idChampionship: "",
    gameName: "",
    dateGame: "", //"2019-06-25T12:09",
    category: "",
    teamA: "",
    teamB: "",
  });
  const history = useHistory();

  useEffect(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE}championship/${idChampionship}`
      );
      setChampionship({
        name: response.data.name,
        localization: response.data.localization,
        competionDate: response.data.competionDate
          ? response.data.competionDate.split("T")[0]
          : "",
        category: response.data.category,
        responsable: response.data.responsable,
        details: response.data.details,
      });
      setGame({
        ...game,
        idChampionship: response.data._id,
      });
    } catch (error) {
      console.error(error);
    }
    if (idGame) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE}game/${idGame}`
        );
        setGame({
          idChampionship: response.data.idChampionship,
          gameName: response.data.gameName,
          dateGame: response.data.dateGame,
          category: response.data.category,
          teamA: response.data.teamA,
          teamB: response.data.teamB,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [props]);

  const handleChange = (event) => {
    setGame({
      ...game,
      [event.target.name]: event.target.value,
    });
  };

  const handleLikeAthletic = (event) => {
    event.preventDefault();
    history.push("/campeonatos/detalhes/aaaaaaaaa/jogos/sssssssss/novo-atleta");
  };

  return (
    <div className="campeonato ">
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
        <h3 className="mg-b-2">Novo Jogo</h3>
        <Game
          gameName={game.gameName}
          dateGame={game.dateGame}
          category={game.category}
          teamA={game.teamA}
          teamB={game.teamB}
          handleChange={handleChange}
          handleLikeAthletic={handleLikeAthletic}
        />
      </section>
      <section className="mg-t-5 disp-flex flex-wrap align-center just-sp-evenly">
        <button className="btn btn-black text-14px mg-b-5">Salvar</button>
        <Link
          to={`/campeonatos/detalhes/${idChampionship}/jogos`}
          className="btn btn-blue text-14px mg-b-5 text-decore-none"
        >
          Jogos Realizados
        </Link>
        <button className="btn btn-green text-14px mg-b-5">
          Adicionar outro Jogo
        </button>
        <Link
          to={"/campeonatos"}
          className="btn btn-red text-14px mg-b-5 text-decore-none"
        >
          Cancelar
        </Link>
      </section>
    </div>
  );
}

export default NewGame;
