import { React, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import ChampionshipInfo from "../../components/ChampionshipInfo";
import Game from "../../components/Game";

function Games(props) {
  console.log(props);
  const nomeObsevador = localStorage.login;
  const [championship, setChampionship] = useState({
    name: "",
    localization: "",
    competionDate: "",
    category: "",
    responsible: "",
    details: "",
  });
  const [games, setGames] = useState([
    {
      gameName: "Jogo 1",
      dateGame: "2019-06-25T10:00",
      category: "Categoria sub-12",
      teamA: "Pau da Lima",
      teamB: "PAFF",
    },
    {
      gameName: "Jogo 3",
      dateGame: "2019-08-13T12:09",
      category: "Categoria sub-15",
      teamA: "Clemente",
      teamB: "Bahia",
    },
    {
      gameName: "Jogo 1",
      dateGame: "2019-09-05T16:00",
      category: "Categoria sub-12",
      teamA: "Porto",
      teamB: "Vitória",
    },
  ]);
  const history = useHistory();

  useEffect(() => {
    const tempback = JSON.parse(localStorage.getItem("dbchampionship"));
    setChampionship({
      name: tempback.name,
      localization: tempback.localization,
      competionDate: tempback.competionDate,
      category: tempback.category,
      responsible: tempback.responsible,
      details: tempback.details,
    });
  }, [props]);

  const handleChange = (event) => {
    setChampionship({
      ...championship,
      [event.target.name]: event.target.value,
    });
  };

  const handleLikeAthletic = (event) => {
    event.preventDefault();
    history.push("/campeonatos/detalhes/aaaaaaaaa/jogos/sssssssss/novo-atleta");
  };

  return (
    <div>
      <ChampionshipInfo
        name={championship.name}
        nomeObsevador={nomeObsevador}
        handleChange={handleChange}
        localization={championship.localization}
        competionDate={championship.competionDate}
        category={championship.category}
        responsible={championship.responsible}
        disabled={"disabled"}
      />
      <section>
        <h3 className="mg-b-2">Novo Jogo</h3>
        {games.map((game, idx) => (
          <Game
            key={idx}
            gameName={game.gameName}
            dateGame={game.dateGame}
            category={game.category}
            teamA={game.teamA}
            teamB={game.teamB}
            handleChange={handleChange}
            disabled={"disabled"}
            handleLikeAthletic={handleLikeAthletic}
          />
        ))}
      </section>
      <sectionbtnjogo className="mg-t-5 disp-flex flex-wrap align-center just-sp-evenly">
        <Link
          to={`/campeonatos/detalhes/${props.match.params.id}/jogos/novo`}
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
      </sectionbtnjogo>
    </div>
  );
}

export default Games;
