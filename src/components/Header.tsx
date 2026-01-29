import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Facebook, Menu, X } from 'lucide-react';
import './Header.css';
import logo from '../assets/logo-final.png';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Header: React.FC = () => {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

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
                            <NavLink to="/machines" className={({ isActive }) => isActive ? 'active' : ''}>
                                {t('header.machines')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/services" className={({ isActive }) => isActive ? 'active' : ''}>
                                {t('header.services')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/invest" className={({ isActive }) => isActive ? 'active' : ''}>
                                {t('header.invest')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/blog" className={({ isActive }) => isActive ? 'active' : ''}>
                                {t('header.blog')}
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
                    <p className="header-tagline">{t('header.tagline')}</p>
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
                    <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Menu">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <nav className={`nav-mobile ${isMenuOpen ? 'open' : ''}`}>
                <ul>
                    <li>
                        <NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>
                            {t('header.home')}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/machines" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>
                            {t('header.machines')}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/services" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>
                            {t('header.services')}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/invest" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>
                            {t('header.invest')}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/blog" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>
                            {t('header.blog')}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>
                            {t('header.company')}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>
                            {t('header.contact')}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin" onClick={closeMenu} className="admin-link">
                            Admin
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
