import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import './AdminLogin.css';

const AdminLogin: React.FC = () => {
    const [username, setUsername] = useState('Kazor');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const success = await login(password);
            if (success) {
                navigate('/admin');
            } else {
                setError('Mot de passe incorrect');
                setPassword('');
            }
        } catch (error) {
            setError('Erreur de connexion. Vérifiez votre configuration.');
            setPassword('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-container">
            <form className="admin-login-form" onSubmit={handleSubmit}>
                <h2>Administration AgroPTM</h2>
                <p className="login-subtitle">Connectez-vous pour accéder au panneau d'administration</p>

                <div className="form-group">
                    <label htmlFor="username">Identifiant</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Entrez votre identifiant"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Entrez votre mot de passe"
                        required
                        disabled={loading}
                    />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="btn-login" disabled={loading}>
                    {loading ? 'Connexion...' : 'Se connecter'}
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
