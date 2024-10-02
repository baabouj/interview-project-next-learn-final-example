"use client";

import { useState } from "react";

import { CheckIcon, ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/app/lib/utils";
import DropdownMenu from "./dropdown-menu";

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default function InvoiceStatus({
  id,
  status,
  date,
}: {
  id: string;
  status: string;
  date: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const isOverdue = addDays(new Date(date), 14).getTime() < Date.now();
  return (
    <span
      role="button"
      className={cn(
        "relative inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-gray-100 text-gray-500": status === "pending",
          "bg-green-500 text-white": status === "paid",
          "bg-red-500 text-white": status === "canceled",
        }
      )}
      onClick={() => setIsOpen(!isOpen)}
    >
      {status === "pending" &&
        (isOverdue ? (
          <>Overdue</>
        ) : (
          <>
            Pending
            <ClockIcon className="ml-1 w-4 text-gray-500" />
          </>
        ))}

      {status === "canceled" && (
        <>
          Canceled
          <XMarkIcon className="ml-1 w-4 text-white" />
        </>
      )}

      {status === "paid" && (
        <>
          Paid
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      )}
      <DropdownMenu isOpen={isOpen} currentStatus={status} id={id} />
    </span>
  );
}
