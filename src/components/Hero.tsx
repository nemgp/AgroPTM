import React from 'react';
import { NavLink } from 'react-router-dom';
import { CustomRequestForm } from './CustomRequestForm';
import './Hero.css';

export const Hero: React.FC = () => {
    return (
        <section className="hero-section" id="home">
            <div className="hero-container">
                {/* Hero Content */}
                <div className="hero-content">
                    <h1>Machines Agricoles <br />Robustes & Performantes</h1>
                    <p>Nous concevons et fabriquons des équipements motorisés de qualité pour mécaniser votre production agricole et augmenter votre rendement.</p>

                    <div className="hero-cta">
                        <NavLink to="/machines" className="btn-primary">
                            Voir le Catalogue
                        </NavLink>
                        <NavLink to="/services#custom-form" className="btn-secondary">
                            Demande Personnalisée
                        </NavLink>
                    </div>
                </div>

                {/* Custom Request Form */}
                <CustomRequestForm />
            </div>
        </section>
    );
};
