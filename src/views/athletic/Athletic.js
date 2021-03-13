import { React, useEffect, useState } from "react";

import Inputs from "../../components/Inputs";
import Game from "../../components/Game";
import api from "../../autenntication/api";

function Athletic(props) {
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
  const [athlete, seAthlete] = useState({
    idGame: idGame,
    idChampionship: idChampionship,
    pictture: "",
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
    contacts: [
      {
        name: "",
        phone: "",
        responsable: "",
      },
    ],
    avaliationStatus: "",
    avaliationInClub: "",
    competitionEvaluators: "",
    morePhotos: [],
    documentPhotos: [],
    userID: "",
  });
  const [pageAthlete, setPageAthlete] = useState(1);

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
  const handleChangePageAvance = () => {
    if (pageAthlete === 3) {
      return;
    }
    let newPage = pageAthlete;
    setPageAthlete(newPage + 1);
  };
  const handleChangePageRegresse = () => {
    if (pageAthlete === 1) {
      return;
    }
    let newPage = pageAthlete;
    setPageAthlete(newPage - 1);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    console.log(athlete);
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
        <h4>{nomeObsevador.user.name}</h4>
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
        <img alt="picture" src={athlete.pictture} />
        <Inputs
          label="Foto atleta"
          type="file"
          className="disp-block"
          name="picture"
          onChange={handleChange}
        />
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
          placeholder="Ano de nascimento"
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
          placeholder="Equipe do atleta"
          format="select"
          name="team"
          value={athlete.team}
          onChange={handleChange}
          options={["Selecione o time", game.teamA, game.teamB]}
        />
        <Inputs
          label="Numero da camisa: "
          placeholder="Numero da camisa"
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
        {pageAthlete === 1 && (
          <div className="fundations">
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
          </div>
        )}
        {pageAthlete === 2 && (
          <div>
            <h4>Contatos</h4>
            <Inputs
              label="Nome: "
              placeholder="Nome do contato"
              type="text"
              name="name"
              value={""}
              onChange={handleChange}
            />
            <Inputs
              label="Telefone: "
              placeholder="Telefone do contato"
              type="text"
              name="name"
              value={""}
              onChange={handleChange}
            />
            <Inputs
              format="select"
              label="Responsável: "
              name="name"
              value={""}
              options={[
                "Selecione o responsárvel",
                "Pai",
                "Mãe",
                "Empresário",
                "Tio(a)",
                "Irmão",
                "Irmã",
                "Amigo(a)",
                "Outro",
              ]}
              onChange={handleChange}
            />
            <h5>Status da avaliação:</h5>
            <Inputs
              format="radio"
              type="radio"
              name="avaliationStatus"
              value={athlete.avaliationStatus}
              onChange={handleChange}
              options={["Aprovado", "Observar", "Aprovado direto"]}
            />
            <h5>Agendar avaliação no clube:</h5>
            <Inputs
              format="radio"
              type="radio"
              name="avaliationInClub"
              value={athlete.avaliationInClub}
              onChange={handleChange}
              options={["Prioridade", "Normal"]}
            />
            <h5>Concorrência de avaliadores:</h5>
            <Inputs
              format="radio"
              type="radio"
              name="competitionEvaluators"
              value={athlete.competitionEvaluators}
              onChange={handleChange}
              options={["Alta", "Normal", "Baixa"]}
            />
          </div>
        )}
        {pageAthlete === 3 && (
          <div>
            <h4>Adicionar fotos do atleta:</h4>
            <h4>Adicionar documentos do atleta:</h4>
          </div>
        )}
      </form>
      <div className="disp-flex just-sp-evenly align-center flex-wrap">
        {pageAthlete > 1 && (
          <button
            className="btn btn-blue mg-y-2 "
            onClick={handleChangePageRegresse}
          >
            Voltar
          </button>
        )}
        <button
          className="btn btn-black mg-y-2 "
          onClick={handleChangePageAvance}
        >
          {pageAthlete === 1 && "Adicionar mais informações"}
          {pageAthlete === 2 && "Adicionar fotos e documentos"}
          {pageAthlete === 3 && "Ver ficha do atleta"}
        </button>
        <button className="btn btn-green mg-y-2 " onClick={handleSave}>
          Salvar
        </button>
        <button className="btn btn-red mg-y-2 ">Excluir</button>
      </div>
    </div>
  );
}

export default Athletic;
