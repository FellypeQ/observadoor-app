import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import CardCampeonato from "../../components/CardCampeonato";

function Campeonatos(props) {
  const [championships, setChampionships] = useState({
    search: "",
    filterList: [],
    originalList: [],
  });

  useEffect(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE}championships`
      );
      setChampionships({
        ...championships,
        filterList: response.data,
        originalList: response.data,
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;

    const filter = championships.originalList.filter((championship) =>
      championship.name.toLowerCase().includes(value.toLowerCase())
    );
    setChampionships({
      ...championships,
      search: value,
      filterList: filter,
    });
  };

  return (
    <div className="full-screen campeonato">
      <h2>Torneios e competições</h2>
      <section className="disp-flex align-center flex-wrap just-sp-evenly">
        <div className="disp-flex align-center just-sp-between search wid-80">
          <img src="/images/icon-search.png" />
          <input
            type="search"
            placeholder="Pesquisar pelo nome do campeonato"
            value={championships.search}
            onChange={handleSearch}
          />
        </div>
        <input type="date" className="date-championships" />
        <Link to="/campeonatos/novo">
          <button className="btn btn-black">Novo torneio </button>
        </Link>
      </section>
      <CardCampeonato list={championships.filterList} />
    </div>
  );
}

export default Campeonatos;
