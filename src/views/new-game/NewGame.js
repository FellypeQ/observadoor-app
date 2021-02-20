import { React, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import ChampionshipInfo from "../../components/ChampionshipInfo";
import Game from "../../components/Game";

function NewGame(props) {
  const nomeObsevador = localStorage.login;
  const [championship, setChampionship] = useState({
    name: "",
    localization: "",
    competionDate: "",
    category: "",
    responsible: "",
    details: "",
  });
  const [game, setGame] = useState({
    gameName: "Jogo 1",
    dateGame: "2019-06-25T12:09",
    category: "Categoria sub-12",
    teamA: "Pau da Lima",
    teamB: "PAFF",
  });
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
        handleChange={handleChange}
        localization={championship.localization}
        competionDate={championship.competionDate}
        category={championship.category}
        responsible={championship.responsible}
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
      <sectionbtnjogo className="mg-t-5 disp-flex flex-wrap align-center just-sp-evenly">
        <button className="btn btn-black text-14px mg-b-5">Salvar</button>
        <Link
          to={`/campeonatos/detalhes/${props.match.params.id}/jogos`}
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
      </sectionbtnjogo>
    </div>
  );
}

export default NewGame;
