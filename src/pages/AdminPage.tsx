```typescript
import React, { useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { AdminLogin } from '../components/AdminLogin';
import { AdminPanel } from '../components/AdminPanel';
import { ProductManager } from '../components/ProductManager';
import { RequestsViewer } from '../components/RequestsViewer';
import { PasswordManager } from '../components/PasswordManager';

export const AdminPage: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const [activeTab, setActiveTab] = useState<'requests' | 'products' | 'settings'>('requests');

    // Si non authentifié, afficher le formulaire de connexion
    if (!isAuthenticated) {
        return <AdminLogin />;
    }

    return (
        <div style={{ padding: '2rem 1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
            <AdminPanel activeTab={activeTab} onTabChange={setActiveTab} />

            <div style={{ marginTop: '2rem' }}>
                {activeTab === 'requests' && <RequestsViewer />}
                {activeTab === 'products' && <ProductManager />}
                {activeTab === 'settings' && <PasswordManager />}
            </div>
        </div>
    );
};
```
