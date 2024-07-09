import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de inicio de sesión o registro
    console.log(isLogin ? 'Iniciar sesión' : 'Registrarse', { email, password, name });
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <div className="login-container">
      <header>
        <h2>CAPLIX</h2>
      </header>
      <div className='Formulario'>
      <form onSubmit={handleSubmit} className="login-form">
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
      </form>
      </div>
      
    </div>
  );
};

export default LoginForm;