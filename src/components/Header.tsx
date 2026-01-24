import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Facebook, Menu } from 'lucide-react';
import './Header.css';
import logo from '../assets/logo.png';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Header: React.FC = () => {
    const { t } = useTranslation();
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const sections = ['home', 'about', 'products', 'contact'];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3 }
        );

        sections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

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
                            <a
                                href="#home"
                                className={activeSection === 'home' ? 'active' : ''}
                            >
                                {t('header.home')}
                            </a>
                        </li>
                        <li>
                            <a
                                href="#products"
                                className={activeSection === 'products' ? 'active' : ''}
                            >
                                {t('header.catalog')}
                            </a>
                        </li>
                        <li>
                            <a
                                href="#about"
                                className={activeSection === 'about' ? 'active' : ''}
                            >
                                {t('header.company')}
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                className={activeSection === 'contact' ? 'active' : ''}
                            >
                                {t('header.contact')}
                            </a>
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
