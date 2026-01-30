import React from 'react';
import { useTranslation } from 'react-i18next';
import './About.css';
import teamImage from '../assets/team-working.png';

export const About: React.FC = () => {
    const { t } = useTranslation();

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
                    <div className="team-image-container">
                        <img src={teamImage} alt="Notre équipe" className="team-image" />
                    </div>
                    <p>{t('about.team_text')}</p>
                </section>
            </div>
        </div>
    );
};
