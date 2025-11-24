import { RouteObject } from "react-router";
import KycSubmission from "./KycSubmission";

const KycSubmissionRoutes: RouteObject[] = [
    {
        path: 'review',
        element: <KycSubmission />
    }
]

export default KycSubmissionRoutes; 