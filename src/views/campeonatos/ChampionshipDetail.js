import { React, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import ChampionshipInfo from "../../components/ChampionshipInfo";

function ChampionshipDetail(props) {
  const userID = "602dbe9df1f9663f20cb33aa";

  const nomeObsevador = JSON.parse(localStorage.getItem("loggedInUser"));
  const [championship, setChampionship] = useState({
    name: "",
    localization: "",
    competionDate: "",
    category: "",
    responsable: "",
    details: "",
    userID: "",
  });
  const history = useHistory();
  const idChampionship = props.match.params.id;

  useEffect(async () => {
    if (idChampionship) {
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
          userID: response.data.userID,
        });
      } catch (err) {
        console.error(err);
      }
    }
  }, [props]);

  const handleChange = (event) => {
    setChampionship({
      ...championship,
      [event.target.name]: event.target.value,
    });
  };
  const handleSaveChampionship = async (event) => {
    event.preventDefault();

    if (idChampionship) {
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_API_BASE}championship/${idChampionship}`,
          championship
        );
        history.push("/campeonatos");
      } catch (err) {
        console.error(err);
      }
    } else {
      const newChampionship = { ...championship, userID: userID };
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE}championship`,
          newChampionship
        );
        history.push("/campeonatos");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAddGame = async (event) => {
    event.preventDefault();

    if (idChampionship) {
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_API_BASE}championship/${idChampionship}`,
          championship
        );
        history.push(`/campeonatos/detalhes/${idChampionship}/jogos/novo`);
      } catch (err) {
        console.error(err);
      }
    } else {
      const newChampionship = { ...championship, userID: userID };
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE}championship`,
          newChampionship
        );
        history.push(
          `/campeonatos/detalhes/${response.data.result._id}/jogos/novo`
        );
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE}championship/${idChampionship}`
      );
      history.push("/campeonatos");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="campeonato ">
      <ChampionshipInfo
        name={championship.name}
        nomeObsevador={nomeObsevador.user.name}
        handleChange={handleChange}
        localization={championship.localization}
        competionDate={championship.competionDate}
        category={championship.category}
        responsable={championship.responsable}
      />
      <label className="wid-100 text-18px">Detalhes da competição</label>
      <textarea
        type="textarea"
        className="wid-100 hei-30 mg-b-5"
        placeholder="Detalhes da competição"
        name="details"
        value={championship.details}
        onChange={handleChange}
      />
      {idChampionship ? (
        <div className="disp-flex just-sp-evenly flex-wrap align-center">
          <button
            className="btn btn-green text-14px mg-b-5"
            onClick={handleAddGame}
          >
            Adicionar Jogo
          </button>
          <Link
            to={`/campeonatos/detalhes/${idChampionship}/jogos`}
            className="btn btn-blue text-14px mg-b-5 text-decore-none"
          >
            Jogos Realizados
          </Link>
          <Link
            to="/campeonatos"
            className="btn btn-red text-14px mg-b-5 text-decore-none"
          >
            Voltar
          </Link>
          <button
            className="btn btn-black text-14px mg-b-5"
            onClick={handleSaveChampionship}
          >
            Salvar Edição
          </button>
          <button
            className="btn btn-red text-14px mg-b-5"
            onClick={handleDelete}
          >
            Excluir campeonato
          </button>
        </div>
      ) : (
        <div className="disp-flex flex-wrap align-center just-sp-evenly">
          <button
            className="btn btn-black text-16px mg-b-5"
            onClick={handleSaveChampionship}
          >
            Salvar
          </button>
          <button
            className="btn btn-green text-14px mg-b-5"
            onClick={handleAddGame}
          >
            Adicionar Jogo
          </button>
          <Link
            to="/campeonatos"
            className="btn btn-red text-16px mg-b-5 text-decore-none"
          >
            Voltar
          </Link>
        </div>
      )}
    </form>
  );
}

export default ChampionshipDetail;
