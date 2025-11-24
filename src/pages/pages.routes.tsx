import HomeComponent from "./home/HomeComponent";
import userRoutes from "./user/user.routes";
import Pages from "./pages";
import authRoutes from "./auth/auth.routes";
import KycSubmissionRoutes from "./review/kycsubmission.routes";


const pageRoutes = [
    {
        path: 'pages',
        element: <Pages/>,
        children: [
            {
                path: 'home',
                element: <HomeComponent/>
            },
            ...authRoutes,
            ...userRoutes,
            ...KycSubmissionRoutes,
        ]
    },

]

export default pageRoutes;