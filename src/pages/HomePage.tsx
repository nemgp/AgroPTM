import React from 'react';
import { Hero } from '../components/Hero';
// import { AdminAccessIcon } from '../components/AdminAccessIcon';

export const HomePage: React.FC = () => {
    return (
        <div className="page-home">
            <Hero />
            {/* Admin icon moved to footer */}
        </div>
    );
};
