import { React, useState } from "react";

import Inputs from "../../components/Inputs";
import Game from "../../components/Game";

function Athletic(props) {
  const nomeObsevador = localStorage.login;
  const [championship, setChampionship] = useState({
    name: "Copa Favela",
  });
  const [game, setGame] = useState({
    gameName: "Jogo 1",
    dateGame: "2019-06-25T12:09",
    category: "Categoria sub-12",
    teamA: "Pau da Lima",
    teamB: "PAFF",
  });

  const [athlete, seAthlete] = useState({
    name: "Jean",
    year: 2005,
    birthDate: "",
    team: "Pau da Lima",
    shirtNumber: 9,
    skillLeg: { left: false, right: true },
  });

  const handleChange = (event) => {
    seAthlete({
      ...athlete,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <Inputs
        type="year"
        className="text-30px wid-90 disp-flex just-center mg-b-2"
        placeholder="Nome do Campeonato "
        name="name"
        value={championship.name}
        onChange={handleChange}
        disabled="disabled"
      />
      <div className="disp-flex just-end mg-b-2">
        <h4>{nomeObsevador}</h4>
      </div>
      <Game
        gameName={game.gameName}
        dateGame={game.dateGame}
        category={game.category}
        teamA={game.teamA}
        teamB={game.teamB}
        disabled={"disabled"}
        noButton={true}
      />
      <form className="disp-flex flex-direct-col">
        <h5>Novo Atleta</h5>
        <Inputs label="Foto atleta" type="file" className="disp-block" />
        <Inputs
          label="Nome: "
          type="text"
          placeholder="Nome"
          name="name"
          value={athlete.name}
          onChange={handleChange}
        />
        <Inputs
          label="Ano: "
          type="number"
          name="year"
          value={athlete.year}
          onChange={handleChange}
        />
        <Inputs
          label="Data de nascimento: "
          type="date"
          name="birthDate"
          value={athlete.birthDate}
          onChange={handleChange}
        />
        <Inputs
          label="Time: "
          type="text"
          name="team"
          value={athlete.team}
          onChange={handleChange}
        />
        <Inputs
          label="Numero da camisa: "
          type="number"
          name="shirtNumber"
          value={athlete.shirtNumber}
          onChange={handleChange}
        />
        <Inputs
          label="Perna de maior habilidade: "
          type="radio"
          name="skillLeg"
          value={athlete.skillLeg}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default Athletic;
