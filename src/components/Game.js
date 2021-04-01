import { React } from "react";
import { Link } from "react-router-dom";

import {
  TextField,
  MenuItem,
  Button,
  Divider,
  Card,
  CardContent,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: { margin: "1%" },
});

function Game(props) {
  const categories = [
    "Categoria Profissional",
    "Categoria sub-23",
    "Categoria sub-22",
    "Categoria sub-21",
    "Categoria sub-20",
    "Categoria sub-19",
    "Categoria sub-18",
    "Categoria sub-17",
    "Categoria sub-16",
    "Categoria sub-15",
    "Categoria sub-14",
    "Categoria sub-13",
    "Categoria sub-12",
    "Categoria sub-11",
    "Categoria sub-10",
  ];
  const classes = useStyles();

  function render(disable) {
    if (disable === "disabled") {
      return (
        <Card>
          <CardContent>
            <TextField
              label="Nome do jogo"
              className="wid-45"
              type="text"
              InputProps={{
                disableUnderline: true,
                style: { fontSize: "1.0rem", height: "17px" },
              }}
              size="small"
              value={props.gameName}
              disabled={props.disabled}
            />
            <TextField
              label="Categoria selecionada"
              className="wid-50"
              InputProps={{
                disableUnderline: true,
                style: { fontSize: "1.0rem", height: "17px" },
              }}
              size="small"
              value={props.category}
              disabled={props.disabled}
            />
            <TextField
              label="Data e hora da jogo"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                disableUnderline: true,
                style: { fontSize: "1.0rem", height: "17px" },
              }}
              size="small"
              value={props.dateGame}
              disabled={props.disabled}
            />
            <section className="disp-flex just-sp-between align-center">
              <TextField
                label="Equipe A"
                type="text"
                InputProps={{
                  disableUnderline: true,
                  style: { fontSize: "1.0rem", height: "17px" },
                }}
                size="small"
                value={props.teamA}
                disabled={props.disabled}
              />
              <p className="mg-x-2">X</p>
              <TextField
                label="Equipe A"
                type="text"
                InputProps={{
                  disableUnderline: true,
                  style: {
                    fontSize: "1.0rem",
                    height: "17px",
                  },
                }}
                size="small"
                value={props.teamB}
                disabled={props.disabled}
              />
            </section>
            {props.edition ? (
              <div className="disp-flex just-center">
                <Button
                  className={classes.root}
                  variant="outlined"
                  size="small"
                  name={props.idGame}
                  onClick={(event) => {
                    props.handleEdition(event, props.idGame);
                  }}
                >
                  Editar a partida
                </Button>
              </div>
            ) : (
              <></>
            )}
            <div className="disp-flex just-sp-evenly align-center">
              {props.noButton ? (
                <></>
              ) : (
                <Button
                  className={classes.root}
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={(event) => {
                    props.handleLikeAthletic(event, props.idGame);
                  }}
                >
                  Gostei do atleta
                </Button>
              )}
              {props.edition ? (
                <Link
                  className="text-decore-none wid-50"
                  to={`/campeonatos/detalhes/${props.idChanpionship}/jogos/${props.idGame}/athlets`}
                >
                  <Button
                    className={`${classes.root} wid-100`}
                    size="small"
                    variant="contained"
                    color="primary"
                  >
                    Atletas marcados
                  </Button>
                </Link>
              ) : (
                <></>
              )}
            </div>
          </CardContent>
        </Card>
      );
    } else {
      return (
        <>
          <Divider />
          <TextField
            label="Nome do jogo"
            type="text"
            InputProps={{ className: "input-smaller" }}
            variant="outlined"
            margin="dense"
            size="small"
            name="gameName"
            value={props.gameName}
            onChange={props.handleChange}
            disabled={props.disabled}
          />
          <TextField
            label="Data e hora da jogo"
            className="wid-65"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            InputProps={{ className: "input-smaller" }}
            variant="outlined"
            margin="dense"
            size="small"
            name="dateGame"
            value={props.dateGame}
            onChange={props.handleChange}
            disabled={props.disabled}
          />
          <TextField
            label="Categoria selecionada"
            className="wid-60"
            select
            InputProps={{ className: "input-smaller" }}
            variant="outlined"
            margin="dense"
            size="small"
            name="category"
            value={props.category}
            onChange={props.handleChange}
            disabled={props.disabled}
          >
            {categories.map((el, idx) => (
              <MenuItem key={idx} value={el}>
                {el}
              </MenuItem>
            ))}
          </TextField>
          <section className="disp-flex just-sp-between align-center">
            <TextField
              label="Equipe A"
              type="text"
              InputProps={{ className: "input-smaller" }}
              variant="outlined"
              margin="dense"
              size="small"
              name="teamA"
              value={props.teamA}
              onChange={props.handleChange}
              disabled={props.disabled}
            />
            <p className="mg-x-2">X</p>
            <TextField
              label="Equipe A"
              type="text"
              InputProps={{ className: "input-smaller" }}
              variant="outlined"
              margin="dense"
              size="small"
              name="teamB"
              value={props.teamB}
              onChange={props.handleChange}
              disabled={props.disabled}
            />
          </section>
          <section className="disp-flex just-center">
            {props.noButton ? (
              <></>
            ) : (
              <Button
                className={classes.root}
                variant="contained"
                color="secondary"
                size="small"
                onClick={(event) => {
                  props.handleLikeAthletic(event, props.idGame);
                }}
              >
                Gostei do atleta
              </Button>
            )}
            {props.edition ? (
              <Link
                className="text-decore-none wid-45"
                to={`/campeonatos/detalhes/${props.idChanpionship}/jogos/${props.idGame}/athlets`}
              >
                <Button
                  className={`${classes.root} wid-50`}
                  size="small"
                  variant="contained"
                  color="primary"
                >
                  Atletas marcados
                </Button>
              </Link>
            ) : (
              <></>
            )}
          </section>
        </>
      );
    }
  }
  return <form className="game">{render(props.disabled)}</form>;
}

export default Game;
