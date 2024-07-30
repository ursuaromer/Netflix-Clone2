// src/components/ProfileCard.jsx
import React from 'react';
import './Perfil.css';

const ProfileCard = ({ openEditModal, openPasswordModal }) => {
  return (
    <div className="profile-card">
      <img src="https://th.bing.com/th/id/OIP.ba8TxHogmbqKWJprO69OOAHaEo?rs=1&pid=ImgDetMain" alt="Profile" className="profile-pic" />
      <h2>Nombre de Usuario</h2>
      <button className="edit-button" onClick={openEditModal}>Editar Perfil</button>
      <button className="password-button" onClick={openPasswordModal}>Cambiar Contraseña</button>
    </div>
  );
};

export default ProfileCard;
