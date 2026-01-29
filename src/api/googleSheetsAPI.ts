/**
 * API pour interagir avec Google Sheets via Google Apps Script
 * Style SOGIS - Communication avec le backend Google Sheets
 */

// URL du Web App Google Apps Script (à configurer après déploiement)
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzRncfRysNVws0j2D0UaV8gHgMwAtyqL0BBRdBpRp6LCDLCFDVRMWlUU99-CV2cy_76/exec';

export interface Product {
    id: string;
    nameKey: string;
    categoryKey: string;
    descriptionKey: string;
    image: string;
}

export interface Request {
    id: string;
    type: 'custom' | 'quote' | 'contact';
    name: string;
    phone: string;
    email?: string;
    message: string;
    date: string;
}

// ============ PRODUCTS API ============

export async function getProducts(): Promise<Product[]> {
    try {
        const response = await fetch(`${WEB_APP_URL}?action=getProducts`);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return data.products || [];
    } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        throw error;
    }
}

export async function addProduct(product: Omit<Product, 'id'>): Promise<string> {
    try {
        const response = await fetch(`${WEB_APP_URL}?action=addProduct`, {
            method: 'POST',
            body: JSON.stringify({
                ...product,
                id: Date.now().toString()
            })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return data.id;
    } catch (error) {
        console.error('Erreur lors de l\'ajout du produit:', error);
        throw error;
    }
}

export async function updateProduct(product: Product): Promise<void> {
    try {
        const response = await fetch(`${WEB_APP_URL}?action=updateProduct`, {
            method: 'POST',
            body: JSON.stringify(product)
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour du produit:', error);
        throw error;
    }
}

export async function deleteProduct(id: string): Promise<void> {
    try {
        const response = await fetch(`${WEB_APP_URL}?action=deleteProduct`, {
            method: 'POST',
            body: JSON.stringify({ id })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du produit:', error);
        throw error;
    }
}

// ============ REQUESTS API ============

export async function getRequests(): Promise<Request[]> {
    try {
        const response = await fetch(`${WEB_APP_URL}?action=getRequests`);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return data.requests || [];
    } catch (error) {
        console.error('Erreur lors de la récupération des demandes:', error);
        throw error;
    }
}

export async function addRequest(request: Omit<Request, 'id' | 'date'>): Promise<string> {
    try {
        const response = await fetch(`${WEB_APP_URL}?action=addRequest`, {
            method: 'POST',
            body: JSON.stringify({
                ...request,
                id: Date.now().toString(),
                date: new Date().toISOString()
            })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return data.id;
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la demande:', error);
        throw error;
    }
}

// ============ AUTHENTICATION API ============

export interface AuthResult {
    valid: boolean;
    username: string;
}

export async function verifyPassword(password: string): Promise<AuthResult> {
    try {
        const response = await fetch(`${WEB_APP_URL}?action=verifyPassword&password=${encodeURIComponent(password)}`);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return {
            valid: data.valid,
            username: data.username || 'Admin'
        };
    } catch (error) {
        console.error('Erreur lors de la vérification du mot de passe:', error);
        throw error;
    }
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
        const response = await fetch(`${WEB_APP_URL}?action=changePassword`, {
            method: 'POST',
            body: JSON.stringify({
                currentPassword,
                newPassword
            })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }
    } catch (error) {
        console.error('Erreur lors du changement de mot de passe:', error);
        throw error;
    }
}

// ============ HELPER ============

/**
 * Vérifie si l'API Google Sheets est configurée
 */
export function isGoogleSheetsConfigured(): boolean {
    return WEB_APP_URL.startsWith('https://script.google.com/');
}

/**
 * Convertit une image File en base64
 */
export async function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
