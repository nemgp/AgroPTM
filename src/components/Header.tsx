import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
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
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                                {t('header.home')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/catalog" className={({ isActive }) => isActive ? 'active' : ''}>
                                {t('header.catalog')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
                                {t('header.company')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
                                {t('header.contact')}
                            </NavLink>
                        </li>
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
