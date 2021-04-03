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
    inherit: {
      main: "#fff59d",
      light: "#ffffcf",
      dark: "#cbc26d",
      contrastText: "#000000",
    },
  },
  overrides: {
    MuiAppBar: { root: { height: "40px" } },
    MuiToolbar: { regular: { minHeight: "40px" } },
    MuiDrawer: { paper: { backgroundColor: "#6d6d6d" } },
    MuiFab: { root: { position: "fixed", right: "4%", bottom: "4%" } },
    MuiBackdrop: { root: { zIndex: "999" } },
    MuiInputLabel: { root: { color: "black" } },
    MuiCard: {
      root: {
        background:
          "radial-gradient(circle, rgba(213,210,210,1) 0%, rgba(218,251,215,1) 50%, rgba(213,210,210,1) 100%)",
        border: "1px groove",
      },
    },
    MuiCardContent: {
      root: {
        padding: "5px",
        "&:last-child": {
          paddingBottom: "6px",
        },
      },
    },
    MuiButton: {
      root: { margin: "3%" },
      contained: {
        backgroundColor: "#fff59d",
        "&:hover": {
          backgroundColor: "#cbc26d",
        },
      },
      outlined: {
        backgroundColor: "#bababa",
        borderColor: "#cbc26d",
        color: "#424242",
        "&:hover": {
          backgroundColor: "#ffffcf",
        },
      },
    },
    MuiFormControl: { root: { margin: "min(1%)" } },
  },
});

export default theme;
