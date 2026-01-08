import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost/api/login.php', { email, password }).then(res => {
      if (res.data.status === "success") {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/'); window.location.reload();
      } else alert(res.data.message);
    });
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Вход</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Пароль" onChange={e => setPassword(e.target.value)} required />
          <button type="submit">Войти</button>
        </form>
      </div>
    </div>
  );
}
export default Login;