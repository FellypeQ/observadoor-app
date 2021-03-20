import { React, useState } from "react";
import { LinearProgress, CircularProgress } from "@material-ui/core";

function ChampionshipInfo(props) {
  function defineProgress(stage) {
    if (stage === 1) {
      return 33;
    }
    if (stage === 2) {
      return 66;
    } else {
      return 99;
    }
  }

  return (
    <div>
      {props.loading ? (
        <CircularProgress />
      ) : (
        <input
          type="text"
          className="text-30px wid-90 disp-flex just-center mg-b-2"
          placeholder="Nome do Campeonato "
          name="name"
          value={props.name}
          onChange={props.handleChange}
          disabled={props.disabled}
        />
      )}
      <div className="disp-flex just-end mg-b-2">
        <h4>{props.nomeObsevador}</h4>
      </div>
      <div className="disp-flex flex-direct-col align-start">
        <label className="wid-100 mg-b-2">
          Local:
          {props.loading ? (
            <CircularProgress size={15} />
          ) : (
            <input
              type="text"
              placeholder="Local do jogo"
              name="localization"
              value={props.localization}
              onChange={props.handleChange}
              disabled={props.disabled}
            />
          )}
        </label>
        <label className="wid-100 mg-b-2">
          Início da competição:
          {props.loading ? (
            <CircularProgress size={15} />
          ) : (
            <input
              type="date"
              name="competionDate"
              value={props.competionDate}
              onChange={props.handleChange}
              disabled={props.disabled}
            />
          )}
        </label>
        <label className="wid-100 mg-b-2">
          Categorias:
          {props.loading ? (
            <CircularProgress size={15} />
          ) : (
            <input
              type="text"
              placeholder="Categorias"
              name="category"
              value={props.category}
              onChange={props.handleChange}
              disabled={props.disabled}
            />
          )}
        </label>
        <label className="wid-100 mg-b-2">
          Responsável:
          {props.loading ? (
            <CircularProgress size={15} />
          ) : (
            <input
              className="wid-60"
              type="text"
              placeholder="Responsável pelo campeonato"
              name="responsable"
              value={props.responsable}
              onChange={props.handleChange}
              disabled={props.disabled}
            />
          )}
        </label>
      </div>
    </div>
  );
}

export default ChampionshipInfo;
