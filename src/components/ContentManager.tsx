import React, { useState, useEffect } from 'react';
import { RefreshCw, Plus, Edit2, Trash2, X } from 'lucide-react';
import * as GoogleSheetsAPI from '../api/googleSheetsAPI';
import './ContentManager.css';

interface ContentItem {
    id: string;
    type: 'news' | 'achievement';
    title: string;
    description: string;
    image: string;
    date: string;
}

export const ContentManager: React.FC = () => {
    const [contents, setContents] = useState<ContentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'news' | 'achievement'>('all');
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
    const [formData, setFormData] = useState({
        type: 'news' as 'news' | 'achievement',
        title: '',
        description: '',
        image: ''
    });
    const isConfigured = GoogleSheetsAPI.isGoogleSheetsConfigured();

    useEffect(() => {
        loadContent();
    }, []);

    const loadContent = async () => {
        if (!isConfigured) {
            // Mock data
            setContents([
                {
                    id: '1',
                    type: 'news',
                    title: 'Nouvelle machine disponible',
                    description: 'Découvrez notre nouveau moulin à farine haute performance.',
                    image: '',
                    date: new Date().toISOString()
                },
                {
                    id: '2',
                    type: 'achievement',
                    title: 'Installation réussie à Douala',
                    description: 'Nous avons installé 5 machines pour un client à Douala.',
                    image: '',
                    date: new Date().toISOString()
                }
            ]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const data = await GoogleSheetsAPI.getContent();
            setContents(data);
        } catch (error) {
            console.error('Erreur lors du chargement du contenu:', error);
            alert('Erreur lors du chargement du contenu.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingItem) {
                // Update
                await GoogleSheetsAPI.updateContent({
                    ...editingItem,
                    ...formData
                });
                alert('Contenu mis à jour avec succès !');
            } else {
                // Add
                await GoogleSheetsAPI.addContent(formData);
                alert('Contenu ajouté avec succès !');
            }

            setShowForm(false);
            setEditingItem(null);
            setFormData({ type: 'news', title: '', description: '', image: '' });
            loadContent();
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de l\'enregistrement du contenu.');
        }
    };

    const handleEdit = (item: ContentItem) => {
        setEditingItem(item);
        setFormData({
            type: item.type,
            title: item.title,
            description: item.description,
            image: item.image
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;

        try {
            await GoogleSheetsAPI.deleteContent(id);
            alert('Contenu supprimé avec succès !');
            loadContent();
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la suppression du contenu.');
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const base64 = await GoogleSheetsAPI.fileToBase64(file);
            setFormData({ ...formData, image: base64 });
        } catch (error) {
            console.error('Erreur lors du chargement de l\'image:', error);
            alert('Erreur lors du chargement de l\'image.');
        }
    };

    const filteredContents = contents.filter(item =>
        filter === 'all' || item.type === filter
    );

    return (
        <div className="content-manager">
            <div className="content-header">
                <div>
                    <h2>Actualités & Réalisations</h2>
                    {!isConfigured && (
                        <p style={{ fontSize: '0.85rem', color: '#ff9800', margin: '0.5rem 0 0 0' }}>
                            ⚠️ Mode démo - Configurez Google Sheets pour la persistance
                        </p>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button onClick={loadContent} className="btn-refresh" disabled={loading}>
                        <RefreshCw size={18} className={loading ? 'spinning' : ''} />
                        Actualiser
                    </button>
                    <button onClick={() => setShowForm(true)} className="btn-add">
                        <Plus size={18} />
                        Ajouter
                    </button>
                </div>
            </div>

            <div className="content-filters">
                <button
                    className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
                    onClick={() => setFilter('all')}
                >
                    Tous ({contents.length})
                </button>
                <button
                    className={filter === 'news' ? 'filter-btn active' : 'filter-btn'}
                    onClick={() => setFilter('news')}
                >
                    Actualités ({contents.filter(c => c.type === 'news').length})
                </button>
                <button
                    className={filter === 'achievement' ? 'filter-btn active' : 'filter-btn'}
                    onClick={() => setFilter('achievement')}
                >
                    Réalisations ({contents.filter(c => c.type === 'achievement').length})
                </button>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <RefreshCw size={32} className="spinning" style={{ color: 'var(--color-primary)' }} />
                    <p>Chargement...</p>
                </div>
            ) : filteredContents.length === 0 ? (
                <div className="empty-state">
                    <p>Aucun contenu pour le moment</p>
                </div>
            ) : (
                <div className="content-grid">
                    {filteredContents.map(item => (
                        <div key={item.id} className="content-card">
                            {item.image && (
                                <div className="content-image">
                                    <img src={item.image} alt={item.title} />
                                </div>
                            )}
                            <div className="content-body">
                                <div className="content-meta">
                                    <span className={`content-type ${item.type}`}>
                                        {item.type === 'news' ? '📰 Actualité' : '🏆 Réalisation'}
                                    </span>
                                    <span className="content-date">
                                        {new Date(item.date).toLocaleDateString('fr-FR')}
                                    </span>
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <div className="content-actions">
                                    <button onClick={() => handleEdit(item)} className="btn-edit">
                                        <Edit2 size={16} />
                                        Modifier
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} className="btn-delete">
                                        <Trash2 size={16} />
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showForm && (
                <div className="modal-overlay" onClick={() => setShowForm(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{editingItem ? 'Modifier le contenu' : 'Ajouter un contenu'}</h3>
                            <button onClick={() => setShowForm(false)} className="btn-close">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Type *</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                                    required
                                >
                                    <option value="news">Actualité</option>
                                    <option value="achievement">Réalisation</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Titre *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Description *</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                {formData.image && (
                                    <div className="image-preview">
                                        <img src={formData.image} alt="Preview" />
                                    </div>
                                )}
                            </div>

                            <div className="form-actions">
                                <button type="button" onClick={() => setShowForm(false)} className="btn-cancel">
                                    Annuler
                                </button>
                                <button type="submit" className="btn-submit">
                                    {editingItem ? 'Mettre à jour' : 'Ajouter'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
