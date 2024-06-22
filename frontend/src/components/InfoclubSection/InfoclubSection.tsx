import React from "react";
import { InfoclubCards } from "./InfoclubCards/InfoclubCards";
import { data } from "./Infoclub.helpers";

export function InfoclubSection() {
  return (
    <section className="md:w-1/3 md:max-w-xs">
      <h2 className="text-2xl font-medium font-poppins text-primary-400-D py-4 hidden md:block">
        Información del Club
      </h2>
      <InfoclubCards data={data} />
    </section>
  );
}
