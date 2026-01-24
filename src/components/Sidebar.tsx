import React from 'react';
import './Sidebar.css';

interface SidebarProps {
    categories: string[];
    selectedCategory: string | null;
    onSelectCategory: (category: string | null) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <aside className="sidebar">
            <h3 className="sidebar-title">Catégories</h3>
            <ul className="category-list">
                <li>
                    <button
                        className={`category-btn ${selectedCategory === null ? 'active' : ''}`}
                        onClick={() => onSelectCategory(null)}
                    >
                        Tout voir
                    </button>
                </li>
                {categories.map((cat) => (
                    <li key={cat}>
                        <button
                            className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => onSelectCategory(cat)}
                        >
                            {cat}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
};
