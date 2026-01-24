import React from 'react';
import { Facebook } from 'lucide-react';
import './Footer.css';

export const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-copyright">
                    © {new Date().getFullYear()} AgroPTM. Tous droits réservés.
                </div>
                <div className="footer-social">
                    <span>Suivez-nous</span>
                    <a
                        href="https://www.facebook.com/p/Agroptm-100063661639375/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                    >
                        <Facebook size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
};
