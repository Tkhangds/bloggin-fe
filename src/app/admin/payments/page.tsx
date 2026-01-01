"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdmin } from "@/hooks/apis/useAdmin";
import { GetUserPaymentAdminResponseDto } from "@/types/dtos/get-user-payment-admin-response.dto";
import { formatDateFromISOString } from "@/utils/date-convert";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PaymentsPage() {
  const { data: payments, isFetched } = useAdmin().useGetAllUserPaymentsAdmin();
  const router = useRouter();

  const handleRouting = (url: string) => {
    router.push(url);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <main className="flex w-full flex-col gap-4 p-8">
      {/* Header */}
      <section>
        <h1 className="mb-2 text-3xl font-bold text-primary">
          Payment Management
        </h1>
        <p className="text-muted-foreground">
          View and manage all user payment transactions
        </p>
      </section>

      {/* Payments Table Section */}
      <section className="mt-5">
        <Table>
          {/* table headers */}
          <TableHeader>
            <TableRow className="border-gray-200">
              <TableHead className="font-medium text-primary">User</TableHead>
              <TableHead className="font-medium text-primary">
                SePay ID
              </TableHead>
              <TableHead className="font-medium text-primary">Amount</TableHead>
              <TableHead className="font-medium text-primary">
                Gateway
              </TableHead>
              <TableHead className="font-medium text-primary">
                Account Number
              </TableHead>
              <TableHead className="font-medium text-primary">Date</TableHead>
            </TableRow>
          </TableHeader>

          {/* table body */}
          <TableBody>
            {isFetched && payments?.length === 0 && (
              <TableRow>
                <TableCell className="w-full py-3 text-center" colSpan={6}>
                  <span className="italic text-muted-foreground">
                    No payment transactions found yet
                  </span>
                </TableCell>
              </TableRow>
            )}
            {isFetched &&
              payments?.length !== 0 &&
              payments?.map((payment: GetUserPaymentAdminResponseDto) => {
                return (
                  <TableRow
                    key={payment.id}
                    className="border-muted hover:bg-muted/50"
                  >
                    <TableCell className="group cursor-pointer py-4">
                      <button
                        onClick={() =>
                          handleRouting(`/profile/${payment.userId}`)
                        }
                        className="flex items-center space-x-2"
                      >
                        <Avatar className="h-6 w-6 border border-border">
                          <AvatarImage
                            src={`https://api.dicebear.com/9.x/initials/svg?seed=${payment.user.username}`}
                            alt={payment.user.username}
                          />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {payment.user.username
                              .substring(0, 2)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start">
                          <span className="text-sm font-medium text-gray-900 group-hover:underline group-hover:underline-offset-2">
                            {payment.user.username}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {payment.user.email}
                          </span>
                        </div>
                      </button>
                    </TableCell>

                    <TableCell className="py-4">{payment.sepayId}</TableCell>

                    <TableCell className="py-4">
                      <div className="flex items-center font-semibold text-green-600">
                        {formatAmount(payment.amount)}
                      </div>
                    </TableCell>

                    <TableCell className="py-4">{payment.gateway}</TableCell>

                    <TableCell className="py-4">
                      <span className="font-mono text-sm text-gray-700">
                        {payment.accountNumber}
                      </span>
                    </TableCell>

                    <TableCell className="py-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="mr-1 h-3 w-3" />
                        {formatDateFromISOString(
                          payment.transactionDate.toString(),
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
