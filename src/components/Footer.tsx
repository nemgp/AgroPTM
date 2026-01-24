import React from 'react';
import { useTranslation } from 'react-i18next';
import { Facebook } from 'lucide-react';
import './Footer.css';

export const Footer: React.FC = () => {
    const { t } = useTranslation();
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-copyright">
                    © {new Date().getFullYear()} {t('footer.copyright')}
                </div>
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
            </div>
        </footer>
    );
};
