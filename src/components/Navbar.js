import { React, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link as RouterLink } from "react-router-dom";

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
  Link,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";

function Navbar(props) {
  const history = useHistory();
  const nomeObsevador = JSON.parse(localStorage.getItem("loggedInUser"));
  const [drawer, setDrawer] = useState(false);
  const [disabled, setDisabled] = useState({ games: true, athletes: true });

  useEffect(() => {
    const stage = props.stage;
    if (stage === "championship") {
      setDisabled({ games: true, athletes: true });
    }
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
          <Link>
            <RouterLink
              to="/campeonatos"
              className="text-decore-none text-white"
            >
              <ListItem>
                <ListItemIcon className="text-white">
                  <SportsSoccerIcon />
                </ListItemIcon>
                <ListItemText primary={"Campeonatos"} />
              </ListItem>
            </RouterLink>
          </Link>
        </List>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
