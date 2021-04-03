import { React, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../../autenntication/api";

import {
  CircularProgress,
  TextField,
  Button,
  Backdrop,
  makeStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import ReplyIcon from "@material-ui/icons/Reply";
import SendIcon from "@material-ui/icons/Send";
import RedoIcon from "@material-ui/icons/Redo";

import ChampionshipInfo from "../../components/ChampionshipInfo";
import Navbar from "../../components/Navbar";

const useStyles = makeStyles({
  root: { margin: "1%" },
  danger: {
    backgroundColor: "#ef9a9a",
    "&:hover": { backgroundColor: "#af4448" },
  },
});

function ChampionshipDetail(props) {
  const classes = useStyles();

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
  const [loading, setLoading] = useState({ championship: false });

  useEffect(async () => {
    if (idChampionship) {
      setLoading({ ...loading, championship: true });
      try {
        const response = await api.get(
          `${process.env.REACT_APP_API_BASE}championship/${idChampionship}`
        );
        setChampionship({
          name: response.data.name,
          localization: response.data.localization,
          competionDate: response.data?.competionDate.split("T")[0],
          category: response.data.category,
          responsable: response.data.responsable,
          details: response.data.details,
          userID: response.data.userID,
        });
        setLoading({ ...loading, championship: false });
      } catch (err) {
        setLoading({ ...loading, championship: false });
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
        const response = await api.patch(
          `${process.env.REACT_APP_API_BASE}championship/${idChampionship}`,
          championship
        );
        history.push("/campeonatos");
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const response = await api.post(
          `${process.env.REACT_APP_API_BASE}championship`,
          championship
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
        const response = await api.patch(
          `${process.env.REACT_APP_API_BASE}championship/${idChampionship}`,
          championship
        );
        history.push(`/campeonatos/detalhes/${idChampionship}/jogos/novo`);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const response = await api.post(
          `${process.env.REACT_APP_API_BASE}championship`,
          championship
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
      const response = await api.delete(
        `${process.env.REACT_APP_API_BASE}championship/${idChampionship}`
      );
      history.push("/campeonatos");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="full-screen">
      <Backdrop open={loading.championship}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Navbar />
      <ChampionshipInfo
        name={championship.name}
        nomeObsevador={nomeObsevador.user.name}
        handleChange={handleChange}
        localization={championship.localization}
        competionDate={championship.competionDate}
        category={championship.category}
        responsable={championship.responsable}
        loading={loading.championship}
      />
      <TextField
        className="wid-100"
        variant="outlined"
        label="Detalhes da competição"
        multiline
        rows={5}
        margin="dense"
        name="details"
        value={championship.details}
        onChange={handleChange}
      />

      {idChampionship ? (
        <>
          <div className="disp-flex just-sp-evenly flex-wrap align-center">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSaveChampionship}
              size="small"
              startIcon={<SaveIcon />}
            >
              Salvar
            </Button>
            <Button
              variant="contained"
              color="default"
              onClick={handleAddGame}
              size="small"
              startIcon={<SendIcon />}
            >
              Adicionar Jogo
            </Button>
            <Link
              to={`/campeonatos/detalhes/${idChampionship}/jogos`}
              className="text-decore-none"
            >
              <Button
                className="wid-100"
                variant="contained"
                color="primary"
                size="small"
                startIcon={<RedoIcon />}
              >
                Jogos Realizados
              </Button>
            </Link>
          </div>
          <div className="disp-flex just-center">
            <Button
              variant="contained"
              color="secondary"
              className={classes.danger}
              size="small"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              Excluir
            </Button>
          </div>
        </>
      ) : (
        <div className="disp-flex flex-wrap align-center just-sp-evenly">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSaveChampionship}
            size="small"
            startIcon={<SaveIcon />}
          >
            Salvar
          </Button>
          <Button
            variant="contained"
            color="default"
            onClick={handleAddGame}
            size="small"
            startIcon={<SendIcon />}
          >
            Adicionar Jogo
          </Button>
        </div>
      )}
    </form>
  );
}

export default ChampionshipDetail;
