import { Button } from "@nextui-org/react";
import React from "react";

type ButtonFormProps = {
  children: React.ReactNode;
  fnForm: () => void;
  danger?: boolean;
};

function ButtonForm({ children, fnForm, danger }: ButtonFormProps) {
  return (
    <Button
      size="lg"
      variant="bordered"
      color={danger ? "danger" : "primary"}
      radius="lg"
      className={`bg-white ${!danger && "border-primary-400"}`}
      onPress={() => fnForm()}
    >
      {children}
    </Button>
  );
}

export default ButtonForm;
