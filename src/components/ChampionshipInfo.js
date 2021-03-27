import { React } from "react";
import { TextField } from "@material-ui/core";

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
      <p className="disp-flex just-end mg-b-2">{props.nomeObsevador}</p>
      <div>
        <TextField
          className="wid-90 "
          type="text"
          label="Nome do campeonato"
          variant="outlined"
          size="large"
          name="name"
          value={props.name}
          onChange={props.handleChange}
          disabled={props.disabled}
        />
        <TextField
          variant="outlined"
          type="text"
          label="Local do jogo"
          size="small"
          margin="dense"
          name="localization"
          value={props.localization}
          onChange={props.handleChange}
          disabled={props.disabled}
        />
        <TextField
          className="wid-75"
          variant="outlined"
          type="date"
          InputLabelProps={{ shrink: true }}
          label="Início da competição"
          size="small"
          margin="dense"
          name="competionDate"
          value={props.competionDate}
          onChange={props.handleChange}
          disabled={props.disabled}
        />
        <TextField
          className="wid-75"
          variant="outlined"
          type="text"
          label="Categorias"
          size="small"
          margin="dense"
          name="category"
          value={props.category}
          onChange={props.handleChange}
          disabled={props.disabled}
        />
        <TextField
          className="wid-80"
          variant="outlined"
          type="text"
          label="Responsável pelo campeonato"
          size="small"
          margin="dense"
          name="responsable"
          value={props.responsable}
          onChange={props.handleChange}
          disabled={props.disabled}
        />
      </div>
    </div>
  );
}

export default ChampionshipInfo;
