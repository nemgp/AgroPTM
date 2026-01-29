import React from 'react';
import { NavLink } from 'react-router-dom';

export const BlogPostPage: React.FC = () => {
    // const { id } = useParams<{ id: string }>();

    // Données temporaires - seront remplacées par Google Sheets
    const post = {
        title: 'Lancement de notre nouveau moulin GX200',
        date: '2026-01-15',
        image: '/AgroPTM/realizations/machine1.png',
        content: `
            <p>Nous sommes fiers de vous présenter notre dernière innovation : le moulin à farine Mo GX200.</p>
            
            <h2>Caractéristiques principales</h2>
            <ul>
                <li>Moteur puissant de 5.5 Ch</li>
                <li>Spécialement conçu pour le maïs et le manioc</li>
                <li>Idéal pour une production artisanale et semi-industrielle</li>
                <li>Robustesse et fiabilité garanties</li>
            </ul>

            <h2>Avantages pour votre exploitation</h2>
            <p>Ce moulin vous permettra d'augmenter significativement votre productivité tout en réduisant la pénibilité du travail. Sa conception robuste garantit une longue durée de vie même dans des conditions d'utilisation intensive.</p>

            <p>Pour plus d'informations ou pour commander, contactez-nous via WhatsApp.</p>
        `
    };

    return (
        <div className="page-blog-post" style={{ padding: '3rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
            <NavLink
                to="/blog"
                style={{
                    display: 'inline-block',
                    marginBottom: '2rem',
                    color: 'var(--color-primary)',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                }}
            >
                ← Retour aux actualités
            </NavLink>

            <article>
                <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px', marginBottom: '2rem' }}
                />

                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                    {new Date(post.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--color-primary)' }}>
                    {post.title}
                </h1>

                <div
                    style={{ fontSize: '1.1rem', lineHeight: '1.8' }}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </article>
        </div>
    );
};
