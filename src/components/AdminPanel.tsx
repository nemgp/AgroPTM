import React from 'react';
import { useAuth } from '../contexts/authContext';
import { LogOut, User } from 'lucide-react';
import './AdminPanel.css';

interface AdminPanelProps {
    activeTab: 'requests' | 'products' | 'settings';
    onTabChange: (tab: 'requests' | 'products' | 'settings') => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ activeTab, onTabChange }) => {
    const { logout, username } = useAuth();

    const handleLogout = () => {
        if (window.confirm('Voulez-vous vraiment vous déconnecter ?')) {
            logout();
            window.location.href = '/';
        }
    };

    return (
        <div className="admin-panel">
            <div className="admin-header">
                <div>
                    <h1>Panneau d'Administration</h1>
                    <div className="admin-user-info">
                        <User size={16} />
                        <span>Connecté en tant que <strong>{username}</strong></span>
                    </div>
                </div>
                <button onClick={handleLogout} className="btn-logout">
                    <LogOut size={18} />
                    Déconnexion
                </button>
            </div>

            <div className="admin-tabs">
                <button
                    className={`tab-button ${activeTab === 'requests' ? 'active' : ''}`}
                    onClick={() => onTabChange('requests')}
                >
                    📋 Demandes Reçues
                </button>
                <button
                    className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
                    onClick={() => onTabChange('products')}
                >
                    🏭 Gestion du Catalogue
                </button>
                <button
                    className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={() => onTabChange('settings')}
                >
                    ⚙️ Paramètres
                </button>
            </div>
        </div>
    );
};
