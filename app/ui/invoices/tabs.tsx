"use client";

import { useRouter, useSearchParams } from "next/navigation";

function Tabs() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabs = ["all", "paid", "pending", "overdue", "canceled"];
  const status = searchParams.get("status");
  const activeTab = !!status && tabs.includes(status) ? status : tabs[0];

  function reloadRoute(status: string) {
    const newSearchParams = new URLSearchParams([
      ...Array.from(searchParams.entries().filter(([key]) => key !== "status")),
      ...Object.entries({ status }),
    ] as any).toString();

    router.replace(`/dashboard/invoices?${newSearchParams}`);
  }

  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <button
          onClick={() => reloadRoute(tab)}
          key={tab}
          disabled={activeTab === tab}
          className="px-2 py-0.5 capitalize text-sm border border-gray-300 hover:bg-gray-100 disabled:bg-green-500 disabled:text-white rounded"
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
