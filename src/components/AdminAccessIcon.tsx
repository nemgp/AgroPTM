import React from 'react';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import './AdminAccessIcon.css';

export const AdminAccessIcon: React.FC = () => {
    return (
        <Link to="/admin" className="admin-access-icon" title="Administration">
            <Settings size={24} />
        </Link>
    );
};
