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
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: "black",
      },
    },
    MuiTextField: {
      root: {
        margin: "3%",
      },
    },
    MuiButton: {
      root: {
        margin: "3%",
      },
    },
    MuiFormControl: { root: { padding: "2% 4%" } },
  },
});

export default theme;
