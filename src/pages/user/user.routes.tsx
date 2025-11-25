import {RouteObject} from "react-router";
import UserKYC from "./kyc/kyc";
import User from "./user";
import Profile from "./profile/profile";
import ProtectedRoute from "../../shared/ProtectedRoute";

const userRoutes: RouteObject[] = [
    {
        path: 'user',
        element: <User />,
        children: [
            {
                path: ':id/pi',
                element: (
                <ProtectedRoute requireOwnProfile>
                    <Profile />
                </ProtectedRoute>
                )
            },
            {
                path: ':id/kyc',
                element: (
                <ProtectedRoute requireOwnProfile>
                    <UserKYC></UserKYC>
                </ProtectedRoute>
                )
            }
        ]
    }
]

export default userRoutes;