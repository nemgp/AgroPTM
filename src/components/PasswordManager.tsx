import React, { useState } from 'react';
import { Key, Eye, EyeOff } from 'lucide-react';
import * as GoogleSheetsAPI from '../api/googleSheetsAPI';
import './PasswordManager.css';

export const PasswordManager: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswords, setShowPasswords] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        // Validation
        if (newPassword.length < 6) {
            setMessage({ type: 'error', text: 'Le nouveau mot de passe doit contenir au moins 6 caractères' });
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'Les mots de passe ne correspondent pas' });
            return;
        }

        setLoading(true);

        try {
            await GoogleSheetsAPI.changePassword(currentPassword, newPassword);
            setMessage({ type: 'success', text: 'Mot de passe modifié avec succès !' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Erreur lors du changement de mot de passe' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="password-manager">
            <div className="password-manager-header">
                <Key size={24} />
                <h3>Modifier le mot de passe</h3>
            </div>

            <form onSubmit={handleSubmit} className="password-form">
                <div className="form-group">
                    <label htmlFor="currentPassword">Mot de passe actuel *</label>
                    <div className="password-input-wrapper">
                        <input
                            type={showPasswords ? 'text' : 'password'}
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="newPassword">Nouveau mot de passe *</label>
                    <div className="password-input-wrapper">
                        <input
                            type={showPasswords ? 'text' : 'password'}
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            disabled={loading}
                            minLength={6}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmer le nouveau mot de passe *</label>
                    <div className="password-input-wrapper">
                        <input
                            type={showPasswords ? 'text' : 'password'}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={loading}
                            minLength={6}
                        />
                    </div>
                </div>

                <div className="show-password-toggle">
                    <label>
                        <input
                            type="checkbox"
                            checked={showPasswords}
                            onChange={(e) => setShowPasswords(e.target.checked)}
                        />
                        <span>
                            {showPasswords ? <EyeOff size={16} /> : <Eye size={16} />}
                            Afficher les mots de passe
                        </span>
                    </label>
                </div>

                {message && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <button type="submit" className="btn-change-password" disabled={loading}>
                    {loading ? 'Modification...' : 'Modifier le mot de passe'}
                </button>
            </form>
        </div>
    );
};
