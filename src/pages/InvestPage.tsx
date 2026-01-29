import React from 'react';
import { useTranslation } from 'react-i18next';

export const InvestPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="page-invest" style={{ padding: '3rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                Investir / Partenariats
            </h1>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--color-text-secondary)' }}>
                Rejoignez-nous dans notre mission de mécanisation de l'agriculture africaine.
            </p>

            <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Pourquoi Investir dans AgroPTM ?</h2>
                <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', paddingLeft: '2rem' }}>
                    <li>Marché en forte croissance : mécanisation agricole en Afrique</li>
                    <li>Expertise technique reconnue et produits adaptés au contexte local</li>
                    <li>Réseau de clients établi (coopératives, GIC, PME agroalimentaires)</li>
                    <li>Potentiel d'expansion régionale important</li>
                </ul>
            </div>

            <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Opportunités de Partenariat</h2>
                <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                    <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '8px' }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>🤝 Partenaires Techniques</h3>
                        <p>Collaboration sur le développement de nouvelles machines</p>
                    </div>
                    <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '8px' }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>🏦 Institutions Financières</h3>
                        <p>Financement de projets d'équipement agricole</p>
                    </div>
                    <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '8px' }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>🌍 Distributeurs</h3>
                        <p>Réseau de distribution dans d'autres pays africains</p>
                    </div>
                </div>
            </div>

            <div style={{ padding: '2rem', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '12px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Intéressé par un Partenariat ?</h2>
                <p style={{ marginBottom: '1.5rem' }}>Contactez-nous pour discuter des opportunités de collaboration.</p>
                <a
                    href="https://wa.me/237678646770?text=Bonjour%20AgroPTM%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20un%20partenariat."
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-block',
                        padding: '1rem 2rem',
                        backgroundColor: 'white',
                        color: 'var(--color-primary)',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        textDecoration: 'none'
                    }}
                >
                    Nous Contacter
                </a>
            </div>
        </div>
    );
};
