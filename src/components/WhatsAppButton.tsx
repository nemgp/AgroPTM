import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle } from 'lucide-react';
import './WhatsAppButton.css';

export const WhatsAppButton: React.FC = () => {
    const { t } = useTranslation();

    return (
        <a
            href={`https://wa.me/237678646770?text=${encodeURIComponent(t('product.whatsapp_message', { productName: 'AgroPTM' }))}`}
            className="whatsapp-float"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact WhatsApp"
        >
            <MessageCircle size={32} />
        </a>
    );
};
