import React from 'react';
import { useTranslation } from 'react-i18next';
import './About.css';

export const About: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section className="about-section" id="about">
            <div className="about-container">
                {/* Header */}
                <div className="about-header">
                    <h1>{t('about.title')}</h1>
                    <p className="subtitle">{t('about.subtitle')}</p>
                    <p className="description">{t('about.description')}</p>
                </div>

                {/* Team Section */}
                <div className="team-section">
                    <div className="team-content">
                        <h2>{t('about.team_title')}</h2>
                        <p>{t('about.team_text')}</p>
                    </div>
                    <div className="team-image">
                        <img src="/AgroPTM/team.png" alt={t('about.team_title')} />
                    </div>
                </div>

                {/* Realizations Gallery */}
                <div className="realizations-gallery">
                    <h2>{t('about.realizations_title')}</h2>
                    <div className="gallery-grid">
                        <div className="gallery-item">
                            <img src="/AgroPTM/realizations/machine1.png" alt={t('about.realization1')} />
                            <p className="gallery-caption">{t('about.realization1')}</p>
                        </div>
                        <div className="gallery-item">
                            <img src="/AgroPTM/realizations/machine2.jpg" alt={t('about.realization2')} />
                            <p className="gallery-caption">{t('about.realization2')}</p>
                        </div>
                        <div className="gallery-item">
                            <img src="/AgroPTM/realizations/machine3.jpg" alt={t('about.realization3')} />
                            <p className="gallery-caption">{t('about.realization3')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
