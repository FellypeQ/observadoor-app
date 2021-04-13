import { React } from "react";
import { Link } from "react-router-dom";

import api from "../autenntication/api";

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  makeStyles,
} from "@material-ui/core";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";

const useStyles = makeStyles({
  root: {
    margin: "1% auto",
  },
  button: {
    height: "24px",
    width: "110px",
    fontSize: "8px",
  },
});

function CardAthlete(props) {
  const classes = useStyles();

  async function handlePDF(id) {
    try {
      const respPDF = await api.get(
        `${process.env.REACT_APP_API_BASE}generate-pdf/${id}`
      );
      window.open(`${process.env.REACT_APP_API_BASE}generate-pdf/${id}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card className="mg-y-2">
      <CardActionArea>
        <CardContent>
          <Link
            className="text-decore-none link disp-flex just-center"
            to={props.link}
          >
            <TextField
              label="Nome do atleta"
              className="input-game-card wid-40"
              InputProps={{
                disableUnderline: true,
                style: { fontSize: "1.0rem", height: "17px" },
              }}
              size="small"
              value={props.athlete.name}
              disabled
            />
            <TextField
              label="Número da camisa"
              className="input-game-card wid-40"
              InputProps={{
                disableUnderline: true,
                style: { fontSize: "1.0rem", height: "17px" },
              }}
              size="small"
              value={props.athlete.shirtNumber}
              disabled
            />
          </Link>
        </CardContent>
        <CardActions className="disp-flex align-center just-sp-evenly">
          <a className="text-decore-none" download>
            <Button
              className={`${classes.root} ${classes.button}`}
              size="small"
              variant="contained"
              color="primary"
              startIcon={<PictureAsPdfIcon />}
              onClick={(_) => handlePDF(props.athleteId)}
              download
            >
              Gerar PDF
            </Button>
          </a>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

export default CardAthlete;
