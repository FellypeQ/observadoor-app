import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../autenntication/api";

import {
  CircularProgress,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import CardCampeonato from "../../components/CardCampeonato";

function Campeonatos(props) {
  const [championships, setChampionships] = useState({
    search: "",
    filterList: [],
    originalList: [],
  });
  const [loading, setLoading] = useState({ championshipList: false });

  useEffect(async () => {
    setLoading({ ...loading, championshipList: true });
    try {
      const response = await api.get(
        `${process.env.REACT_APP_API_BASE}championships`
      );
      setChampionships({
        ...championships,
        filterList: response.data,
        originalList: response.data,
      });
      setLoading({ ...loading, championshipList: false });
    } catch (err) {
      setLoading({ ...loading, championshipList: false });
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
        <TextField
          variant="outlined"
          type="search"
          label="Pesquisar o campeonato"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          className="wid-90"
          value={championships.search}
          onChange={handleSearch}
        />
        <TextField
          type="date"
          variant="outlined"
          size="small"
          className="wid-50 text-14px"
        />

        <Link className="text-decore-none" to="/campeonatos/novo">
          <Button
            variant="contained"
            size="small"
            color="primary"
            className="text-14px"
          >
            Novo torneio
          </Button>
        </Link>
      </section>

      {loading.championshipList ? (
        <div className="disp-flex just-center ">
          <CircularProgress size={80} />
        </div>
      ) : (
        <>
          {championships.filterList.map((championship, idx) => (
            <CardCampeonato
              key={idx}
              idChampionship={championship._id}
              name={championship.name}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default Campeonatos;
