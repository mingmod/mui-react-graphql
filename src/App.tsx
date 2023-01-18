import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./Layouts/Layout";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Stations } from "./Pages/Stations";
import NoPage from "./Pages/NoPage";
import { StationView } from "./Pages/StationView";
import StationsList from "./Pages/StationsList";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
  headers: { "Content-Type": "application/json" },
});

export enum ROUTES {
  HOME = "/",
  STATIONS = "/stations",
  STATION_VIEW = "/stations/:id",
}

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<Layout />}>
            <Route index element={<Navigate replace to={ROUTES.STATIONS} />} />
            <Route path={ROUTES.STATIONS} element={<Stations />}>
              <Route index element={<StationsList />} />
              <Route path={ROUTES.STATION_VIEW} element={<StationView />} />
            </Route>
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
