import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import * as GoogleSheetsAPI from '../api/googleSheetsAPI';
import './RequestsViewer.css';

interface Request {
    id: string;
    type: 'custom' | 'quote' | 'contact';
    name: string;
    phone: string;
    email?: string;
    message: string;
    date: string;
}

export const RequestsViewer: React.FC = () => {
    const [requests, setRequests] = useState<Request[]>([]);
    const [loading, setLoading] = useState(true);
    const isConfigured = GoogleSheetsAPI.isGoogleSheetsConfigured();

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {
        if (!isConfigured) {
            // Données temporaires si Google Sheets n'est pas configuré
            setRequests([
                {
                    id: '1',
                    type: 'custom',
                    name: 'Jean Dupont',
                    phone: '+237 6 XX XX XX XX',
                    email: 'jean@example.com',
                    message: 'Je souhaite un moulin personnalisé pour mon exploitation de 5 hectares.',
                    date: '2026-01-28'
                },
                {
                    id: '2',
                    type: 'quote',
                    name: 'Marie Kamga',
                    phone: '+237 6 YY YY YY YY',
                    message: 'Demande de devis pour un broyeur-mélangeur.',
                    date: '2026-01-27'
                }
            ]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const data = await GoogleSheetsAPI.getRequests();
            setRequests(data);
        } catch (error) {
            console.error('Erreur lors du chargement des demandes:', error);
            alert('Erreur lors du chargement des demandes. Vérifiez la configuration Google Sheets.');
        } finally {
            setLoading(false);
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'custom': return '🔧 Demande Personnalisée';
            case 'quote': return '💰 Demande de Devis';
            case 'contact': return '📧 Contact';
            default: return type;
        }
    };

    return (
        <div className="requests-viewer">
            <div className="requests-header">
                <div>
                    <h2>Demandes Reçues</h2>
                    {!isConfigured && (
                        <p style={{ fontSize: '0.85rem', color: '#ff9800', margin: '0.5rem 0 0 0' }}>
                            ⚠️ Mode démo - Configurez Google Sheets pour voir les vraies demandes
                        </p>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <p className="requests-count">{requests.length} demande(s)</p>
                    <button onClick={loadRequests} className="btn-refresh-requests" disabled={loading}>
                        <RefreshCw size={18} className={loading ? 'spinning' : ''} />
                        Actualiser
                    </button>
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <RefreshCw size={32} className="spinning" style={{ color: 'var(--color-primary)' }} />
                    <p>Chargement des demandes...</p>
                </div>
            ) : requests.length === 0 ? (
                <div className="empty-state">
                    <p>Aucune demande pour le moment</p>
                </div>
            ) : (
                <div className="requests-list">
                    {requests.map(request => (
                        <div key={request.id} className="request-card">
                            <div className="request-header">
                                <span className="request-type">{getTypeLabel(request.type)}</span>
                                <span className="request-date">
                                    {new Date(request.date).toLocaleDateString('fr-FR')}
                                </span>
                            </div>

                            <div className="request-body">
                                <div className="request-info">
                                    <strong>{request.name}</strong>
                                    <p>📞 {request.phone}</p>
                                    {request.email && <p>✉️ {request.email}</p>}
                                </div>

                                <div className="request-message">
                                    <p><strong>Message :</strong></p>
                                    <p>{request.message}</p>
                                </div>
                            </div>

                            <div className="request-actions">
                                <a
                                    href={`https://wa.me/${request.phone.replace(/\s/g, '')}?text=Bonjour%20${encodeURIComponent(request.name)}%2C%20nous%20avons%20bien%20re%C3%A7u%20votre%20demande.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-whatsapp"
                                >
                                    Répondre via WhatsApp
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="info-box">
                <p>
                    <strong>Note :</strong> {isConfigured
                        ? 'Les demandes sont automatiquement enregistrées dans Google Sheets.'
                        : 'Configurez Google Sheets pour activer l\'enregistrement automatique des demandes. Consultez google-apps-script/README.md pour les instructions.'}
                </p>
            </div>
        </div>
    );
};
