import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import {
  fetchInvoiceById,
  fetchCustomers,
  fetchAuditLogs,
} from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { UpdateInvoiceStatus } from "@/app/ui/invoices/buttons";

export const metadata: Metadata = {
  title: "Edit Invoice",
};

export default async function Page({ params }: { params: { id: string } }) {
  const invoiceId = params.id;
  const [invoice, customers, auditLogs] = await Promise.all([
    fetchInvoiceById(invoiceId),
    fetchCustomers(),
    fetchAuditLogs(invoiceId),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${invoiceId}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />

      <div className="pt-6">
        {auditLogs.map((log) => (
          <div className="flex justify-between items-center w-fit gap-4">
            <div>
              {log.createdAt.toUTCString()}: changed status from{" "}
              <span className="bg-blue-400 text-white rounded-full px-2 py-1 text-sm">
                {log.previousStatus}
              </span>{" "}
              to{" "}
              <span className="bg-blue-400 text-white rounded-full px-2 py-1 text-sm">
                {log.currentStatus}
              </span>
            </div>
            <UpdateInvoiceStatus
              id={invoiceId}
              status={log.previousStatus}
              prevStatus={log.currentStatus}
              text="restore"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
