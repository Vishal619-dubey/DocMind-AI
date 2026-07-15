import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";

function Documents() {
  return <h1 className="p-8 text-white text-3xl">Documents Page</h1>;
}

function Chat() {
  return <h1 className="p-8 text-white text-3xl">AI Chat Page</h1>;
}

function Analytics() {
  return <h1 className="p-8 text-white text-3xl">Analytics Page</h1>;
}

function Favorites() {
  return <h1 className="p-8 text-white text-3xl">Favorites Page</h1>;
}

function Pinned() {
  return <h1 className="p-8 text-white text-3xl">Pinned Page</h1>;
}

function Trash() {
  return <h1 className="p-8 text-white text-3xl">Trash Page</h1>;
}

function Settings() {
  return <h1 className="p-8 text-white text-3xl">Settings Page</h1>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/pinned" element={<Pinned />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}