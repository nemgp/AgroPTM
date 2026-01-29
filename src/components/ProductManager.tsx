import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, RefreshCw } from 'lucide-react';
import * as GoogleSheetsAPI from '../api/googleSheetsAPI';
import './ProductManager.css';

interface Product {
    id: string;
    nameKey: string;
    categoryKey: string;
    descriptionKey: string;
    image: string;
}

export const ProductManager: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        nameKey: '',
        categoryKey: 'Moulins',
        descriptionKey: '',
        image: ''
    });

    const isConfigured = GoogleSheetsAPI.isGoogleSheetsConfigured();

    // Charger les produits au montage du composant
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        if (!isConfigured) {
            // Données temporaires si Google Sheets n'est pas configuré
            setProducts([
                {
                    id: '1',
                    nameKey: 'Moulin à farine Mo GX200',
                    categoryKey: 'Moulins',
                    descriptionKey: 'Moteur 5.5 Ch, spécial maïs et manioc.',
                    image: '/AgroPTM/realizations/machine1.png'
                }
            ]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const data = await GoogleSheetsAPI.getProducts();
            setProducts(data);
        } catch (error) {
            console.error('Erreur lors du chargement des produits:', error);
            alert('Erreur lors du chargement des produits. Vérifiez la configuration Google Sheets.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product: Product) => {
        setEditingId(product.id);
        setFormData({
            nameKey: product.nameKey,
            categoryKey: product.categoryKey,
            descriptionKey: product.descriptionKey,
            image: product.image
        });
    };

    const handleSave = async (id: string) => {
        if (!isConfigured) {
            setProducts(products.map(p =>
                p.id === id ? { ...p, ...formData } : p
            ));
            setEditingId(null);
            alert('Produit mis à jour ! (Mode démo - configurez Google Sheets pour la persistance)');
            return;
        }

        try {
            const updatedProduct = { id, ...formData };
            await GoogleSheetsAPI.updateProduct(updatedProduct);
            setProducts(products.map(p => p.id === id ? updatedProduct : p));
            setEditingId(null);
            alert('Produit mis à jour avec succès !');
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
            alert('Erreur lors de la mise à jour du produit.');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Voulez-vous vraiment supprimer ce produit ?')) {
            return;
        }

        if (!isConfigured) {
            setProducts(products.filter(p => p.id !== id));
            alert('Produit supprimé ! (Mode démo - configurez Google Sheets pour la persistance)');
            return;
        }

        try {
            await GoogleSheetsAPI.deleteProduct(id);
            setProducts(products.filter(p => p.id !== id));
            alert('Produit supprimé avec succès !');
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            alert('Erreur lors de la suppression du produit.');
        }
    };

    const handleAdd = async () => {
        if (!formData.nameKey || !formData.descriptionKey) {
            alert('Veuillez remplir tous les champs obligatoires');
            return;
        }

        if (!isConfigured) {
            const newProduct: Product = {
                id: Date.now().toString(),
                ...formData
            };
            setProducts([...products, newProduct]);
            setShowAddForm(false);
            setFormData({ nameKey: '', categoryKey: 'Moulins', descriptionKey: '', image: '' });
            alert('Produit ajouté ! (Mode démo - configurez Google Sheets pour la persistance)');
            return;
        }

        try {
            const id = await GoogleSheetsAPI.addProduct(formData);
            const newProduct: Product = { id, ...formData };
            setProducts([...products, newProduct]);
            setShowAddForm(false);
            setFormData({ nameKey: '', categoryKey: 'Moulins', descriptionKey: '', image: '' });
            alert('Produit ajouté avec succès !');
        } catch (error) {
            console.error('Erreur lors de l\'ajout:', error);
            alert('Erreur lors de l\'ajout du produit.');
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const base64 = await GoogleSheetsAPI.fileToBase64(file);
                setFormData({ ...formData, image: base64 });
            } catch (error) {
                console.error('Erreur lors de la conversion de l\'image:', error);
                alert('Erreur lors du chargement de l\'image');
            }
        }
    };

    return (
        <div className="product-manager">
            <div className="product-manager-header">
                <div>
                    <h2>Gestion du Catalogue</h2>
                    {!isConfigured && (
                        <p style={{ fontSize: '0.85rem', color: '#ff9800', margin: '0.5rem 0 0 0' }}>
                            ⚠️ Mode démo - Configurez Google Sheets pour la persistance
                        </p>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={loadProducts} className="btn-refresh" disabled={loading}>
                        <RefreshCw size={18} className={loading ? 'spinning' : ''} />
                        Actualiser
                    </button>
                    <button onClick={() => setShowAddForm(true)} className="btn-add">
                        <Plus size={18} />
                        Ajouter un Produit
                    </button>
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <RefreshCw size={32} className="spinning" style={{ color: 'var(--color-primary)' }} />
                    <p>Chargement des produits...</p>
                </div>
            ) : (
                <>

                    {showAddForm && (
                        <div className="product-form-card">
                            <h3>Nouveau Produit</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Nom du Produit *</label>
                                    <input
                                        type="text"
                                        value={formData.nameKey}
                                        onChange={(e) => setFormData({ ...formData, nameKey: e.target.value })}
                                        placeholder="Ex: Moulin à farine GX200"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Catégorie *</label>
                                    <select
                                        value={formData.categoryKey}
                                        onChange={(e) => setFormData({ ...formData, categoryKey: e.target.value })}
                                    >
                                        <option value="Moulins">Moulins</option>
                                        <option value="Broyeurs">Broyeurs</option>
                                        <option value="Presses">Presses</option>
                                    </select>
                                </div>

                                <div className="form-group full-width">
                                    <label>Description *</label>
                                    <textarea
                                        value={formData.descriptionKey}
                                        onChange={(e) => setFormData({ ...formData, descriptionKey: e.target.value })}
                                        placeholder="Description du produit..."
                                        rows={3}
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label>Image</label>
                                    <div className="image-upload-section">
                                        <input
                                            type="text"
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                            placeholder="URL de l'image ou uploadez un fichier"
                                        />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="file-input"
                                        />
                                    </div>
                                    {formData.image && (
                                        <img src={formData.image} alt="Aperçu" className="image-preview" />
                                    )}
                                </div>
                            </div>

                            <div className="form-actions">
                                <button onClick={handleAdd} className="btn-save">
                                    <Save size={18} />
                                    Enregistrer
                                </button>
                                <button onClick={() => setShowAddForm(false)} className="btn-cancel">
                                    <X size={18} />
                                    Annuler
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="products-grid">
                        {products.map(product => (
                            <div key={product.id} className="product-card-admin">
                                {editingId === product.id ? (
                                    <div className="product-edit-form">
                                        <input
                                            type="text"
                                            value={formData.nameKey}
                                            onChange={(e) => setFormData({ ...formData, nameKey: e.target.value })}
                                        />
                                        <select
                                            value={formData.categoryKey}
                                            onChange={(e) => setFormData({ ...formData, categoryKey: e.target.value })}
                                        >
                                            <option value="Moulins">Moulins</option>
                                            <option value="Broyeurs">Broyeurs</option>
                                            <option value="Presses">Presses</option>
                                        </select>
                                        <textarea
                                            value={formData.descriptionKey}
                                            onChange={(e) => setFormData({ ...formData, descriptionKey: e.target.value })}
                                            rows={3}
                                        />
                                        <input
                                            type="text"
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                            placeholder="URL de l'image"
                                        />
                                        <div className="edit-actions">
                                            <button onClick={() => handleSave(product.id)} className="btn-save-small">
                                                <Save size={16} /> Sauvegarder
                                            </button>
                                            <button onClick={() => setEditingId(null)} className="btn-cancel-small">
                                                <X size={16} /> Annuler
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <img src={product.image} alt={product.nameKey} className="product-image-admin" />
                                        <div className="product-info-admin">
                                            <h3>{product.nameKey}</h3>
                                            <p className="product-category">{product.categoryKey}</p>
                                            <p className="product-description">{product.descriptionKey}</p>
                                        </div>
                                        <div className="product-actions">
                                            <button onClick={() => handleEdit(product)} className="btn-edit">
                                                <Edit size={16} /> Modifier
                                            </button>
                                            <button onClick={() => handleDelete(product.id)} className="btn-delete">
                                                <Trash2 size={16} /> Supprimer
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="info-box">
                        <p>
                            <strong>Note :</strong> {isConfigured
                                ? 'Les modifications sont automatiquement synchronisées avec Google Sheets.'
                                : 'Configurez Google Sheets pour activer la persistance des données. Consultez google-apps-script/README.md pour les instructions.'}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};
