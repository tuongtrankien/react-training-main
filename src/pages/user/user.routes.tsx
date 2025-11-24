import {RouteObject} from "react-router";
import UserKYC from "./kyc/kyc";
import User from "./user";
import Profile from "./profile/profile";

const userRoutes: RouteObject[] = [
    {
        path: 'user',
        element: <User/>,
        children: [
            {
                path: ':id/pi',
                element: <Profile />
            },
            {
                path: ':id/kyc',
                element: <UserKYC></UserKYC>
            }
        ]
    }
]

export default userRoutes;