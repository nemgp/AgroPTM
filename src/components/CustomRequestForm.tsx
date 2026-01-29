import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './CustomRequestForm.css';

interface CustomRequestFormProps {
    title?: string;
    subtitle?: string;
}

export const CustomRequestForm: React.FC<CustomRequestFormProps> = ({ title, subtitle }) => {
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
        <div className="custom-request-form" id="custom-form">
            <div className="form-header">
                <h2>{title || t('hero.form_title')}</h2>
                <p>{subtitle || t('hero.form_subtitle')}</p>
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
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">{t('hero.form_email')}</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="message">{t('hero.form_message')} *</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
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
    );
};
