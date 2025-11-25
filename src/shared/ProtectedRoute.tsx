import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AuthenticatedContext } from './Authenticated';
import { AuthPath } from './Constants';

interface ProtectedRouteProps {
    children: React.ReactElement;
    requiredRole?: string[];
    requireOwnProfile?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole, requireOwnProfile }) => {
    const { user } = useContext(AuthenticatedContext);
    const params = useParams();
    const { id } = params;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user !== undefined) {
            setIsLoading(false);
        }
    }, [user]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to={`/pages/${AuthPath.LOGIN}`} replace />;
    }

    if (requiredRole && requiredRole.length > 0) {
        if (!requiredRole.includes(user.role)) {
            return <Navigate to="/pages/home" replace />;
        }
    }

    if (requireOwnProfile && id) {
        const isAdmin = user.role === 'admin';
        const isOwnProfile = user.id === parseInt(id, 10);
        
        if (!isAdmin && !isOwnProfile) {
            return <Navigate to="/pages/home" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
