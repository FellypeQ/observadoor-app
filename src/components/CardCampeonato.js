import { React } from "react";
import { Link } from "react-router-dom";

function CardCampeonato(props) {
  return (
    <div className="championship-card">
      <Link
        className="link"
        to={`/campeonatos/detalhes/${props.idChampionship}`}
      >
        <div>img</div>
        <h5>{props.name}</h5>
      </Link>
    </div>
  );
}

export default CardCampeonato;
