import React from 'react';
import { Phone, MessageCircle, Facebook } from 'lucide-react';
import './Realizations.css';

export const Realizations: React.FC = () => {
    const phoneNumber = '+237 678 646 770';
    const whatsappLink = 'https://wa.me/237678646770';
    const facebookLink = 'https://www.facebook.com/p/Agroptm-100063661639375/';

    return (
        <section className="contact-section">
            <div className="contact-container">
                <h2 className="contact-title">Nous Sommes à Votre Écoute</h2>
                <p className="contact-subtitle">
                    Votre satisfaction est notre priorité. Nous répondons rapidement à toutes vos sollicitations.
                </p>

                <div className="contact-methods">
                    <a href={`tel:${phoneNumber}`} className="contact-card phone-card">
                        <div className="contact-icon">
                            <Phone size={32} />
                        </div>
                        <h3>Appelez-nous</h3>
                        <p className="contact-value">{phoneNumber}</p>
                        <span className="contact-label">Disponible 7j/7</span>
                    </a>

                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="contact-card whatsapp-card">
                        <div className="contact-icon">
                            <MessageCircle size={32} />
                        </div>
                        <h3>WhatsApp</h3>
                        <p className="contact-value">Messagerie instantanée</p>
                        <span className="contact-label">Réponse rapide garantie</span>
                    </a>

                    <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="contact-card facebook-card">
                        <div className="contact-icon">
                            <Facebook size={32} />
                        </div>
                        <h3>Facebook</h3>
                        <p className="contact-value">@AgroPTM</p>
                        <span className="contact-label">Suivez nos actualités</span>
                    </a>
                </div>
            </div>
        </section>
    );
};
