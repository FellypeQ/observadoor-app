import { React, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import ChampionshipInfo from "../../components/ChampionshipInfo";

function ChampionshipDetail(props) {
  const nomeObsevador = localStorage.login;
  const [championship, setChampionship] = useState({
    name: "",
    localization: "",
    competionDate: "",
    category: "",
    responsible: "",
    details: "",
  });
  const history = useHistory();

  useEffect(() => {
    if (props.match.params.id) {
      const tempback = JSON.parse(localStorage.getItem("dbchampionship"));
      setChampionship({
        name: tempback.name,
        localization: tempback.localization,
        competionDate: tempback.competionDate,
        category: tempback.category,
        responsible: tempback.responsible,
        details: tempback.details,
      });
    } else {
      setChampionship({
        name: "",
        localization: "",
        competionDate: "",
        category: "",
        responsible: "",
        details: "",
      });
    }
  }, [props]);

  const handleChange = (event) => {
    setChampionship({
      ...championship,
      [event.target.name]: event.target.value,
    });
  };
  const handleAddGame = (event) => {
    event.preventDefault();
    if (props.match.params.id) {
      history.push(`/campeonatos/detalhes/${props.match.params.id}/jogos/novo`);
    } else {
      history.push("/campeonatos/detalhes/bbbbbbbbb/jogos/novo"); //'bbbbbbbbb' é o _id do retorno de salvar no banco
    }
  };

  return (
    <form className="campeonato ">
      <ChampionshipInfo
        name={championship.name}
        nomeObsevador={nomeObsevador}
        handleChange={handleChange}
        localization={championship.localization}
        competionDate={championship.competionDate}
        category={championship.category}
        responsible={championship.responsible}
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
      {props.match.params.id ? (
        <sectionbtnjogo className="disp-flex just-sp-evenly flex-wrap align-center">
          <button
            className="btn btn-green text-14px mg-b-5"
            onClick={handleAddGame}
          >
            Adicionar Jogo
          </button>
          <Link
            to={`/campeonatos/detalhes/${props.match.params.id}/jogos`}
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
          <button className="btn btn-black text-14px mg-b-5">
            Salvar Edição
          </button>
        </sectionbtnjogo>
      ) : (
        <sectionbtnjogo className="disp-flex flex-wrap align-center just-sp-evenly">
          <button className="btn btn-black text-16px mg-b-5">Salvar</button>
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
        </sectionbtnjogo>
      )}
    </form>
  );
}

export default ChampionshipDetail;
