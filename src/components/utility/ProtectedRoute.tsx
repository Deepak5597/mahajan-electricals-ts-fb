import { FC } from "react";
import { Outlet, Navigate, useLocation } from 'react-router-dom';

import useAuth from '../../global/hooks/useAuth';

interface IProtectedRouteParams {
    allowedRoles: string[]
}

const ProtectedRoute: FC<IProtectedRouteParams> = ({ allowedRoles }: IProtectedRouteParams) => {
    let { auth, isLoggedIn } = useAuth();
    const location: any = useLocation();
    return (
        isLoggedIn ? (
            auth && allowedRoles.includes(auth.role) ? < Outlet /> : <Navigate to="/unauthorise" state={{ from: location }} replace />
        ) : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default ProtectedRoute;
