import { updateInvoiceStatus } from "@/app/lib/actions";
import { UpdateInvoiceStatus } from "./buttons";
import { cn } from "@/app/lib/utils";

function DropdownMenu({
  id,
  isOpen,
  currentStatus,
}: {
  id: string;
  isOpen: boolean;
  currentStatus: string;
}) {
  const statuses = ["pending", "paid", "canceled"];

  return (
    <div
      className={cn(
        "absolute z-[9999] flex flex-col divide-y-2 gap-2 bg-white text-gray-900 border border-gray-400 rounded-md p-2 bottom-8",
        !isOpen && "hidden"
      )}
    >
      {statuses.map((status) => (
        <UpdateInvoiceStatus
          key={status}
          disabled={currentStatus === status}
          id={id}
          status={status}
          prevStatus={currentStatus}
        />
      ))}
    </div>
  );
}

export function InvoiceStatusForm({
  id,
  status,
  prevStatus,
}: {
  id: string;
  status: string;
  prevStatus: string;
}) {
  const updateInvoiceStatusWithId = updateInvoiceStatus.bind(
    null,
    id,
    status,
    prevStatus
  );

  return (
    <form action={updateInvoiceStatusWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        {status}
      </button>
    </form>
  );
}

export default DropdownMenu;
