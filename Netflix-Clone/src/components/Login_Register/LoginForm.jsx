import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importar Link para futuros enlaces si es necesario
import './LoginForm.css';

const LoginForm = () => {
  const navigate = useNavigate(); // Inicializar la función de navegación de react-router-dom
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre login y registro
  const [isChangePassword, setIsChangePassword] = useState(false); // Estado para mostrar el formulario de cambio de contraseña
  const [email, setEmail] = useState(''); // Estado para el correo electrónico
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const [name, setName] = useState(''); // Estado para el nombre (solo en registro)
  const [oldPassword, setOldPassword] = useState(''); // Estado para la contraseña antigua (solo en cambio de contraseña)
  const [newPassword, setNewPassword] = useState(''); // Estado para la nueva contraseña (solo en cambio de contraseña)
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar la contraseña
  const [errors, setErrors] = useState({}); // Estado para almacenar los mensajes de error

  // Validar email usando una expresión regular
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validar nombre para que no esté vacío y no tenga caracteres inválidos
  const validateName = (name) => {
    return name.trim() !== '';
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};

    // Validar los campos antes de enviarlos
    if (!validateEmail(email)) {
      formErrors.email = 'Email no válido';
    }

    if (!isLogin && !validateName(name)) {
      formErrors.name = 'El nombre no puede estar vacío';
    }

    setErrors(formErrors);

    // Si hay errores, no continuar con el envío del formulario
    if (Object.keys(formErrors).length > 0) {
      return;
    }

    if (isChangePassword) { // Si se está en el formulario de cambio de contraseña
      try {
        const response = await fetch('http://localhost:5000/api/auth/change-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, oldPassword, newPassword }), // Enviar datos al servidor
        });

        const data = await response.json();
        if (response.ok) {
          alert(data.message); // Mostrar mensaje de éxito
          setIsChangePassword(false); // Volver al estado inicial
          setIsLogin(true); // Asegurarse de que el formulario de inicio de sesión se muestre
          setEmail(''); // Limpiar los campos del formulario
          setOldPassword('');
          setNewPassword('');
        } else {
          alert(data.message); // Mostrar mensaje de error
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error en el servidor. Inténtelo de nuevo más tarde.');
      }
    } else if (isLogin) { // Si se está en el formulario de inicio de sesión
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }), // Enviar datos al servidor
        });

        const data = await response.json();
        if (response.ok) {
          console.log('Iniciar sesión', data);
          navigate('/inicio'); // Redirigir al componente /inicio
        } else {
          alert(data.message); // Mostrar mensaje de error
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error en el servidor. Inténtelo de nuevo más tarde.');
      }
    } else { // Si se está en el formulario de registro
      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: name, email, password }), // Enviar datos al servidor
        });

        const data = await response.json();
        if (response.ok) {
          console.log('Registrarse', data);
          setIsLogin(true); // Volver al estado de login
          alert('Registro exitoso. Ahora puedes iniciar sesión.');
        } else {
          alert(data.message); // Mostrar mensaje de error
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error en el servidor. Inténtelo de nuevo más tarde.');
      }
    }
  };

  // Alternar entre formularios de inicio de sesión y registro
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setName('');
    setErrors({});
  };

  // Alternar el formulario de cambio de contraseña
  const toggleChangePassword = () => {
    setIsChangePassword(!isChangePassword);
    setEmail('');
    setOldPassword('');
    setNewPassword('');
    setErrors({});
  };

  return (
    <div className="login-container">
      <header>
        <h2>CAPLIX</h2>
      </header>
      <div className='Formulario'>
        <form onSubmit={handleSubmit} className="login-form">
          {isChangePassword ? ( // Mostrar el formulario de cambio de contraseña si isChangePassword es true
            <>
              <h2>Cambiar Contraseña</h2>
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              <div className="form-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Contraseña Antigua"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nueva Contraseña"
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Cambiar Contraseña</button>
              <p className="toggle-form" onClick={toggleChangePassword}>
                {isChangePassword ? 'Volver a Iniciar Sesión' : '¿Olvidaste tu contraseña?'}
              </p>
            </>
          ) : ( // Mostrar el formulario de inicio de sesión o registro
            <>
              <h2>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h2>
              {!isLogin && (
                <div className="form-group">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre"
                    required
                  />
                  {errors.name && <p className="error">{errors.name}</p>}
                </div>
              )}
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              <div className="form-group password-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              <button type="submit" className="submit-btn">
                {isLogin ? 'Iniciar sesión' : 'Registrarse'}
              </button>
              <p className="toggle-form" onClick={toggleForm}>
                {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
              </p>
              {isLogin && (
                <p className="toggle-form" onClick={toggleChangePassword}>
                  ¿Olvidaste tu contraseña?
                </p>
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm; // Exportar el componente
