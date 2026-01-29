import React from 'react';
import { CustomRequestForm } from '../components/CustomRequestForm';

export const ServicesPage: React.FC = () => {
    return (
        <div className="page-services" style={{ padding: '3rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                Nos Services
            </h1>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--color-text-secondary)' }}>
                AgroPTM vous accompagne de la conception à la maintenance de vos équipements agricoles.
            </p>

            <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginBottom: '4rem' }}>
                <div style={{ padding: '2rem', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '12px' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                        🔧 Conception Sur Mesure
                    </h3>
                    <p>
                        Nous concevons des machines adaptées à vos besoins spécifiques et aux réalités africaines.
                    </p>
                </div>

                <div style={{ padding: '2rem', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '12px' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                        ⚙️ Fabrication Locale
                    </h3>
                    <p>
                        Fabrication robuste et de qualité dans nos ateliers au Cameroun.
                    </p>
                </div>

                <div style={{ padding: '2rem', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '12px' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                        📦 Installation & Formation
                    </h3>
                    <p>
                        Installation professionnelle et formation complète de vos équipes.
                    </p>
                </div>

                <div style={{ padding: '2rem', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '12px' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                        🔨 SAV & Maintenance
                    </h3>
                    <p>
                        Service après-vente réactif et maintenance préventive pour garantir la longévité de vos machines.
                    </p>
                </div>
            </div>

            {/* Custom Request Form Section */}
            <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '2px solid var(--color-border)' }}>
                <CustomRequestForm
                    title="Demande Personnalisée"
                    subtitle="Décrivez votre projet et nous vous contacterons rapidement."
                />
            </div>
        </div>
    );
};
