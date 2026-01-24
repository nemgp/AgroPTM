import React from 'react';
import { useTranslation } from 'react-i18next';
import './Sidebar.css';

interface SidebarProps {
    categoriesKeys: string[];
    selectedCategoryKey: string | null;
    onSelectCategoryKey: (categoryKey: string | null) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ categoriesKeys, selectedCategoryKey, onSelectCategoryKey }) => {
    const { t } = useTranslation();

    return (
        <aside className="sidebar">
            <h3 className="sidebar-title">{t('sidebar.title')}</h3>
            <ul className="category-list">
                <li>
                    <button
                        className={`category-btn ${selectedCategoryKey === null ? 'active' : ''}`}
                        onClick={() => onSelectCategoryKey(null)}
                    >
                        {t('sidebar.all')}
                    </button>
                </li>
                {categoriesKeys.map((catKey) => (
                    <li key={catKey}>
                        <button
                            className={`category-btn ${selectedCategoryKey === catKey ? 'active' : ''}`}
                            onClick={() => onSelectCategoryKey(catKey)}
                        >
                            {t(catKey)}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
};
