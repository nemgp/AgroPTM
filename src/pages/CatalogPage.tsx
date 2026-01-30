import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ProductCard } from '../components/ProductCard';
import * as GoogleSheetsAPI from '../api/googleSheetsAPI';

export const CatalogPage: React.FC = () => {
    const [products, setProducts] = useState<GoogleSheetsAPI.Product[]>([]);
    const [selectedCategoryKey, setSelectedCategoryKey] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await GoogleSheetsAPI.getProducts();
            setProducts(data);
        } catch (error) {
            console.error('Erreur lors du chargement des produits:', error);
        } finally {
            setLoading(false);
        }
    };

    // Extract unique categories from products
    const categoriesKeys = Array.from(new Set(products.map(p => p.categoryKey)));

    const filteredProducts = selectedCategoryKey
        ? products.filter(p => p.categoryKey === selectedCategoryKey)
        : products;

    return (
        <div className="page-catalog">
            <div className="catalog-container container" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>
                        <p>Chargement du catalogue...</p>
                    </div>
                ) : (
                    <div className="catalog-layout">
                        <aside className="catalog-sidebar">
                            <Sidebar
                                categoriesKeys={categoriesKeys}
                                selectedCategoryKey={selectedCategoryKey}
                                onSelectCategoryKey={setSelectedCategoryKey}
                            />
                        </aside>

                        <section className="catalog-grid">
                            {filteredProducts.length === 0 ? (
                                <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                                    Aucun produit disponible pour le moment.
                                </p>
                            ) : (
                                filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            )}
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
};
