"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { usePayment } from "@/hooks/apis/usePayment";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const PAYMENT_ACCOUNT = "96247DEMOBLOGGIN";
const ACCOUNT_OWNER = "N.T.D.KHOA";
const BANK = "BIDV";
const PAYMENT_AMOUNT = 10000;

export default function PaymentPage() {
  const [createPendingFirstTime, setCreatePendingFirstTime] = useState(false);

  const {
    data: userPayment,
    refetch: refetchUserPayment,
    isSuccess: isSuccessUserPayment,
  } = usePayment().useGetUserPayment();

  const {
    data: pendingPayment,
    isLoading,
    isSuccess: isSuccessPendingPayment,
    refetch: refetchPendingPayment,
  } = usePayment().useGetPendingPayment();

  const createPendingPaymentAction = usePayment().useCreatePendingPayment();

  const handleCreatePendingPayment = async () => {
    await createPendingPaymentAction.mutateAsync();
  };

  let interval: NodeJS.Timeout;
  useEffect(() => {
    if (isSuccessUserPayment && !userPayment?.id) {
      interval = setInterval(() => {
        console.log("Refetching user payment...");
        refetchUserPayment();
        refetchPendingPayment();
      }, 5000);
    }

    if (userPayment?.id) clearInterval(interval);

    return () => {
      clearInterval(interval);
    };
  }, [isSuccessUserPayment, userPayment?.id]);

  console.log("user payment:", userPayment?.id);

  useEffect(() => {
    if (
      isSuccessPendingPayment &&
      !pendingPayment?.paymentId &&
      !userPayment?.id &&
      !createPendingFirstTime
    ) {
      handleCreatePendingPayment();
      setCreatePendingFirstTime(true);
      console.log("Create pending first time ran");
    }
  }, [isSuccessPendingPayment, pendingPayment?.paymentId, userPayment?.id]);

  if (userPayment?.id) {
    return <PaymentSuccessSection />;
  }

  return (
    <div className="flex justify-center gap-10 px-20 py-10">
      <section className="flex flex-col gap-3">
        <p className="text-center font-semibold">
          Scan this QR code to make a payment
        </p>
        {isLoading && (
          <QrFallback>
            <Loader2 className="animate-spin" />
          </QrFallback>
        )}
        {isSuccessPendingPayment && !pendingPayment?.paymentId && (
          <QrFallback className="flex-col gap-3">
            <CardDescription>Your QR code has been expired</CardDescription>

            <Button size={"sm"} onClick={handleCreatePendingPayment}>
              Refresh
            </Button>
          </QrFallback>
        )}
        {isSuccessPendingPayment && pendingPayment.paymentId && (
          <>
            <Image
              src={`https://qr.sepay.vn/img?acc=${PAYMENT_ACCOUNT}&bank=${BANK}&amount=${PAYMENT_AMOUNT}&des=${pendingPayment.paymentId}|${pendingPayment.userId}`}
              width={300}
              height={300}
              alt="QR Code"
            />
            <p className="text-md text-center text-sm text-muted-foreground">
              QR code expires in: {(pendingPayment.ttl / 60).toFixed(0)} min
            </p>
          </>
        )}
      </section>
      <section className="flex w-full max-w-2xl flex-col gap-3 xl:max-w-4xl">
        <p className="font-semibold">Payment details</p>
        <Card>
          <CardHeader>
            <Image
              src={"/image/Logo_BIDV.png"}
              width={100}
              height={50}
              alt="BIDV Logo"
            />
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="grid grid-cols-3 justify-between">
              <span>Bank:</span>
              <span className="col-start-3 place-self-end">{BANK}</span>
            </div>
            <Separator />
            <div className="grid grid-cols-3 justify-between">
              <span>Account Owner:</span>
              <span className="col-start-3 place-self-end">
                {ACCOUNT_OWNER}
              </span>
            </div>
            <Separator />

            <div className="grid grid-cols-3 justify-between">
              <span>Account Number:</span>
              <span className="col-start-3 place-self-end">
                {PAYMENT_ACCOUNT}
              </span>
            </div>
            <Separator />
            <div className="grid grid-cols-3 justify-between">
              <span>Transfering Total:</span>
              <span className="col-start-3 place-self-end">
                {PAYMENT_AMOUNT} VND
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex gap-1">
              <span className="text-red-500">*</span>
              <p className="text-sm text-muted-foreground">
                Please do NOT make changes to the content of the transfer.
                Otherwise, transaction may not proceed as expected, and you
                might lose your deposit.
              </p>
            </div>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}

const QrFallback = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <Card
      className={twMerge(
        `flex h-[300px] w-[300px] items-center justify-center`,
        className,
      )}
    >
      {children}
    </Card>
  );
};

const PaymentSuccessSection = () => {
  return (
    <main className="flex justify-center bg-background px-4 py-20">
      <div className="flex flex-col items-center text-center">
        <div className="mb-8 duration-500 animate-in fade-in">
          <Image
            src="/image/Purple-diamond.jpg"
            alt="Brand logo"
            width={100}
            height={100}
            className="object-contain"
            priority
          />
        </div>

        {/* Heading */}
        <h1 className="mb-6 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text py-2 text-5xl font-semibold tracking-tight text-transparent delay-100 duration-700 animate-in fade-in md:text-6xl">
          Congrats!
        </h1>

        {/* Subheading */}
        <div className="mb-12 flex flex-col gap-2 text-lg font-light text-muted-foreground delay-200 duration-700 animate-in fade-in md:text-xl">
          <span>Your account has been promoted to Pro</span>
          <span>You can now access all of our features.</span>
        </div>

        {/* CTA Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-sm bg-foreground px-8 py-3 text-base font-light text-background transition-colors delay-300 animate-in fade-in hover:bg-foreground/90"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
};
