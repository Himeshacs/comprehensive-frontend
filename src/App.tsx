import React from "react";
import { AppProviders } from "./providers/AppProviders";
import "./App.css";
import { AppRoutes } from "./components/Routes/AppRoutes";
import { Navigation } from "./components/Layout/Navigations";

function App() {
  return (
    <AppProviders>
      <div className="App">
        <Navigation />
        <main className="container">
          <AppRoutes />
        </main>
      </div>
    </AppProviders>
  );
}

export default App;
