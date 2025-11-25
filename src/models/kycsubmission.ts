export type KycStatus = "Active" | "Pending" | "Inactive";

export type KycRecord = {
    id: string;
    userId: number;
    fullName: string;
    status: KycStatus;
    submittedAt: string; // ISO date string
    reviewedAt?: string; // ISO date string or null
}