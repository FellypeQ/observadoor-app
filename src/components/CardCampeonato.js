import { React } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import RedoIcon from "@material-ui/icons/Redo";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  media: {
    height: 140,
  },
});

function CardCampeonato(props) {
  const classes = useStyles();

  return (
    <Card className="mg-y-2">
      <Link
        className="text-decore-none link"
        to={`/campeonatos/detalhes/${props.idChampionship}`}
      >
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/images/campeonato-brasileiro-pontuacao-campeao-betsul1sl.jpg"
          />
          <CardContent className="disp-flex just-center">
            <Typography gutterBottom variant="h5" component="h2">
              {props.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions className="just-center">
        <Link
          className="text-decore-none"
          to={`/campeonatos/detalhes/${props.idChampionship}/jogos`}
        >
          <Button
            className="mg-0"
            variant="contained"
            size="small"
            color="primary"
            startIcon={<RedoIcon />}
          >
            Jogos
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
export default CardCampeonato;
