import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import TagManager from "react-gtm-module";
import { useEffect } from "react";
import store from "../store";
import config from "../lib/config";
import "@/styles/globals.css";
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
      <SnackbarProvider maxSnack={3}>
        <Component {...pageProps} />
      </SnackbarProvider>
    </Provider>
  );
}
App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.objectOf(PropTypes.any).isRequired,
};
