import { React, useState } from "react";
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
  CircularProgress,
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
  buttonError: {
    border: "#c63f17 1px solid",
    backgroundColor: "#ff7043",
  },
  buttonProgress: {
    color: "green",
    position: "absolute",
    top: "50%",
    left: "45%",
    marginTop: -12,
    marginLeft: -12,
  },
});

function CardAthlete(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState({ pdf: false });
  const [error, setError] = useState({ pdf: false });

  async function handlePDF(id) {
    setLoading({ ...loading, pdf: true });
    try {
      const respPDF = await api.get(
        `${process.env.REACT_APP_API_BASE}generate-pdf/${id}`,
        { responseType: "blob" }
      );

      const blob = new Blob([respPDF.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL);

      setLoading({ ...loading, pdf: false });
      setError({ ...error, pdf: false });
    } catch (error) {
      setLoading({ ...loading, pdf: false });
      setError({ ...error, pdf: true });
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
        <CardActions className="disp-flex align-center just-sp-evenly pos-relative">
          <Button
            className={`${classes.root} ${classes.button} ${
              error.pdf && classes.buttonError
            }`}
            size="small"
            variant="contained"
            color="primary"
            startIcon={<PictureAsPdfIcon />}
            onClick={(_) => handlePDF(props.athleteId)}
            download
            disabled={loading.pdf}
          >
            Gerar PDF
          </Button>
          {loading.pdf && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

export default CardAthlete;
