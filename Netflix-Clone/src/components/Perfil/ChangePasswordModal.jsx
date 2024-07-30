// src/components/ChangePasswordModal.jsx
import React, { useState } from 'react';
import './Perfil.css';

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>✕</button>
        <form>
        <h2>Cambiar Contraseña</h2>
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
          <label>
            Nueva Contraseña:
            <input type={showPassword ? "text" : "password"} name="newPassword" required />
            <button type="button" className="toggle-password-button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </label>
          <label>
            Confirmar Nueva Contraseña:
            <input type={showPassword ? "text" : "password"} name="confirmNewPassword" required />
            <button type="button" className="toggle-password-button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </label>
          <button type="submit" className="submit-button">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};


export default ChangePasswordModal;
