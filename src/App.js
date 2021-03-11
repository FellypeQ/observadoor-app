import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./App.css";

import Login from "./views/login/Login";
import Campeonatos from "./views/campeonatos/Campeonatos";
import ChampionshipDetail from "./views/campeonatos/ChampionshipDetail";
import NewGame from "./views/new-game/NewGame";
import Games from "./views/games/Games";
import Athletic from "./views/athletic/Athletic";
import Register from "./views/register/index"

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
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/campeonatos" component={Campeonatos} />
        <Route exact path="/campeonatos/novo" component={ChampionshipDetail} />
        <Route exact path="/register" component={Register} />
        <Redirect exact from="/campeonatos/detalhes" to="/campeonatos" />
        <Route
          exact
          path="/campeonatos/detalhes/:id"
          component={ChampionshipDetail}
        />
        <Route exact path="/campeonatos/detalhes/:id/jogos" component={Games} />
        <Route
          exact
          path="/campeonatos/detalhes/:id/jogos/novo"
          component={NewGame}
        />

        <Route
          exact
          path="/campeonatos/detalhes/:id/jogos/:gameId"
          component={NewGame}
        />

        <Route
          exact
          path="/campeonatos/detalhes/:id/jogos/:gameId/novo-atleta"
          component={Athletic}
        />
        <Route
          exact
          path="/campeonatos/detalhes/:id/jogos/:gameId/:athleteId"
          component={Athletic}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
