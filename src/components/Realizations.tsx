import React from 'react';
import { useTranslation } from 'react-i18next';
import './Realizations.css';

export const Realizations: React.FC = () => {
    const { t } = useTranslation();
    return (
        <section className="realizations-section">
            <div className="realizations-container">
                <h2 className="realizations-title">{t('realizations.title')}</h2>
                <p className="realizations-text">
                    {t('realizations.text')}
                </p>
                <a
                    href="https://www.facebook.com/photo/?fbid=1520187260113314&set=pb.100063661639375.-2207520000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="realizations-link"
                >
                    {t('realizations.button')}
                </a>
            </div>
        </section>
    );
};
