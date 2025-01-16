import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import Login from "./routes/Login";
import Admin from "./routes/Admin";
import Detail from "./routes/Detail";
import "./styles/output.css";

function App() {
  const darkmode = window.matchMedia("(prefers-color-scheme: dark)");
  const themeStore = JSON.parse(localStorage.getItem("theme-store"));
  const rootElement = document.getElementById("root");

  useEffect(() => {
    let config;

    if (themeStore && !themeStore.isSystem) config = themeStore.main === "dark";
    else config = darkmode.matches;

    rootElement.setAttribute("class", config ? "dark" : "light");
    localStorage.setItem(
      "theme-store",
      JSON.stringify({
        main: config ? "dark" : "light",
        isSystem: themeStore.isSystem,
      })
    );
  }, [darkmode, themeStore]);

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
