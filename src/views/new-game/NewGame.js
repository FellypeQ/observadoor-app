import { React, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import api from "../../autenntication/api";

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
    _id: "",
    idChampionship: "",
    gameName: "",
    dateGame: "",
    category: "",
    teamA: "",
    teamB: "",
  });
  const history = useHistory();

  useEffect(async () => {
    try {
      const response = await api.get(
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
        const response = await api.get(
          `${process.env.REACT_APP_API_BASE}game/${idGame}`
        );
        setGame({
          _id: response.data._id,
          idChampionship: response.data.idChampionship,
          gameName: response.data.gameName,
          dateGame: response.data.dateGame.replace("Z", ""),
          category: response.data.category,
          teamA: response.data.teamA,
          teamB: response.data.teamB,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const handleChange = (event) => {
    setGame({
      ...game,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (idGame) {
      try {
        const response = await api.patch(
          `${process.env.REACT_APP_API_BASE}game/${game._id}`,
          game
        );
        history.push(`/campeonatos/detalhes/${idChampionship}/jogos`);
      } catch (error) {
        console.error(error);
      }
    } else {
      const { _id, ...NewGame } = game;

      const response = await api.post(
        `${process.env.REACT_APP_API_BASE}game`,
        NewGame
      );
      history.push(`/campeonatos/detalhes/${idChampionship}/jogos`);
    }
  };

  const handleLikeAthletic = async (event) => {
    event.preventDefault();

    if (idGame) {
      try {
        const response = await api.patch(
          `${process.env.REACT_APP_API_BASE}game/${game._id}`,
          game
        );
        history.push(
          `/campeonatos/detalhes/${idChampionship}/jogos/${idGame}/novo-atleta`
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      const { _id, ...NewGame } = game;

      const response = await api.post(
        `${process.env.REACT_APP_API_BASE}game`,
        NewGame
      );
      history.push(
        `/campeonatos/detalhes/${idChampionship}/jogos/${response.data.result._id}/novo-atleta`
      );
    }
  };

  const handleOtherAthletic = async (event) => {
    event.preventDefault();

    if (idGame) {
      try {
        const response = await api.patch(
          `${process.env.REACT_APP_API_BASE}game/${game._id}`,
          game
        );
        history.push(`/campeonatos/detalhes/${idChampionship}/jogos/novo`);
        setGame({
          _id: "",
          idChampionship: "",
          gameName: "",
          dateGame: "",
          category: "",
          teamA: "",
          teamB: "",
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      const { _id, ...NewGame } = game;

      const response = await api.post(
        `${process.env.REACT_APP_API_BASE}game`,
        NewGame
      );
      history.push(`/campeonatos/detalhes/${idChampionship}/jogos/novo`);
      setGame({
        _id: "",
        idChampionship: "",
        gameName: "",
        dateGame: "",
        category: "",
        teamA: "",
        teamB: "",
      });
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      const response = await api.delete(
        `${process.env.REACT_APP_API_BASE}game/${idGame}`
      );
      history.push(`/campeonatos/detalhes/${idChampionship}/jogos`);
    } catch (error) {
      console.error(error);
    }
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
        <h3 className="mg-b-2">
          {props.location.pathname.includes("novo")
            ? "Novo Jogo"
            : "Editar Jogo"}
        </h3>
        <Game
          gameName={game.gameName}
          dateGame={game.dateGame}
          category={game.category}
          teamA={game.teamA}
          teamB={game.teamB}
          handleChange={handleChange}
          idGame={game._id}
          handleLikeAthletic={handleLikeAthletic}
        />
      </section>
      <section className="mg-t-5 disp-flex flex-wrap align-center just-sp-evenly">
        <button className="btn btn-black text-14px mg-b-5" onClick={handleSave}>
          Salvar
        </button>
        <Link
          to={`/campeonatos/detalhes/${idChampionship}/jogos`}
          className="btn btn-blue text-14px mg-b-5 text-decore-none"
        >
          Jogos Realizados
        </Link>
        <button
          className="btn btn-green text-14px mg-b-5"
          onClick={handleOtherAthletic}
        >
          Adicionar outro Jogo
        </button>
        <Link
          to={"/campeonatos"}
          className="btn btn-red text-14px mg-b-5 text-decore-none"
        >
          Cancelar
        </Link>
        <button className="btn btn-red text-14px mg-b-5" onClick={handleDelete}>
          Excluir jogo
        </button>
      </section>
    </div>
  );
}

export default NewGame;
