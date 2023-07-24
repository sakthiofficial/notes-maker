import { createTheme } from "@mui/material/styles";

// eslint-disable-next-line import/no-mutable-exports
const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: ["IBM Plex Sans", "sans-serif"].join(","),
    },
    h1: {
      fontFamily: ["IBM Plex Sans", "sans-serif"].join(","),
    },
    p: {
      fontFamily: ["IBM Plex Sans", "sans-serif"].join(","),
    },
  },
});

export default theme;
