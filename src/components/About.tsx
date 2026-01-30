import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './About.css';
import teamImage from '../assets/team-working.png';
import * as GoogleSheetsAPI from '../api/googleSheetsAPI';

export const About: React.FC = () => {
    const { t } = useTranslation();
    const [achievements, setAchievements] = useState<GoogleSheetsAPI.ContentItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAchievements();
    }, []);

    const loadAchievements = async () => {
        try {
            setLoading(true);
            const data = await GoogleSheetsAPI.getContent();
            // Filter only achievements
            const achievementItems = data.filter(item => item.type === 'achievement');
            setAchievements(achievementItems);
        } catch (error) {
            console.error('Erreur lors du chargement des réalisations:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="about-page">
            <div className="about-hero">
                <h1>{t('about.title')}</h1>
                <p className="about-subtitle">{t('about.subtitle')}</p>
            </div>

            <div className="about-content">
                <section className="about-section">
                    <h2>{t('about.who_we_are')}</h2>
                    <p>{t('about.description')}</p>
                </section>

                <section className="about-section">
                    <h2>{t('about.our_mission')}</h2>
                    <p>{t('about.mission_text')}</p>
                </section>

                <section className="about-section">
                    <h2>{t('about.our_values')}</h2>
                    <ul className="values-list">
                        <li><strong>{t('about.value1_title')}</strong> - {t('about.value1_desc')}</li>
                        <li><strong>{t('about.value2_title')}</strong> - {t('about.value2_desc')}</li>
                        <li><strong>{t('about.value3_title')}</strong> - {t('about.value3_desc')}</li>
                    </ul>
                </section>

                <section className="about-section team-section">
                    <h2>{t('about.our_team')}</h2>
                    <p>{t('about.team_text')}</p>
                    <div className="team-images-container">
                        <div className="team-image-wrapper">
                            <img src="/AgroPTM/team.png" alt="Notre équipe administrative" />
                        </div>
                        <div className="team-image-wrapper">
                            <img src={teamImage} alt="Ingénieurs assemblant un tracteur" />
                        </div>
                    </div>
                </section>

                <section className="about-section realizations-section">
                    <h2>{t('about.realizations_title')}</h2>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                            <p>Chargement des réalisations...</p>
                        </div>
                    ) : (
                        <div className="gallery-grid">
                            {achievements.length === 0 ? (
                                <p style={{ textAlign: 'center', color: '#666' }}>
                                    Aucune réalisation disponible pour le moment.
                                </p>
                            ) : (
                                achievements.map((achievement) => (
                                    <div key={achievement.id} className="gallery-item">
                                        {achievement.image && (
                                            <img src={achievement.image} alt={achievement.title} />
                                        )}
                                        <div className="gallery-caption">
                                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>
                                                {achievement.title}
                                            </h3>
                                            <p style={{ fontSize: '0.9rem', color: '#666' }}>
                                                {achievement.description}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};
