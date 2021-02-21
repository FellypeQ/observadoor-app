import { React, useEffect, useState } from "react";

import Inputs from "../../components/Inputs";
import Game from "../../components/Game";
import axios from "axios";

function Athletic(props) {
  const idChampionship = props.match.params.id;
  const idGame = props.match.params.gameId;
  const nomeObsevador = localStorage.login;
  const [championship, setChampionship] = useState("");
  const [game, setGame] = useState({
    gameName: "",
    dateGame: "",
    category: "",
    teamA: "",
    teamB: "",
  });

  useEffect(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE}championship/${idChampionship}`
      );
      setChampionship(response.data.name);
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE}game/${idGame}`
      );
      setGame({
        gameName: response.data.gameName,
        dateGame: response.data.dateGame.replace("Z", ""),
        category: response.data.category,
        teamA: response.data.teamA,
        teamB: response.data.teamB,
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

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
        value={championship}
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
