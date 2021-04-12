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
      //console.log(respPDF);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card className="mg-y-2">
      <Link className="text-decore-none link" to={props.link}>
        <CardActionArea>
          <CardContent className="disp-flex just-center">
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
          </CardContent>
          <CardActions className="disp-flex align-center just-sp-evenly">
            <Link className="text-decore-none">
              <Button
                className={`${classes.root} ${classes.button}`}
                size="small"
                variant="contained"
                color="primary"
                startIcon={<PictureAsPdfIcon />}
                onClick={(_) => handlePDF(props.athleteId)}
              >
                Gerar PDF
              </Button>
            </Link>
          </CardActions>
        </CardActionArea>
      </Link>
    </Card>
  );
}

export default CardAthlete;
