import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import './Hero.css';

export const Hero: React.FC = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Create WhatsApp message
        const whatsappMessage = `Nouvelle demande personnalisée:\n\nNom: ${formData.name}\nTéléphone: ${formData.phone}\nEmail: ${formData.email || 'Non fourni'}\n\nMessage:\n${formData.message}`;

        // Open WhatsApp with pre-filled message
        window.open(`https://wa.me/237678646770?text=${encodeURIComponent(whatsappMessage)}`, '_blank');

        // Show success message
        setSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setFormData({ name: '', phone: '', email: '', message: '' });
            setSubmitted(false);
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section className="hero-section" id="home">
            {/* Background Image */}
            <div className="hero-bg">
                <img src="/AgroPTM/hero-bg.png" alt="Industrial Agriculture" />
            </div>
            <div className="hero-overlay"></div>

            <div className="hero-container">
                {/* Hero Content */}
                <div className="hero-content">
                    <h1>{t('hero.tagline')}</h1>
                    <p>{t('hero.description')}</p>

                    <div className="hero-cta">
                        <NavLink to="/catalog" className="btn-primary">
                            {t('hero.cta_catalog')}
                        </NavLink>
                        <a href="#custom-form" className="btn-secondary">
                            {t('hero.cta_custom')}
                        </a>
                    </div>
                </div>

                {/* Custom Request Form */}
                <div className="custom-request-form" id="custom-form">
                    <div className="form-header">
                        <h2>{t('hero.form_title')}</h2>
                        <p>{t('hero.form_subtitle')}</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">{t('hero.form_name')} *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder={t('hero.form_name')}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">{t('hero.form_phone')} *</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+237 ..."
                                required
                            />
                        </div>

                        <div className="form-group">
                            {/* Email can be optional visually or logic wise */}
                            <label htmlFor="email">{t('hero.form_email')}</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="email@example.com"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">{t('hero.form_message')} *</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder={t('hero.form_message')}
                                required
                            />
                        </div>

                        <button type="submit" className="form-submit">
                            {t('hero.form_submit')}
                        </button>

                        {submitted && (
                            <div className="form-success">
                                {t('hero.form_success')}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};
