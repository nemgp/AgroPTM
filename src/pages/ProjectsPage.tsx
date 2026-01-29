import React from 'react';
import { useTranslation } from 'react-i18next';

export const ProjectsPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="page-projects" style={{ padding: '3rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                Projets & Réalisations
            </h1>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--color-text-secondary)' }}>
                Découvrez nos installations réussies à travers le Cameroun et l'Afrique.
            </p>

            <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                <div style={{ backgroundColor: 'var(--color-bg-secondary)', borderRadius: '12px', overflow: 'hidden' }}>
                    <div style={{ height: '200px', backgroundColor: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#999' }}>Image du projet</span>
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Installation Coopérative - Douala</h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                            Installation complète de moulins et broyeurs pour une coopérative agricole.
                        </p>
                    </div>
                </div>

                <div style={{ backgroundColor: 'var(--color-bg-secondary)', borderRadius: '12px', overflow: 'hidden' }}>
                    <div style={{ height: '200px', backgroundColor: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#999' }}>Image du projet</span>
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Projet Agroalimentaire - Yaoundé</h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                            Équipement complet d'une unité de transformation de manioc.
                        </p>
                    </div>
                </div>

                <div style={{ backgroundColor: 'var(--color-bg-secondary)', borderRadius: '12px', overflow: 'hidden' }}>
                    <div style={{ height: '200px', backgroundColor: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#999' }}>Image du projet</span>
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>GIC Agricole - Bafoussam</h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                            Fourniture et installation de presses à huile de palme.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
