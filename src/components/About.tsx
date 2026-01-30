import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './About.css';
import teamImage from '../assets/team-working.png';

export const About: React.FC = () => {
    const { t } = useTranslation();
    const [expandedCard, setExpandedCard] = useState<number | null>(null);

    const realizations = [
        {
            id: 1,
            title: "Installation Coopérative - Douala",
            shortDesc: "Mise en place d'une unité complète de transformation pour une coopérative agricole.",
            fullDesc: "Mise en place d'une unité complète de transformation pour une coopérative agricole à Douala. Ce projet a permis d'équiper la coopérative avec des moulins à farine, des broyeurs et des équipements de conditionnement modernes. L'installation a considérablement augmenté la capacité de production et amélioré la qualité des produits transformés, permettant à la coopérative de mieux servir ses membres et d'accéder à de nouveaux marchés.",
            image: null
        },
        {
            id: 2,
            title: "Projet Agroalimentaire - Yaoundé",
            shortDesc: "Équipement d'une unité de production agroalimentaire moderne.",
            fullDesc: "Équipement d'une unité de production agroalimentaire moderne à Yaoundé. Ce projet comprenait l'installation de machines de transformation de manioc, incluant des éplucheuses, râpeuses, presses et séchoirs. L'unité est maintenant capable de produire de la farine de manioc de haute qualité, du gari et d'autres produits dérivés. Cette installation a créé des emplois locaux et contribue à la sécurité alimentaire de la région.",
            image: null
        },
        {
            id: 3,
            title: "GIC Agricole - Bafoussam",
            shortDesc: "Installation d'équipements de transformation pour un GIC agricole.",
            fullDesc: "Installation d'équipements de transformation pour un Groupe d'Initiative Commune (GIC) agricole à Bafoussam. Le projet a fourni des presses à huile de palme, des décortiqueuses et des équipements de raffinage. Cette installation permet au GIC de valoriser localement sa production d'huile de palme, d'augmenter ses revenus et de créer de la valeur ajoutée. L'équipement moderne garantit une production d'huile de qualité supérieure conforme aux normes sanitaires.",
            image: null
        }
    ];

    const toggleCard = (id: number) => {
        setExpandedCard(expandedCard === id ? null : id);
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

                <section className="about-section">
                    <h2>Nos Réalisations</h2>
                    <div className="realizations-grid">
                        {realizations.map((realization) => (
                            <div key={realization.id} className="realization-card">
                                {realization.image && (
                                    <div className="realization-image">
                                        <img src={realization.image} alt={realization.title} />
                                    </div>
                                )}
                                <div className="realization-content">
                                    <h3>{realization.title}</h3>
                                    <p className="realization-description">
                                        {expandedCard === realization.id ? realization.fullDesc : realization.shortDesc}
                                    </p>
                                    <button
                                        className="btn-read-more"
                                        onClick={() => toggleCard(realization.id)}
                                    >
                                        {expandedCard === realization.id ? 'Lire moins' : 'Lire plus'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
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
