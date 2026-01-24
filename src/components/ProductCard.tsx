import React from 'react';
import { useTranslation } from 'react-i18next';
import './ProductCard.css';

export interface Product {
    id: string;
    nameKey: string;
    categoryKey: string;
    descriptionKey: string;
    image: string;
}

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { t } = useTranslation();
    const productName = t(product.nameKey);

    const whatsappUrl = `https://wa.me/237678646770?text=${encodeURIComponent(
        t('product.whatsapp_message', { productName })
    )}`;

    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={product.image} alt={productName} className="product-image" />
            </div>
            <div className="product-content">
                <span className="product-category">{t(product.categoryKey)}</span>
                <h3 className="product-title">{productName}</h3>
                <p className="product-description">{t(product.descriptionKey)}</p>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-commander">
                    {t('product.commander')}
                </a>
            </div>
        </div>
    );
};
