// BenefitsSection.tsx
import React from "react";
import { BenefitsCard } from "./BenefitsCard";

type Props = {};

export const BenefitsSection = (props: Props) => {
  return (
    <section className='min-h-[50vh] my-6'>
      <h2 className='text-3xl font-bold pb-4 text-center'>Beneficios</h2>
      <article className='grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4'>

        <BenefitsCard
          icon={<span>🎉</span>} // use a text icon instead of SVG
          benefit={{
            title: "Eventos Exclusivos",
            description:
              "Acceso a eventos privados y actividades especiales solo para miembros.",
          }}
        />
        <BenefitsCard
          icon={<span>👪</span>} // use a text icon instead of SVG
          benefit={{
            title: "Club Familiar",
            description:
              "Un espacio diseñado para disfrutar con toda la familia, con actividades y servicios para todas las edades.",
          }}
        />
        <BenefitsCard
          icon={<span>💼</span>} // use a text icon instead of SVG
          benefit={{
            title: "Instalaciones Premium",
            description:
              "Disfruta de instalaciones de alta calidad, equipadas con la última tecnología y comodidad.",
          }}
        />
        <BenefitsCard
          icon={<span>🎁</span>} // use a text icon instead of SVG
          benefit={{
            title: "Descuentos Especiales",
            description:
              "Aprovecha ofertas y promociones exclusivas en productos y servicios seleccionados.",
          }}
        />
      </article>
    </section>
  );
};
