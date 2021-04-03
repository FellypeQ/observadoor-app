import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../autenntication/api";

import {
  CircularProgress,
  TextField,
  InputAdornment,
  Typography,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import Navbar from "../../components/Navbar";
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
      <Navbar stage="championship" />
      <Typography variant="h5">Torneios e competições</Typography>
      <section className="mg-y-2 disp-flex align-center flex-wrap just-sp-evenly">
        <TextField
          label="Pesquisar o campeonato"
          variant="outlined"
          type="search"
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
          label="Data do campeonato"
          InputLabelProps={{ shrink: true }}
          type="date"
          variant="outlined"
          size="small"
          className="wid-50 text-14px"
        />

        <Link className="wid-40 text-decore-none" to="/campeonatos/novo">
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<AddCircleOutlineIcon />}
          >
            Nova competição
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
