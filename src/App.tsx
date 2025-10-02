import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Navigation } from "./components/Layout/Navigation";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Auth/Login";
import UserList from "./components/UserList/UserList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Navigation />
            <main className="container mx-auto p-4">
              <Routes>
                <Route path="/" element={<UserList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users" element={<UserList />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
