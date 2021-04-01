import { React } from "react";
import { TextField, Card, CardContent } from "@material-ui/core";

function ChampionshipInfo(props) {
  function render(disabled) {
    if (disabled === "disabled") {
      return (
        <Card>
          <CardContent>
            <TextField
              label="Nome do campeonato"
              type="text"
              size="small"
              margin="none"
              InputProps={{
                disableUnderline: true,
                style: { fontSize: "1.5rem", height: "20px" },
              }}
              value={props.name}
              disabled={props.disabled}
            />
            <TextField
              label="Local do jogo"
              className="wid-45"
              type="text"
              size="small"
              InputProps={{
                disableUnderline: true,
                style: { fontSize: "1.0rem", height: "15px" },
              }}
              value={props.localization}
              disabled={props.disabled}
            />
            <TextField
              label="Início da competição"
              className="wid-50"
              type="date"
              InputLabelProps={{ shrink: true }}
              size="small"
              InputProps={{
                disableUnderline: true,
                style: { fontSize: "1.0rem", height: "15px" },
              }}
              value={props.competionDate}
              disabled={props.disabled}
            />
            <TextField
              label="Categorias"
              className="wid-45"
              type="text"
              size="small"
              value={props.category}
              InputProps={{
                disableUnderline: true,
                style: { fontSize: "1.0rem", height: "15px" },
              }}
              disabled={props.disabled}
            />
            <TextField
              label="Responsável"
              className="wid-50"
              type="text"
              size="small"
              value={props.responsable}
              InputProps={{
                disableUnderline: true,
                style: { fontSize: "1.0rem", height: "15px" },
              }}
              disabled={props.disabled}
            />
          </CardContent>
        </Card>
      );
    } else {
      return (
        <div>
          <TextField
            label="Nome do campeonato"
            className="wid-100"
            type="text"
            variant="outlined"
            size="large"
            InputProps={{ style: { fontWeight: "bolder" } }}
            InputLabelProps={{ style: { fontWeight: "bold" } }}
            name="name"
            value={props.name}
            onChange={props.handleChange}
            disabled={props.disabled}
          />
          <TextField
            name="localization"
            variant="outlined"
            className="wid-45"
            type="text"
            label="Local do jogo"
            size="small"
            margin="dense"
            value={props.localization}
            onChange={props.handleChange}
            disabled={props.disabled}
          />
          <TextField
            label="Início da competição"
            className="wid-50"
            variant="outlined"
            type="date"
            InputLabelProps={{ shrink: true }}
            size="small"
            margin="dense"
            name="competionDate"
            value={props.competionDate}
            onChange={props.handleChange}
            disabled={props.disabled}
          />
          <TextField
            label="Categorias"
            className="wid-75"
            variant="outlined"
            type="text"
            size="small"
            margin="dense"
            name="category"
            value={props.category}
            onChange={props.handleChange}
            disabled={props.disabled}
          />
          <TextField
            label="Responsável pelo campeonato"
            className="wid-80"
            variant="outlined"
            type="text"
            size="small"
            margin="dense"
            name="responsable"
            value={props.responsable}
            onChange={props.handleChange}
            disabled={props.disabled}
          />
        </div>
      );
    }
  }
  return (
    <div>
      <p className="disp-flex just-end mg-b-2">{props.nomeObsevador}</p>
      {render(props.disabled)}
    </div>
  );
}

export default ChampionshipInfo;
