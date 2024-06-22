// src/components/providers/MembershipContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getMemberShipTypes } from "@/actions/membership/membership-type";
import { IMemberShipType } from "@/interfaces/memberShipType.interface";

interface MembershipContextType {
  memberships: IMemberShipType[] | null;
  setMemberships: React.Dispatch<
    React.SetStateAction<IMemberShipType[] | null>
  >;
}

const MembershipContext = createContext<MembershipContextType | undefined>(
  undefined
);

export const MembershipProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [memberships, setMemberships] = useState<IMemberShipType[] | null>(
    null
  );

  useEffect(() => {
    const fetchMemberships = async () => {
      const { membershipTypes } = await getMemberShipTypes();

      setMemberships(membershipTypes);
    };

    fetchMemberships();
  }, []);

  return (
    <MembershipContext.Provider value={{ memberships, setMemberships }}>
      {children}
    </MembershipContext.Provider>
  );
};

export const useMemberships = () => {
  const context = useContext(MembershipContext);
  if (!context) {
    throw new Error("useMemberships must be used within a MembershipProvider");
  }
  return context;
};
