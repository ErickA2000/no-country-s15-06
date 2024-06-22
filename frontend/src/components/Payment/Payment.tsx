"use client";

import React, { useEffect, useState } from "react";
import { Button, Image, Link } from "@nextui-org/react";
import { PaymentButtons, PaymentCard } from "./PaymentCards";
import { useSearchParams } from "next/navigation";
import { getOneMemberShipTypes } from "@/actions";
import {
  IPaymentTypeIds,
  IPaymentTypeInfo,
} from "@/interfaces/payment.interface";
import PaymentError from "./PaymentCards/PaymentError";

type Props = {};

export function Payment({}: Props) {
  const searchParams = useSearchParams();

  const [error, setError] = useState("");
  const [idError, setIdError] = useState(false);
  const [membershipDataIds, setMembershipDataIds] =
    useState<IPaymentTypeIds | null>(null);
  const [membershipDataInfo, setMembershipDataInfo] =
    useState<IPaymentTypeInfo | null>(null);

  useEffect(() => {
    setIdError(false);
    const id = searchParams.get("id");
    if (!id) {
      setError("Membresia no disponible");
      return;
    }

    const fetchData = async () => {
      try {
        const { membershipDataIds, membershipDataInfo } =
          await getOneMemberShipTypes(id);
        if (!membershipDataIds || !membershipDataInfo) {
          setError("membresia no disponibles");
          setIdError(true);
          return;
        }

        setMembershipDataIds(membershipDataIds);
        setMembershipDataInfo(membershipDataInfo);
      } catch (err) {
        setError(`${err}`);
        setIdError(true);
        return;
      }
    };
    fetchData();
  }, [searchParams]);

  if (idError && (!membershipDataIds || !membershipDataInfo)) {
    return <PaymentError />;
  }

  const handleClose = () => {
    setError("");
  };

  return (
    <>
      {error.length === 0 ? null : (
        <div className="bg-red-500/90 w-full rounded-b-lg absolute top-0 right-0 z-20 text-center text-white py-2">
          <Button color="primary" variant="light" onPress={() => handleClose()}>
            X
          </Button>
          {error}
          <Link
            href={"/"}
            className="right-10 top-0 bottom-0 absolute text-xs underline"
          >
            Volver al inicio
          </Link>
        </div>
      )}
      <section className="bg-white p-4 rounded-2xl w-[343px] border-1 border-solid-gray relative lg:w-full lg:grid lg:grid-col-2 mb-72 md:mb-0">
        <article className="flex justify-center lg:hidden lg:ms-14 mb-3">
          <Image
            src="/images/logoBanner.svg"
            alt="Santa Ana Club Logo"
            width={250}
            height={93}
          />
        </article>
        <article className="mx-auto lg:col-start-2 max-w-450px py-5 lg:mt-5">
          {membershipDataInfo && (
            <PaymentCard membershipData={membershipDataInfo} />
          )}
        </article>
        <article className="mx-auto absolute lg:static col-star-1 row-start-1">
          <Image
            src="/images/logoBanner.svg"
            alt="Santa Ana Club Logo"
            width={250}
            height={93}
            className="hidden lg:block mb-8"
          />
          {membershipDataIds && (
            <PaymentButtons membershipData={membershipDataIds} />
          )}
        </article>
      </section>
    </>
  );
}
