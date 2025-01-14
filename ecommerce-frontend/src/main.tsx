import ReactDOM from "react-dom/client";
import AppRouter from "@routes/AppRouter";
// redux
import { store, persistor } from "@store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// axios
import "./services/axios-global.js";
// styles
import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/global.css";
//Languages
import { I18nextProvider } from "react-i18next";
import i18next from "./i18n.ts";
//Sooner Toaster
// import { Toaster } from "sonner";
// import AxiosInterceptors from "@services/AxiosInterceptors.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18next}>
    <Provider store={store}>
      {/* <AxiosInterceptors> */}
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter />
        {/* <Toaster richColors duration={1500} /> */}
      </PersistGate>
      {/* </AxiosInterceptors> */}
    </Provider>
  </I18nextProvider>
);
