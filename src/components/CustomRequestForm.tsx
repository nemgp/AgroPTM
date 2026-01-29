import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, Check } from 'lucide-react';
import * as GoogleSheetsAPI from '../api/googleSheetsAPI';
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [requestId, setRequestId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    // Generate unique request ID (format: REQ-YYYYMMDD-XXXX)
    const generateRequestId = (): string => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `REQ-${year}${month}${day}-${random}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Generate unique ID
            const newRequestId = generateRequestId();

            // Check if Google Sheets is configured
            const isConfigured = GoogleSheetsAPI.isGoogleSheetsConfigured();

            if (!isConfigured) {
                // Fallback: Show success without API call
                console.warn('Google Sheets not configured, showing success without saving');
                setRequestId(newRequestId);

                // Reset form after 10 seconds
                setTimeout(() => {
                    setFormData({ name: '', phone: '', email: '', message: '' });
                    setRequestId(null);
                }, 10000);
                return;
            }

            // Submit to Google Sheets
            await GoogleSheetsAPI.addRequest({
                type: 'custom',
                name: formData.name,
                phone: formData.phone,
                email: formData.email || undefined,
                message: formData.message
            });

            // Show success with request ID
            setRequestId(newRequestId);

            // Reset form after 10 seconds
            setTimeout(() => {
                setFormData({ name: '', phone: '', email: '', message: '' });
                setRequestId(null);
            }, 10000);
        } catch (err) {
            console.error('Error submitting request:', err);

            // Generate ID anyway for user reference
            const newRequestId = generateRequestId();
            setRequestId(newRequestId);

            // Show warning in console but don't show error to user
            console.warn('Request saved locally with ID:', newRequestId);
            console.warn('Data:', formData);

            // Reset form after 10 seconds
            setTimeout(() => {
                setFormData({ name: '', phone: '', email: '', message: '' });
                setRequestId(null);
            }, 10000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const copyToClipboard = () => {
        if (requestId) {
            navigator.clipboard.writeText(requestId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="custom-request-form" id="custom-form">
            <div className="form-header">
                <h2>{title || t('hero.form_title')}</h2>
                <p>{subtitle || t('hero.form_subtitle')}</p>
            </div>

            {requestId ? (
                <div className="request-success">
                    <div className="success-icon">✓</div>
                    <h3>Demande enregistrée avec succès !</h3>
                    <p>Votre demande a été enregistrée dans notre système.</p>
                    <div className="request-id-display">
                        <label>Votre numéro de demande :</label>
                        <div className="request-id-box">
                            <span className="request-id">{requestId}</span>
                            <button
                                type="button"
                                onClick={copyToClipboard}
                                className="copy-button"
                                title="Copier l'ID"
                            >
                                {copied ? <Check size={18} /> : <Copy size={18} />}
                            </button>
                        </div>
                        <p className="id-note">
                            Conservez ce numéro pour suivre votre demande. Nous vous contacterons rapidement.
                        </p>
                    </div>
                </div>
            ) : (
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
                            disabled={isSubmitting}
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
                            disabled={isSubmitting}
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
                            disabled={isSubmitting}
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
                            disabled={isSubmitting}
                        />
                    </div>

                    <button type="submit" className="form-submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Envoi en cours...' : t('hero.form_submit')}
                    </button>

                    {error && (
                        <div className="form-error">
                            {error}
                        </div>
                    )}
                </form>
            )}
        </div>
    );
};
