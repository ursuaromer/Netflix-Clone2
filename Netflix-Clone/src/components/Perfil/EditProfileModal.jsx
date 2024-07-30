// src/components/EditProfileModal.jsx
import React from 'react';
import './Perfil.css';

const EditProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>✕</button>
        <form>
        <h2>Editar Perfil</h2>
          <label>
            Nombre de Usuario:
            <input type="text" name="username" />
          </label>
          <label>
            Foto de Perfil:
            <input type="file" name="profilePicture" />
          </label>
          <button className="submit-button" type="submit">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
