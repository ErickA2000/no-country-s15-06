import { getProfile } from "@/actions/auth/get-profile";
import React from "react";
import ConfigAccountForm from "./AccountForm/ConfigAccountForm";

type Props = {};

export async function ConfigAccount({}: Props) {
  const { ok, message, data } = await getProfile();
  if (!ok) {
    console.error(message);
    return;
  }

  return (
    <>
      <div className="text-primary-400 font-semibold text-xl p-5">
        <h2>Configuración de la cuenta</h2>
      </div>
      {data && <ConfigAccountForm data={data} />}
    </>
  );
}
