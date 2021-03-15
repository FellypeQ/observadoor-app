import { React, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../../autenntication/api";

import ChampionshipInfo from "../../components/ChampionshipInfo";
import Game from "../../components/Game";

function Games(props) {
  const idChampionship = props.match.params.id;

  const nomeObsevador = JSON.parse(localStorage.getItem("loggedInUser"));
  const [championship, setChampionship] = useState({
    id: "",
    name: "",
    localization: "",
    competionDate: "",
    category: "",
    responsable: "",
    details: "",
  });
  const [games, setGames] = useState([]);
  const history = useHistory();

  useEffect(async () => {
    try {
      const response = await api.get(
        `${process.env.REACT_APP_API_BASE}championship/${idChampionship}`
      );
      setChampionship({
        id: response.data._id,
        name: response.data.name,
        localization: response.data.localization,
        competionDate: response.data.competionDate
          ? response.data.competionDate.split("T")[0]
          : "",
        category: response.data.category,
        responsable: response.data.responsable,
        details: response.data.details,
      });
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await api.get(
        `${process.env.REACT_APP_API_BASE}games/${idChampionship}`
      );
      setGames(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [props]);

  const handleEdition = (event) => {
    event.preventDefault();
    const idGame = event.target.name;

    history.push(`/campeonatos/detalhes/${idChampionship}/jogos/${idGame}`);
  };

  const handleLikeAthletic = (event) => {
    event.preventDefault();
    const idGame = event.target.name;

    history.push(
      `/campeonatos/detalhes/${idChampionship}/jogos/${idGame}/novo-atleta`
    );
  };

  return (
    <div>
      <ChampionshipInfo
        name={championship.name}
        nomeObsevador={nomeObsevador.user.name}
        localization={championship.localization}
        competionDate={championship.competionDate}
        category={championship.category}
        responsable={championship.responsable}
        disabled={"disabled"}
      />
      <section>
        <h3 className="mg-b-2">Jogos Realizados</h3>
        {games.map((game, idx) => (
          <Game
            key={idx}
            gameName={game.gameName}
            dateGame={game.dateGame ? game.dateGame.replace("Z", "") : ""}
            category={game.category}
            teamA={game.teamA}
            teamB={game.teamB}
            disabled={"disabled"}
            handleLikeAthletic={handleLikeAthletic}
            edition={true}
            idGame={game._id}
            idChanpionship={championship.id}
            handleEdition={handleEdition}
          />
        ))}
      </section>
      <section className="mg-t-5 disp-flex flex-wrap align-center just-sp-evenly">
        <Link
          to={`/campeonatos/detalhes/${idChampionship}/jogos/novo`}
          className="btn btn-green text-14px mg-b-5 text-decore-none"
        >
          Adicionar outro Jogo
        </Link>
        <Link
          to={"/campeonatos"}
          className="btn btn-red text-14px mg-b-5 text-decore-none"
        >
          Voltar para Campeonatos
        </Link>
      </section>
    </div>
  );
}

export default Games;
