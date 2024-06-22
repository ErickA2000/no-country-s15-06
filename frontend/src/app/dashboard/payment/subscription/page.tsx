import { Payment } from "@/components";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <main className="flex min-h-screen flex-col items-center md:justify-between pb-20 pt-10 md:p-10 bg-custom-gradient">
      <Payment />
    </main>
  );
}
