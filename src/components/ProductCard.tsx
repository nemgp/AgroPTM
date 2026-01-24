import React from 'react';
import './ProductCard.css';

export interface Product {
    id: string;
    name: string;
    category: string;
    description: string;
    image: string; // URL or placeholder
}

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const whatsappUrl = `https://wa.me/237678646770?text=${encodeURIComponent(
        `Bonjour AgroPTM, je suis intéressé par votre machine : ${product.name} vue sur votre site web.`
    )}`;

    return (
        <div className="product-card">
            <div className="product-image-container">
                {/* Placeholder if no image provided, but we'll assume image prop is valid or handled */}
                <img src={product.image} alt={product.name} className="product-image" />
            </div>
            <div className="product-content">
                <span className="product-category">{product.category}</span>
                <h3 className="product-title">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-commander">
                    Commander sur WhatsApp
                </a>
            </div>
        </div>
    );
};
