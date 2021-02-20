import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import CardCampeonato from "../../components/CardCampeonato";

function Campeonatos(props) {
  const [championships, setChampionships] = useState([]);

  useEffect(async () => {
    try {
      const response = await axios.get("http://localhost:1234/championships");
      setChampionships(response.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const [searchText, setSearchText] = useState("");
  const handleSearch = (event) => {
    setSearchText(event.target.value);

    const filter = [...championships].filter((championship) =>
      championship.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setChampionships(filter);
  };

  return (
    <div className="full-screen campeonato">
      <h2>Torneios e competições</h2>
      <section className="disp-flex align-center flex-wrap just-sp-evenly">
        <search className="disp-flex align-center just-sp-between search wid-80">
          <img src="/images/icon-search.png" />
          <input
            type="search"
            placeholder="Pesquisar pelo nome do campeonato"
            value={searchText}
            onChange={handleSearch}
          />
        </search>
        <input type="date" className="date-championships" />
        <Link to="/campeonatos/novo">
          <button className="btn btn-black">Novo torneio </button>
        </Link>
      </section>
      <CardCampeonato list={championships} />
    </div>
  );
}

export default Campeonatos;
