import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router/Router";
import { CustomToast } from "./components/Prettys/PrettyViews";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <CustomToast />
    <Router />
  </BrowserRouter>
);
