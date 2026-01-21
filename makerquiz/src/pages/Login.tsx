import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import '../styles/Login.css';

export const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(username, password);
      } else {
        if (password !== password2) {
          throw new Error('Passwords do not match');
        }
        await register(username, password, password2, email);
        // After successful registration, automatically log in
        await login(username, password);
      }
      navigate('/questions');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>{isLogin ? 'Login' : 'Register'}</h1>

        {error && <Message severity="error" text={error} />}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <InputText
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <InputText
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <InputText
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <InputText
                id="password2"
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          <Button
            type="submit"
            label={isLogin ? 'Login' : 'Register'}
            className="p-button-rounded p-button-lg"
            loading={loading}
            disabled={loading}
          />
        </form>

        <div className="login-toggle">
          <p>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setUsername('');
                setPassword('');
                setPassword2('');
                setEmail('');
              }}
              className="toggle-button"
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
