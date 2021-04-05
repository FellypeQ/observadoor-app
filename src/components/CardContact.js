import { React } from "react";

import {
  Card,
  CardContent,
  CardActions,
  TextField,
  MenuItem,
  Button,
  makeStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const useStyles = makeStyles({
  root: {
    margin: "0",
  },
  button: {
    height: "24px",
    fontSize: "0.5rem",
  },
  text: {
    fontSize: "0.8rem",
  },
  danger: {
    backgroundColor: "#ef9a9a",
    "&:hover": { backgroundColor: "#af4448" },
  },
});

function CardContact(props) {
  const classes = useStyles();

  return (
    <Card className="mg-y-2">
      <CardContent>
        <TextField
          label="Nome contato"
          type="text"
          className="wid-50"
          InputProps={{ className: "input-smaller" }}
          variant="outlined"
          size="small"
          margin="dense"
          name="name"
          value={props.contact.name}
          onChange={(event) =>
            props.changeContacts(
              event,
              "change",
              props.index,
              "name",
              event.target.value
            )
          }
        />
        <TextField
          label="Responsável"
          select
          className="wid-45"
          InputProps={{ className: "input-smaller" }}
          variant="outlined"
          size="small"
          margin="dense"
          name="responsable"
          value={props.contact.responsable}
          onChange={(event) =>
            props.changeContacts(
              event,
              "change",
              props.index,
              "responsable",
              event.target.value
            )
          }
        >
          {[
            "Pai",
            "Mãe",
            "Empresário",
            "Tio(a)",
            "Irmão",
            "Irmã",
            "Amigo(a)",
            "Outro",
          ].map((el, idx) => (
            <MenuItem key={idx} value={el}>
              {el}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Telefone contato"
          type="text"
          className="wid-50"
          InputProps={{ className: "input-smaller" }}
          variant="outlined"
          size="small"
          margin="dense"
          name="phone"
          value={props.contact.phone}
          onChange={(event) =>
            props.changeContacts(
              event,
              "change",
              props.index,
              "phone",
              event.target.value
            )
          }
        />
      </CardContent>
      <CardActions className="just-sp-evenly">
        {props.index === props.quantity - 1 && (
          <Button
            variant="contained"
            color="secondary"
            className={`${classes.root} ${classes.button} `}
            startIcon={<PersonAddIcon />}
            onClick={(event) => props.changeContacts(event, "add")}
          >
            Adicionar outro contato
          </Button>
        )}

        <Button
          variant="contained"
          className={`${classes.root} ${classes.button} ${classes.danger} `}
          size="small"
          startIcon={<DeleteIcon />}
          onClick={(event) =>
            props.changeContacts(event, "delete", props.index)
          }
        >
          Excluir contato
        </Button>
      </CardActions>
    </Card>
  );
}

export default CardContact;
