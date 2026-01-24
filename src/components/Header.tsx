import React from 'react';
import { useTranslation } from 'react-i18next';
import { Facebook, Menu } from 'lucide-react';
import './Header.css';
import logo from '../assets/logo.png';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Header: React.FC = () => {
    const { t } = useTranslation();

    return (
        <header className="header">
            <div className="header-container">
                {/* Logo */}
                <div className="logo-container">
                    <img src={logo} alt="AgroPTM" className="logo-img" />
                </div>

                {/* Desktop Navigation */}
                <nav className="nav-desktop">
                    <ul>
                        <li><a href="#home">{t('header.home')}</a></li>
                        <li><a href="#products">{t('header.catalog')}</a></li>
                        <li><a href="#about">{t('header.company')}</a></li>
                        <li><a href="#contact">{t('header.contact')}</a></li>
                    </ul>
                </nav>

                {/* Social & Mobile Menu */}
                <div className="header-actions">
                    <a
                        href="https://www.facebook.com/p/Agroptm-100063661639375/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label="Facebook"
                    >
                        <Facebook size={24} />
                    </a>
                    <LanguageSwitcher />
                    <button className="mobile-menu-btn" aria-label="Menu">
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </header>
    );
};
