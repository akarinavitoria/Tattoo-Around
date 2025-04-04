import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header.jsx"; // Importa o Header como default
import { AuthProvider } from "./context/AuthContext";
import Routes from "./Routes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-container">
          <Header />
          <main>
            <Routes />
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
