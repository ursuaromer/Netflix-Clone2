import "./App.css";
import Component from "./components/Login_Register/LoginForm";
import Navegador from "./components/Navegador/Navegador";
import Inicio from "./components/Inicio/Inicio";
import Peliculas from "./components/Peliculas/Peliculas";
import Notificacion from "./components/Notificacion/Notificacion"
import Series from "./components/Series/Series";
import Perfil from "./components/Perfil/Perfil";
import ChangePasswordForm from "./components/Login_Register/ChangePasswordForm";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Component/>} />
        <Route path="/cambiar-contraseña" element={<ChangePasswordForm />} />
        <Route path="/Inicio" element={<Inicio/>} />
        <Route path="/peliculas" element={<Peliculas/>} />
        <Route path="/series" element={<Series/>} />
        <Route path="/notificacion" element={<Notificacion/>} />
        <Route path="/perfil" element={<Perfil/>} />
      </Routes>
    </div>
  );
}

export default App;
