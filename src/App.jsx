import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import Login from "./routes/Login";
import Admin from "./routes/Admin";
import Detail from "./routes/Detail";
import "./styles/output.css";

function App() {
  return (
    <NuqsAdapter>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/:id" element={<Detail />} />
          <Route path="*" element={<Navigate to={"/login"} />} />
        </Routes>
      </BrowserRouter>
    </NuqsAdapter>
  );
}

export default App;
