import KycSubmissionTable, { KycRecord } from "./components/KycSubmissionTable";

const KycSubmission = () => {
    return (
        <div>
            <KycSubmissionTable 
                rows={demoData}  />
        </div>
    );
}

export default KycSubmission;

export const demoData: KycRecord[] = [
  { id: "1", name: "John Doe", status: "Active", dateISO: "2024-12-01" },
  { id: "2", name: "Jane Smith", status: "Active", dateISO: "2024-12-05" },
  { id: "3", name: "Michael Johnson", status: "Pending", dateISO: "2024-11-20" },
  { id: "4", name: "Michael Johnson", status: "Inactive", dateISO: "2024-11-20" },
];