import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./App.css";

import { AuthContextComponent } from "./autenntication/authContext";
import PrivateRoute from "./autenntication/PrivateRoute";

import Login from "./views/login/Login";
import Campeonatos from "./views/campeonatos/Campeonatos";
import ChampionshipDetail from "./views/campeonatos/ChampionshipDetail";
import NewGame from "./views/new-game/NewGame";
import Games from "./views/games/Games";
import Athletic from "./views/athletic/Athletic";

function App() {
  const dbchampionship = {
    _id: "aaaaaaaaa",
    name: "Copa Favela",
    localization: "Salvador/BA",
    competionDate: "2019-06-25",
    category: "Sub 10 até Sub 17",
    responsible: "João Carlos",
    details:
      "Evento realizado pelo professor João Carlos há mais de 10 anos. Revelou jogadores como: Davi, Pelé, Zico e companhia... Nível técnico muito bom. Observadores dos principais clubes sempre estão presentes. Tem um garoto 2009 que está chamando atenção e já é monitorado há 2 anos.",
  };
  localStorage.setItem("dbchampionship", JSON.stringify(dbchampionship));

  return (
    <BrowserRouter>
      <AuthContextComponent>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/campeonatos" component={Campeonatos} />
          <PrivateRoute
            exact
            path="/campeonatos/novo"
            component={ChampionshipDetail}
          />
          <Redirect exact from="/campeonatos/detalhes" to="/campeonatos" />
          <PrivateRoute
            exact
            path="/campeonatos/detalhes/:id"
            component={ChampionshipDetail}
          />
          <PrivateRoute
            exact
            path="/campeonatos/detalhes/:id/jogos"
            component={Games}
          />
          <PrivateRoute
            exact
            path="/campeonatos/detalhes/:id/jogos/novo"
            component={NewGame}
          />

          <PrivateRoute
            exact
            path="/campeonatos/detalhes/:id/jogos/:gameId"
            component={NewGame}
          />

          <PrivateRoute
            exact
            path="/campeonatos/detalhes/:id/jogos/:gameId/novo-atleta"
            component={Athletic}
          />
          <PrivateRoute
            exact
            path="/campeonatos/detalhes/:id/jogos/:gameId/:athleteId"
            component={Athletic}
          />
        </Switch>
      </AuthContextComponent>
    </BrowserRouter>
  );
}

export default App;
