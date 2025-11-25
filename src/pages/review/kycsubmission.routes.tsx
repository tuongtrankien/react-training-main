import { RouteObject } from "react-router";
import KycSubmission from "./KycSubmission";
import ProtectedRoute from "../../shared/ProtectedRoute";

const KycSubmissionRoutes: RouteObject[] = [
    {
        path: 'review',
        element: (
            <ProtectedRoute requiredRole={['admin']}>
                <KycSubmission />
            </ProtectedRoute>
        )
    }
]

export default KycSubmissionRoutes; 