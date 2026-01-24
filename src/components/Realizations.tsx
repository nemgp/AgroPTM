import React from 'react';
import './Realizations.css';

export const Realizations: React.FC = () => {
    return (
        <section className="realizations-section">
            <div className="realizations-container">
                <h2 className="realizations-title">Nos Dernières Réalisations</h2>
                <p className="realizations-text">
                    Découvrez nos machines sur le terrain. Robustess et efficacité prouvées.
                </p>
                <a
                    href="https://www.facebook.com/photo/?fbid=1520187260113314&set=pb.100063661639375.-2207520000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="realizations-link"
                >
                    Voir les actualités en images
                </a>
            </div>
        </section>
    );
};
