export interface Product {
    id: string;
    nameKey: string;
    categoryKey: string;
    descriptionKey: string;
    image: string; // URL or placeholder
}

export const products: Product[] = [
    {
        id: '1',
        nameKey: 'product.gx200.name',
        categoryKey: 'categories.Moulins', // Simplified Category key reference
        descriptionKey: 'product.gx200.desc',
        image: '/AgroPTM/realizations/machine1.png'
    },
    {
        id: '2',
        nameKey: 'product.broyeur.name',
        categoryKey: 'categories.Broyeurs',
        descriptionKey: 'product.broyeur.desc',
        image: '/AgroPTM/realizations/machine2.jpg'
    },
    {
        id: '3',
        nameKey: 'product.raffles.name',
        categoryKey: 'categories.Moulins',
        descriptionKey: 'product.raffles.desc',
        image: '/AgroPTM/realizations/machine3.jpg'
    },
    {
        id: '4',
        nameKey: 'product.presse.name',
        categoryKey: 'categories.Presses',
        descriptionKey: 'product.presse.desc',
        image: '/AgroPTM/realizations/machine1.png'
    }
];

// We still export categories keys for the Sidebar
export const categoriesKeys = ['categories.Moulins', 'categories.Broyeurs', 'categories.Presses'];
