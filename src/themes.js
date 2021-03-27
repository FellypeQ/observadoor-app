import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#424242",
      light: "#6d6d6d",
      dark: "#1b1b1b",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#a5d6a7",
      light: "#d7ffd9",
      dark: "#75a478",
      contrastText: "#212121",
    },
    default: {
      main: "#fff59d",
      light: "#ffffcf",
      dark: "#cbc26d",
      contrastText: "#000000",
    },
  },
  overrides: {
    MuiInputLabel: { root: { color: "black" } },
    //MuiTextField: { root: { margin: "3%" } },
    MuiButton: {
      root: { margin: "3%" },
      contained: {
        backgroundColor: "#fff59d",
        "&:hover": {
          backgroundColor: "#cbc26d",
        },
      },
      outlined: {
        borderColor: "#cbc26d",
        color: "#000000",
        "&:hover": {
          backgroundColor: "#ffffcf",
        },
      },
    },
    MuiFormControl: { root: { margin: "min(1%)" } },
  },
});

export default theme;
