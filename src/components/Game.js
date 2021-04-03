import { React } from "react";
import { Link } from "react-router-dom";

import {
  TextField,
  MenuItem,
  Button,
  Divider,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  makeStyles,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import RedoIcon from "@material-ui/icons/Redo";

const useStyles = makeStyles({
  root: {
    margin: "1% auto",
  },
  button: {
    height: "24px",
    width: "110px",
    fontSize: "8px",
  },
  text: {
    fontSize: "8px",
  },
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

  function transformDate(date) {
    if (date === "") {
      console.log(date);
      return;
    }
    const dateTime = date.split("T");

    const date2 = dateTime[0].split("-");
    const time2 = dateTime[1].split(":");

    return `${date2[2]}/${date2[1]} ${time2[0]}:${time2[1]}`;
  }

  function render(disable) {
    if (disable === "disabled") {
      return (
        <Card>
          <CardActionArea
            onClick={(event) => {
              if (props.idGame) {
                props.handleEdition(event, props.idGame);
              }
            }}
          >
            <CardContent>
              <TextField
                label="Nome"
                className="input-game-card wid-25"
                type="text"
                InputProps={{
                  disableUnderline: true,
                  style: {
                    fontSize: "1rem",
                    paddingBottom: "1px",
                    height: "17px",
                  },
                }}
                size="small"
                value={props.gameName}
                disabled={props.disabled}
              />
              <TextField
                label="Categoria"
                className="input-game-card wid-40"
                InputProps={{
                  disableUnderline: true,
                  style: { fontSize: "1.0rem", height: "17px" },
                }}
                size="small"
                value={props.category}
                disabled={props.disabled}
              />
              <TextField
                label="Data e hora"
                className="input-game-card wid-25"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  disableUnderline: true,
                  style: { fontSize: "1.0rem", height: "17px" },
                }}
                size="small"
                value={transformDate(props.dateGame)}
                disabled={props.disabled}
              />
              <section className="disp-flex just-sp-between align-center">
                <TextField
                  label="Equipe A"
                  className="input-game-card input-center"
                  type="text"
                  InputProps={{
                    disableUnderline: true,
                    style: { fontSize: "1.0rem", height: "17px" },
                  }}
                  size="small"
                  value={props.teamA}
                  disabled={props.disabled}
                />
                X
                <TextField
                  label="Equipe B"
                  className="input-game-card input-center"
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
            </CardContent>
          </CardActionArea>
          <CardActions className="disp-flex align-center just-sp-evenly">
            {props.noButton ? (
              <></>
            ) : (
              <Button
                className={`${classes.root} ${classes.button} wid-45`}
                variant="contained"
                color="secondary"
                size="small"
                onClick={(event) => {
                  props.handleLikeAthletic(event, props.idGame);
                }}
                startIcon={<SendIcon />}
              >
                Novo Atleta
              </Button>
            )}
            {props.edition ? (
              <Link
                className="text-decore-none wid-45"
                to={`/campeonatos/detalhes/${props.idChanpionship}/jogos/${props.idGame}/athlets`}
              >
                <Button
                  className={`${classes.root} ${classes.button} wid-100`}
                  size="small"
                  variant="contained"
                  color="primary"
                  startIcon={<RedoIcon />}
                >
                  Atletas
                </Button>
              </Link>
            ) : (
              <></>
            )}
          </CardActions>
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
              label="Equipe B"
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
                startIcon={<SendIcon />}
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
