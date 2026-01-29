import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export const BlogPage: React.FC = () => {
    const { t } = useTranslation();

    // Données temporaires - seront remplacées par Google Sheets
    const blogPosts = [
        {
            id: '1',
            title: 'Lancement de notre nouveau moulin GX200',
            excerpt: 'Découvrez notre dernière innovation pour la transformation du maïs et du manioc.',
            date: '2026-01-15',
            image: '/AgroPTM/realizations/machine1.png'
        },
        {
            id: '2',
            title: 'Comment choisir le bon broyeur pour votre exploitation',
            excerpt: 'Guide complet pour sélectionner l\'équipement adapté à vos besoins.',
            date: '2026-01-10',
            image: '/AgroPTM/realizations/machine2.jpg'
        },
        {
            id: '3',
            title: 'Maintenance préventive : prolongez la vie de vos machines',
            excerpt: 'Conseils pratiques pour entretenir vos équipements agricoles.',
            date: '2026-01-05',
            image: '/AgroPTM/realizations/machine3.jpg'
        }
    ];

    return (
        <div className="page-blog" style={{ padding: '3rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                Actualités & Blog
            </h1>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--color-text-secondary)' }}>
                Restez informés de nos dernières innovations et actualités.
            </p>

            <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
                {blogPosts.map(post => (
                    <article key={post.id} style={{ backgroundColor: 'var(--color-bg-secondary)', borderRadius: '12px', overflow: 'hidden' }}>
                        <img
                            src={post.image}
                            alt={post.title}
                            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                        />
                        <div style={{ padding: '1.5rem' }}>
                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                                {new Date(post.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                            <h2 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>{post.title}</h2>
                            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>{post.excerpt}</p>
                            <NavLink
                                to={`/blog/${post.id}`}
                                style={{
                                    color: 'var(--color-primary)',
                                    fontWeight: 'bold',
                                    textDecoration: 'none'
                                }}
                            >
                                Lire la suite →
                            </NavLink>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};
