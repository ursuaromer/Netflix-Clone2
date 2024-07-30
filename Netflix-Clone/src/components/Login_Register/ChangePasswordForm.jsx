// frontend/src/components/ChangePasswordForm.jsx
import React, { useState } from 'react';

const ChangePasswordForm = () => {
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, oldPassword, newPassword }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message); // Mostrar mensaje de éxito
            } else {
                alert(data.message); // Mostrar mensaje de error
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error en el servidor. Inténtelo de nuevo más tarde.');
        }
    };

    return (
        <div className="change-password-container">
            <form onSubmit={handleSubmit} className="change-password-form">
                <h2>Cambiar Contraseña</h2>
                <div className="form-group">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Contraseña Antigua"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Nueva Contraseña"
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Cambiar Contraseña</button>
            </form>
        </div>
    );
};

export default ChangePasswordForm;
