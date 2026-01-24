import React from 'react';
import { MessageCircle } from 'lucide-react';
import './WhatsAppButton.css';

export const WhatsAppButton: React.FC = () => {
    return (
        <a
            href="https://wa.me/237678646770?text=Bonjour%20AgroPTM,%20je%20suis%20int%C3%A9ress%C3%A9%20par%20l'une%20de%20vos%20machines%20vue%20sur%20votre%20site%20web."
            className="whatsapp-float"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact WhatsApp"
        >
            <MessageCircle size={32} />
        </a>
    );
};
