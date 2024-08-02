import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 

  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('https://sandbox.academiadevelopers.com/api-auth/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      navigate('/login');
    } catch (error) {
      alert('Error registering user:', error.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" type="email" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
        </div>  
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <button className="button is-primary" type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;