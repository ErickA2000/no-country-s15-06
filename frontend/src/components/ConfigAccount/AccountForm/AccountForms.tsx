"use client";
import React, { useState } from "react";
import { IProfileDataDetail } from "@/interfaces/accountProfile";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import ButtonForm from "@/components/ui/buttonForm/ButtonForm";
import { useForm } from "react-hook-form";
import { cancelSubscription } from "@/actions";

type AccountFormProps = {
  data: IProfileDataDetail;
};

type DataFormProps = {
  account: {
    email: string;
    username: string;
  };
};

function AccountForms({ data }: AccountFormProps) {
  const [changeData, setChangeData] = useState(false);

  //parametros de estilos para los inputs
  const styles = {
    label: ["!text-primary-300", "md:!text-[#232323]"],
    input: [
      "bg-transparent",
      "text-[#718EBF]",
      "placeholder:text-[#718EBF]",
      `${!changeData && "!cursor-default"}`,
      "w-72",
      "md:w-96",
    ],
    innerWrapper: "bg-transparent",
    inputWrapper: [
      "bg-white",
      "hover:bg-default-200/30",
      "group-data-[focus=true]:bg-default-100/30",
      `${changeData ? "!cursor-text" : "!cursor-default"}`,
      "border-transparent",
      "md:border-[#DFEAF2]/80",
      "group-data-[focus=true]:border-[#718EBF]",
      "mb-6",
    ],
  };
  //arreglo de los datos para los campos de los inputs
  const dataInputs = [
    {
      hookForm: "{...register('name')}",
      label: "Nombre",
      type: "name",
      placeholder: "Name",
      defaultValue: data.firstName,
      isReadOnly: !changeData,
    },
    {
      hookForm: "{...register('lastName')}",
      label: "Apellido",
      type: "name",
      placeholder: "Last Name",
      defaultValue: data.lastName,
      isReadOnly: !changeData,
    },
    {
      hookForm: "{...register('address')}",
      label: "Dirección",
      type: "address",
      placeholder: "Address",
      defaultValue: data.address,
      isReadOnly: !changeData,
    },
    {
      hookForm: null,
      label: "Documento",
      type: "text",
      placeholder: "Document",
      defaultValue: data.dni,
      isReadOnly: true,
    },
    {
      hookForm: null,
      label: "Código Postal",
      type: "number",
      placeholder: "Zip Code",
      defaultValue: "45692",
      isReadOnly: true,
    },
  ];

  const router = useRouter();
  const handleChangeMembership = () => {
    router.push("/dashboard/selectMembershipType");
  };

  //manejo de formulario con react hook form
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isDirty, dirtyFields },
  } = useForm<DataFormProps>({
    defaultValues: {
      account: {
        email: data.account.email,
        username: data.account.username,
      },
    },
  });

  const handleChangeData = () => {
    setChangeData(!changeData);
  };

  const [originalDataForm, setOriginalDataForm] = useState<DataFormProps>(
    getValues()
  );

  const onSubmit = (formData: DataFormProps) => {
    console.log("datos enviados: ", formData);
    handleChangeData();
  };

  const handleCancel = () => {
    handleChangeData();
    const originalValues = originalDataForm;

    setValue("account.email", originalValues.account.email);
    setValue("account.username", originalValues.account.username);
  };

  const handleCancelSubscription = async () => {
    const rta = await cancelSubscription()
    // console.log(rta)
  }

  return (
    <div className="bg-transparent md:bg-white/80 md:shadow-custom p-7 rounded-3xl grid gap-6 md:grid-cols-2 mt-3">
      <form>
        {dataInputs.map((dataInput, index) => (
          <Input
            key={index}
            label={dataInput.label}
            type={dataInput.type}
            labelPlacement="outside"
            placeholder={dataInput.placeholder}
            variant="bordered"
            size="lg"
            defaultValue={dataInput.defaultValue}
            isReadOnly={dataInput.isReadOnly}
            classNames={styles}
          />
        ))}
      </form>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("account.username")}
          label="Nombre de usuario"
          type="name"
          labelPlacement="outside"
          placeholder="Username..."
          variant="bordered"
          size="lg"
          isReadOnly={!changeData}
          classNames={styles}
        />
        <Input
          {...register("account.email")}
          label="Email"
          type="email"
          labelPlacement="outside"
          placeholder="Email..."
          variant="bordered"
          size="lg"
          isReadOnly={!changeData}
          classNames={styles}
        />
        <Input
          label="Contraseña"
          type="password"
          labelPlacement="outside"
          placeholder="Password"
          variant="bordered"
          size="lg"
          defaultValue="123456789"
          isReadOnly
          classNames={styles}
        />
        <div className="md:flex md:items-end text-primary-400 md:mt-6">
          {changeData ? (
            <ButtonForm fnForm={handleCancel} danger={changeData}>
              Cancelar cambios
            </ButtonForm>
          ) : (
            <ButtonForm fnForm={handleChangeData} danger={changeData}>
              Modificar mis datos
            </ButtonForm>
          )}
        </div>
        <div className="md:flex md:items-center text-primary-400 gap-4  my-5 md:my-10">
          {changeData ? (
            <Button color="primary" type="submit" variant="faded" size="lg">
              Guardar Cambios
            </Button>
          ) : (
            <ButtonForm fnForm={handleChangeMembership}>
              Cambiar membresía
            </ButtonForm>
          )}
          <ButtonForm danger={true} fnForm={handleCancelSubscription}>
            Cancelar membresía
          </ButtonForm>
        </div>
      </form>
    </div>
  );
}

export default AccountForms;
