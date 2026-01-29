import React from 'react';
import { useTranslation } from 'react-i18next';
import './About.css';
import teamWorking from '../assets/team-working.png';

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
                    <div className="team-images-container">
                        <div className="team-image-wrapper">
                            <img src="/AgroPTM/team.png" alt="Notre équipe administrative" />
                        </div>
                        <div className="team-image-wrapper">
                            <img src={teamWorking} alt="Ingénieurs assemblant un tracteur" />
                        </div>
                    </div>
                </div>

                {/* Realizations Gallery */}
                <div className="realizations-gallery">
                    <h2>{t('about.realizations_title')}</h2>
                    <div className="gallery-grid">
                        {/* Existing Items */}
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

                        {/* Merged Items from Projects Page */}
                        <div className="gallery-item">
                            <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Installation Coopérative - Douala</h3>
                                    <p style={{ color: '#666', fontSize: '0.95rem' }}>Mise en place d'une unité complète de transformation pour une coopérative agricole.</p>
                                </div>
                            </div>
                        </div>

                        <div className="gallery-item">
                            <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Projet Agroalimentaire - Yaoundé</h3>
                                    <p style={{ color: '#666', fontSize: '0.95rem' }}>Équipement d'une unité de production agroalimentaire moderne.</p>
                                </div>
                            </div>
                        </div>

                        <div className="gallery-item">
                            <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>GIC Agricole - Bafoussam</h3>
                                    <p style={{ color: '#666', fontSize: '0.95rem' }}>Installation d'équipements de transformation pour un GIC agricole.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
