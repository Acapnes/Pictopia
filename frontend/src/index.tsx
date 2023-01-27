import ReactDOM from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router/Router";
import { CustomToast } from "./components/Prettys/PrettyViews";
import "./index.css";

const client = new ApolloClient({
  uri: "http://localhost:3000/pictopia",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <CustomToast />
      <Router />
    </BrowserRouter>
  </ApolloProvider>
);
