import { SuccessComponent } from "@/components";
import React from "react";

interface PaypalProps {
  searchParams: {
    subscription_id: string;
    ba_token: string;
    token: string;
  };
}

export default async function page({ searchParams }: PaypalProps) {
  const { subscription_id, ba_token, token } = searchParams;

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/payments/capture/paypal?subscription_id=${subscription_id}&ba_token=${ba_token}&token=${token}`
  );

  const rta = await response.json();

  return (
    <main className="flex min-h-screen flex-col items-center md:justify-between pb-20 pt-10 md:p-10 bg-custom-gradient">
      <SuccessComponent success={rta.success} message={rta.message} />
    </main>
  );
}

