import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import TagManager from "react-gtm-module";
import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import store from "../store";
import config from "../lib/config";
import theme from "../theme";
import "../styles/globals.css";
import "swiper/css";
import "swiper/css/pagination";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({
      gtmId: config.gtm.gtmId,
      auth: config.gtm.auth,
      preview: config.gtm.preview,
    });
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}
App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.objectOf(PropTypes.any).isRequired,
};
