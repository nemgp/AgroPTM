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
                            <div style={{ height: '200px', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ color: '#999' }}>Douala</span>
                            </div>
                            <div style={{ padding: '1rem' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Installation Coopérative - Douala</h3>
                                <p className="gallery-caption" style={{ textAlign: 'left', padding: 0 }}>
                                    Installation complète de moulins et broyeurs pour une coopérative agricole.
                                </p>
                            </div>
                        </div>

                        <div className="gallery-item">
                            <div style={{ height: '200px', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ color: '#999' }}>Yaoundé</span>
                            </div>
                            <div style={{ padding: '1rem' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Projet Agroalimentaire - Yaoundé</h3>
                                <p className="gallery-caption" style={{ textAlign: 'left', padding: 0 }}>
                                    Équipement complet d'une unité de transformation de manioc.
                                </p>
                            </div>
                        </div>

                        <div className="gallery-item">
                            <div style={{ height: '200px', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ color: '#999' }}>Bafoussam</span>
                            </div>
                            <div style={{ padding: '1rem' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>GIC Agricole - Bafoussam</h3>
                                <p className="gallery-caption" style={{ textAlign: 'left', padding: 0 }}>
                                    Fourniture et installation de presses à huile de palme.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
