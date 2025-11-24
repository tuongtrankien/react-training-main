import React, { useMemo, useState } from "react";
import { formatISODate } from "../../../utils/date";

export type KycStatus = "Active" | "Pending" | "Inactive";

export type KycRecord = {
  id: string;
  name: string;
  status: KycStatus;
  dateISO: string;
};

type KycSubmissionTableProps = {
  title?: string;
  rows: KycRecord[];
  pageSize?: number;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Status pill */
function StatusBadge({ status }: { status: KycStatus }) {
  const map = {
    Active: {
      text: "Active",
      cls: "bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-200",
    },
    Pending: {
      text: "Pending",
      cls: "bg-yellow-100 text-yellow-800 ring-1 ring-inset ring-yellow-200",
    },
    Inactive: {
      text: "Inactive",
      cls: "bg-rose-100 text-rose-700 ring-1 ring-inset ring-rose-200",
    },
  } as const;

  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
        map[status].cls
      )}
      aria-label={`Status: ${map[status].text}`}
    >
      {map[status].text}
    </span>
  );
}

/** Approve / Reject actions */
function ActionButtons({
  id,
  onApprove,
  onReject,
}: {
  id: string;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}) {
  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => onApprove?.(id)}
        className={cx(
          "rounded-lg border px-4 py-2 text-sm font-semibold",
          "border-emerald-300 text-emerald-700 hover:bg-emerald-50",
          "focus:outline-none focus:ring-2 focus:ring-emerald-400"
        )}
      >
        Approve
      </button>
      <button
        type="button"
        onClick={() => onReject?.(id)}
        className={cx(
          "rounded-lg border px-4 py-2 text-sm font-semibold",
          "border-rose-300 text-rose-700 hover:bg-rose-50",
          "focus:outline-none focus:ring-2 focus:ring-rose-400"
        )}
      >
        Reject
      </button>
    </div>
  );
}

function Pagination({
  page,
  pageCount,
  onPageChange,
}: {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}) {
  if (pageCount <= 1) return null;

  const go = (p: number) => {
    const np = Math.max(1, Math.min(pageCount, p));
    if (np !== page) onPageChange(np);
  };

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className="mt-6 flex items-center justify-end">
      <div className="flex items-center gap-1 rounded-xl border bg-white px-2 py-1">
        <button
          className="px-3 py-2 text-sm text-slate-600 disabled:opacity-40"
          disabled={page === 1}
          onClick={() => go(page - 1)}
        >
          Previous
        </button>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => go(p)}
            className={cx(
              "min-w-9 rounded-md px-3 py-2 text-sm",
              p === page
                ? "bg-sky-100 text-sky-700"
                : "text-slate-700 hover:bg-slate-50"
            )}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </button>
        ))}
        <button
          className="px-3 py-2 text-sm text-slate-600 disabled:opacity-40"
          disabled={page === pageCount}
          onClick={() => go(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default function KycSubmissionTable({
  title = "KYC Submission",
  rows,
  pageSize = 4,
  onApprove,
  onReject,
}: KycSubmissionTableProps) {
  const [page, setPage] = useState(1);

  const { pageCount, pageRows } = useMemo(() => {
    const count = Math.max(1, Math.ceil(rows.length / pageSize));
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return { pageCount: count, pageRows: rows.slice(start, end) };
  }, [rows, page, pageSize]);

  React.useEffect(() => {
    const count = Math.max(1, Math.ceil(rows.length / pageSize));
    if (page > count) setPage(count);
  }, [rows.length, pageSize]);

  return (
    <section className="w-full">
      <h2 className="mb-4 text-2xl font-semibold text-slate-900">{title}</h2>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full table-fixed">
          <thead className="bg-slate-50">
            <tr className="text-left text-sm text-slate-600">
              <th className="w-[40%] px-6 py-4 font-medium">Name</th>
              <th className="w-[20%] px-6 py-4 font-medium">Status</th>
              <th className="w-[20%] px-6 py-4 font-medium">Date</th>
              <th className="w-[20%] px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {pageRows.map((r) => (
              <tr
                key={r.id}
                className={cx(
                  "text-sm hover:bg-slate-50",
                  r.status === "Pending" && "bg-yellow-50/40"
                )}
              >
                <td className="px-6 py-5">
                  <span className="text-slate-800">{r.name}</span>
                </td>
                <td className="px-6 py-5">
                  <StatusBadge status={r.status} />
                </td>
                <td className="px-6 py-5">
                  <span className="text-slate-700">
                    {formatISODate(r.dateISO)}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <ActionButtons
                    id={r.id}
                    onApprove={(id) => {
                      onApprove?.(id);
                      if (!onApprove) console.log("Approved:", id);
                    }}
                    onReject={(id) => {
                      onReject?.(id);
                      if (!onReject) console.log("Rejected:", id);
                    }}
                  />
                </td>
              </tr>
            ))}

            {pageRows.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-10 text-center text-sm text-slate-500"
                >
                  No data
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="px-4 pb-4 pt-2">
          <Pagination
            page={page}
            pageCount={pageCount}
            onPageChange={setPage}
          />
        </div>
      </div>
    </section>
  );
}