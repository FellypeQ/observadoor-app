import { React } from "react";
import { Link } from "react-router-dom";

function CardCampeonato(props) {
  return (
    <div className="championship-card">
      {props.list.map((championship, idx) => (
        <Link
          className="link"
          to={`/campeonatos/detalhes/${championship._id}`}
          key={idx}
        >
          <div>img</div>
          <h5>{championship.name}</h5>
        </Link>
      ))}
    </div>
  );
}

export default CardCampeonato;
