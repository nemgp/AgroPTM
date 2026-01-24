import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import './LanguageSwitcher.css';

export const LanguageSwitcher: React.FC = () => {
    const { i18n, t } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language.startsWith('fr') ? 'en' : 'fr';
        i18n.changeLanguage(newLang);
    };

    return (
        <button className="lang-btn" onClick={toggleLanguage} aria-label="Change Language">
            <Globe size={20} />
            <span>{t('header.toggle_lang')}</span>
        </button>
    );
};
