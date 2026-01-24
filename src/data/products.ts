import type { Product } from '../components/ProductCard';

export const products: Product[] = [
    {
        id: '1',
        name: 'Moulin à farine Mo GX200',
        category: 'Moulins',
        description: 'Moteur 5.5 Ch, spécial maïs et manioc. Idéal pour une production artisanale et semi-industrielle.',
        image: 'https://placehold.co/600x400/F28C28/FFFFFF?text=Moulin+GX200'
    },
    {
        id: '2',
        name: 'Broyeur-Mélangeur',
        category: 'Broyeurs',
        description: 'Modèles pour aliments de bétail et volaille. Assure un mélange homogène pour une nutrition optimale.',
        image: 'https://placehold.co/600x400/333333/FFFFFF?text=Broyeur+Melangeur'
    },
    {
        id: '3',
        name: 'Moulin de raffles de maïs',
        category: 'Moulins',
        description: 'Valorisation des résidus agricoles. Transformez les déchets en ressources utilisables.',
        image: 'https://placehold.co/600x400/F28C28/FFFFFF?text=Moulin+Raffles'
    },
    {
        id: '4',
        name: 'Égrappeuse & Presse à huile',
        category: 'Presses',
        description: 'Solutions complètes pour la filière huile de palme. Extraction efficace et robuste.',
        image: 'https://placehold.co/600x400/333333/FFFFFF?text=Presse+Huile'
    },
    // Adding a few generic ones to fill grid if needed, or stick to requested list.
    // Prompt says "Structure : Grille de produits 3x3". That implies 9 products?
    // The user only listed 4. I will add placeholders to demonstrate the grid?
    // "Tous les boutons... doivent rediriger".
    // I'll stick to the real ones + maybe 2 more "Génériques" to look good?
    // User said "Catalogue de Produits (Détails) : ...". I'll stick to the 4 for accuracy, or duplicate them. 
    // I'll duplicate to fill at least a row nicely or just leave 4. 4 is fine.
];

export const categories = ['Moulins', 'Broyeurs', 'Presses'];
