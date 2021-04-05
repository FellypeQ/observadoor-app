import { React, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import GroupIcon from "@material-ui/icons/Group";

function Navbar(props) {
  const history = useHistory();
  const nomeObsevador = JSON.parse(localStorage.getItem("loggedInUser"));
  const [drawer, setDrawer] = useState(false);
  const [ids, setIds] = useState({
    championship: "",
    games: "",
    athletes: "",
  });

  useEffect(() => {
    const { championship, game, athlete } = props;

    setIds({ championship: championship, games: game, athletes: athlete });
  }, [props]);

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <AppBar position="fixed">
      <Toolbar className="just-sp-between">
        <Typography>Olá, {nomeObsevador.user.name}</Typography>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={(_) => {
            setDrawer(true);
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer
        color="primary"
        anchor="right"
        open={drawer}
        onClose={(_) => {
          setDrawer(false);
        }}
      >
        <List
          className="text-white"
          onClick={(_) => {
            setDrawer(false);
          }}
          onKeyDown={(_) => {
            setDrawer(false);
          }}
        >
          <ListItem onClick={handleLogout}>
            <ListItemIcon className="text-white">
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"Sair"} />
          </ListItem>
          <Link to="/campeonatos" className="text-decore-none text-white">
            <ListItem>
              <ListItemIcon className="text-white">
                <SportsSoccerIcon />
              </ListItemIcon>
              <ListItemText primary={"Campeonatos"} />
            </ListItem>
          </Link>
          {ids.championship !== "" && ids.championship !== undefined && (
            <Link
              to={`/campeonatos/detalhes/${ids.championship}/jogos`}
              className="text-decore-none text-white"
            >
              <ListItem>
                <ListItemIcon className="text-white">
                  <SportsSoccerIcon />
                </ListItemIcon>
                <ListItemText primary={"Jogos"} />
              </ListItem>
            </Link>
          )}
          {ids.games !== "" && ids.games !== undefined && (
            <Link
              to={`/campeonatos/detalhes/${ids.championship}/jogos/${ids.games}/athlets`}
              className="text-decore-none text-white"
            >
              <ListItem>
                <ListItemIcon className="text-white">
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary={"Atletas"} />
              </ListItem>
            </Link>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
