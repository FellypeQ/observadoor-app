import { React, useEffect, useState } from "react";

import Inputs from "../../components/Inputs";
import Game from "../../components/Game";
import api from "../../autenntication/api";

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
  const [athlete, seAthlete] = useState({
    idGame: "",
    name: "",
    year: "",
    birthDate: "",
    team: "",
    shirtNumber: "",
    skillLeg: "",
    shortPass: "",
    longPass: "",
    header: "",
    position: "",
    velocity: "",
    reactionPower: "",
    mobility: "",
    finalization: "",
    comentary: "",
    userID: "",
  });

  useEffect(async () => {
    try {
      const response = await api.get(
        `${process.env.REACT_APP_API_BASE}championship/${idChampionship}`
      );
      setChampionship(response.data.name);
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await api.get(
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
        <h5>
          {props.location.pathname.includes("novo")
            ? "Novo Atleta"
            : "Editar Atleta"}
        </h5>
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
          value={athlete.birthDate.split("T")[0]}
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
          format="radio"
          label="Perna de maior habilidade: "
          type="radio"
          name="skillLeg"
          value={athlete.skillLeg}
          onChange={handleChange}
          options={["Esquerda", "Direita"]}
        />
        <h4>Fundamentos</h4>
        <Inputs
          format="radio"
          label="Passe curto: "
          type="radio"
          name="shortPass"
          value={athlete.shortPass}
          onChange={handleChange}
          options={["ruim", "normal", "bom", "acima da média"]}
        />
        <Inputs
          format="radio"
          label="Passe longo: "
          type="radio"
          name="longPass"
          value={athlete.longPass}
          onChange={handleChange}
          options={["ruim", "normal", "bom", "acima da média"]}
        />
        <Inputs
          format="radio"
          label="Cabeceio: "
          type="radio"
          name="header"
          value={athlete.header}
          onChange={handleChange}
          options={["ruim", "normal", "bom", "acima da média"]}
        />
        <Inputs
          format="radio"
          label="Posicionamento: "
          type="radio"
          name="position"
          value={athlete.position}
          onChange={handleChange}
          options={["ruim", "normal", "bom", "acima da média"]}
        />
        <Inputs
          format="radio"
          label="Velocidade: "
          type="radio"
          name="velocity"
          value={athlete.velocity}
          onChange={handleChange}
          options={["ruim", "normal", "bom", "acima da média"]}
        />
        <Inputs
          format="radio"
          label="Poder de reação: "
          type="radio"
          name="reactionPower"
          value={athlete.reactionPower}
          onChange={handleChange}
          options={["ruim", "normal", "bom", "acima da média"]}
        />
        <Inputs
          format="radio"
          label="Mobilidade: "
          type="radio"
          name="mobility"
          value={athlete.mobility}
          onChange={handleChange}
          options={["ruim", "normal", "bom", "acima da média"]}
        />
        <Inputs
          format="radio"
          label="Mobilidade: "
          type="radio"
          name="finalization"
          value={athlete.finalization}
          onChange={handleChange}
          options={["ruim", "normal", "bom", "acima da média"]}
        />
        <Inputs
          format="textarea"
          label="Adicionar comentário: "
          placeholder="Digite seu comentário"
          className=""
          name="comentary"
          value={athlete.comentary}
          onChange={handleChange}
        />
      </form>
      <div className="disp-flex just-sp-evenly align-center flex-wrap">
        <button className="btn btn-green mg-y-2 ">Salvar</button>
        <button className="btn btn-black mg-y-2 ">
          Adicionar mais informações
        </button>
        <button className="btn btn-red mg-y-2 ">Excluir</button>
      </div>
    </div>
  );
}

export default Athletic;
