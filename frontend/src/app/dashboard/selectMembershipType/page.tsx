//auth/selectMembershipType
"use client";

import { MembershipTypes } from "@/components/membershipTypes/membershipTypes";
import { useMemberships } from "@/components/providers/MembershipContext";

export default function SelectMembershipPage() {
  const { memberships } = useMemberships();

  return (
    <main className="flex flex-col  w-full items-center justify-center bg-gradient-to-b from-[#FFFFFF] via-[#CDEDF5] to-[#C1E9F2] ">
      {memberships && <MembershipTypes memberships={memberships} />}
    </main>
  );
}
