import { React, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../../autenntication/api";

import { CircularProgress, Backdrop, Button } from "@material-ui/core";

import ChampionshipInfo from "../../components/ChampionshipInfo";
import Game from "../../components/Game";

function Games(props) {
  const idChampionship = props.match.params.id;
  const [loading, setLoading] = useState({ games: false });

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
    setLoading({ ...loading, games: true });
    try {
      const respChampionship = await api.get(
        `${process.env.REACT_APP_API_BASE}championship/${idChampionship}`
      );
      setChampionship({
        id: respChampionship.data._id,
        name: respChampionship.data.name,
        localization: respChampionship.data.localization,
        competionDate: respChampionship.data.competionDate
          ? respChampionship.data.competionDate.split("T")[0]
          : "",
        category: respChampionship.data.category,
        responsable: respChampionship.data.responsable,
        details: respChampionship.data.details,
      });
      const respGame = await api.get(
        `${process.env.REACT_APP_API_BASE}games/${idChampionship}`
      );
      setGames(respGame.data);

      setLoading({ ...loading, games: false });
    } catch (error) {
      setLoading({ ...loading, games: false });
      console.error(error);
    }
  }, [props]);

  const handleEdition = (event, id) => {
    event.preventDefault();
    const idGame = id;

    history.push(`/campeonatos/detalhes/${idChampionship}/jogos/${idGame}`);
  };

  const handleLikeAthletic = (event, id) => {
    event.preventDefault();
    const idGame = id;

    history.push(
      `/campeonatos/detalhes/${idChampionship}/jogos/${idGame}/novo-atleta`
    );
  };

  return (
    <div className="full-screen">
      <Backdrop open={loading.games}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
          className="wid-40 text-decore-none"
        >
          <Button
            className="wid-95"
            variant="contained"
            color="default"
            size="small"
          >
            Novo Jogo
          </Button>
        </Link>
        <Link to={"/campeonatos"} className="text-decore-none">
          <Button variant="outlined" color="primary" size="small">
            Campeonatos
          </Button>
        </Link>
      </section>
    </div>
  );
}

export default Games;
