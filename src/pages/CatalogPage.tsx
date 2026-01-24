import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ProductCard } from '../components/ProductCard';
import { products, categoriesKeys } from '../data/products';

export const CatalogPage: React.FC = () => {
    const [selectedCategoryKey, setSelectedCategoryKey] = useState<string | null>(null);

    const filteredProducts = selectedCategoryKey
        ? products.filter(p => p.categoryKey === selectedCategoryKey)
        : products;

    return (
        <div className="page-catalog">
            <div className="catalog-container container" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                <div className="catalog-layout">
                    <aside className="catalog-sidebar">
                        <Sidebar
                            categoriesKeys={categoriesKeys}
                            selectedCategoryKey={selectedCategoryKey}
                            onSelectCategoryKey={setSelectedCategoryKey}
                        />
                    </aside>

                    <section className="catalog-grid">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </section>
                </div>
            </div>
        </div>
    );
};
