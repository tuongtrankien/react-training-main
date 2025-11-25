import { useEffect, useState } from "react";
import KycSubmissionTable from "./components/KycSubmissionTable";
import { KycRecord, KycStatus } from "../../models/kycsubmission";
import Swal from "sweetalert2";

const KycSubmission = () => {
    const [data, setData] = useState<KycRecord[]>([]);

    const handleApprove = (id: string) => {
        console.log("Approved ID:", id);
        Swal.fire({
            icon: 'question',
            title: 'Approve KYC Submission',
            text: `Are you sure you want to approve this KYC submission?`,
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedData: KycRecord[] = data.map(record => 
                    record.id === id ? { ...record, status: "Active" as KycStatus, reviewedAt: new Date().toISOString() } : record
                );
                setData(updatedData);
                // Persist to localStorage
                localStorage.setItem("kycSubmissions", JSON.stringify(updatedData));
                Swal.fire('Approved!', 'The KYC submission has been approved.', 'success');
            }
        });
    };

    const handleReject = (id: string) => {
        console.log("Rejected ID:", id);
        Swal.fire({
            icon: 'warning',
            title: 'Reject KYC Submission',
            text: `Are you sure you want to reject this KYC submission?`,
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedData: KycRecord[] = data.map(record => 
                    record.id === id ? { ...record, status: "Inactive" as KycStatus, reviewedAt: new Date().toISOString() } : record
                );
                setData(updatedData);
                // Persist to localStorage
                localStorage.setItem("kycSubmissions", JSON.stringify(updatedData));
                Swal.fire('Rejected!', 'The KYC submission has been rejected.', 'success');
            }
        });
    };

    
    useEffect(() => {
        const kycSubmissions = localStorage.getItem("kycSubmissions");
        if (kycSubmissions) {
            setData(JSON.parse(kycSubmissions));
        }
    }, [])

    return (
        <div>
            <KycSubmissionTable 
                rows={data}
                onApprove={handleApprove}
                onReject={handleReject}  />
        </div>
    );
}

export default KycSubmission;

// export const demoData: KycRecord[] = [
//   { id: "1", name: "John Doe", status: "Active", dateISO: "2024-12-01" },
//   { id: "2", name: "Jane Smith", status: "Active", dateISO: "2024-12-05" },
//   { id: "3", name: "Michael Johnson", status: "Pending", dateISO: "2024-11-20" },
//   { id: "4", name: "Michael Johnson", status: "Inactive", dateISO: "2024-11-20" },
// ];