import React from "react";
import { Button, Image } from "@nextui-org/react";
import { IProfileDataDetail } from "@/interfaces/accountProfile";
import AccountForms from "./AccountForms";

type AccountFormProps = {
  data: IProfileDataDetail;
};

function ConfigAccountForm({ data }: AccountFormProps) {
  return (
    <>
      <article className="flex flex-col md:flex-row items-center md:items-start">
        <div className="flex flex-col gap-4 items-center md:w-32 md:m-8">
          <Image
            radius="full"
            width={160}
            src="https://i.pravatar.cc/300?u=a04258114e29026302d"
            alt="Avatar Image config"
          />
          <p className="text-gray-medium cursor-pointer font-inter font-normal text-sm text-nowrap">
            Cambiar foto de perfil
          </p>
        </div>
        <AccountForms data={data} />
      </article>
    </>
  );
}

export default ConfigAccountForm;
