// src/components/Perfil.jsx

import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import EditProfileModal from './EditProfileModal';
import ChangePasswordModal from './ChangePasswordModal';
import { Link, useNavigate } from 'react-router-dom';
import './Perfil.css';

const Perfil = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const navigate = useNavigate();

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  const openPasswordModal = () => setPasswordModalOpen(true);
  const closePasswordModal = () => setPasswordModalOpen(false);

  const handleLogout = () => {
    // Aquí puedes agregar la lógica para cerrar sesión, como limpiar el estado de autenticación, tokens, etc.
    navigate('/');
  };

  return (
    <div className="perfil-container">
      <div className='btn-regresar'>
        <Link className='regre' to="/Inicio">Regresar</Link>
      </div>
      <h1>Configuración de Perfil</h1>
      <ProfileCard
        openEditModal={openEditModal}
        openPasswordModal={openPasswordModal}
      />
      <EditProfileModal isOpen={isEditModalOpen} onClose={closeEditModal} />
      <ChangePasswordModal isOpen={isPasswordModalOpen} onClose={closePasswordModal} />
      <button className="cerrar-sesion" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Perfil;
