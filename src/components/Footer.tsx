import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Settings } from 'lucide-react';
import './Footer.css';

export const Footer: React.FC = () => {
    const { t } = useTranslation();
    return (
        <footer className="footer">
            <div className="footer-container">
                <Link to="/admin" className="footer-admin-link" aria-label="Administration">
                    <Settings size={20} />
                </Link>

                <div className="footer-social">
                    <span>{t('footer.follow_us')}</span>
                    <a
                        href="https://www.facebook.com/p/Agroptm-100063661639375/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                    >
                        <Facebook size={20} />
                    </a>
                </div>

                <div className="footer-copyright">
                    © {new Date().getFullYear()} {t('footer.copyright')}
                </div>
            </div>
        </footer>
    );
};
