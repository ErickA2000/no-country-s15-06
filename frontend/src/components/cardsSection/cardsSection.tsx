"use client";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import React from "react";
import Carousel from "../Carousel/Carousel";
import { useMediaQuery } from "react-responsive";
import "./styles.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type CardData = {
  title: string;
  description: string;
  imageSrc: string;
};
const cardDataArray: CardData[] = [
  //Este array proximamnete puede sustituirse  para traer datos de la API del backend
  {
    title: "Fútbol",
    description:
      "En nuestro club, la pasión por el fútbol se vive en cada jugada. Nuestras modernas canchas te brindan el escenario perfecto para desplegar tu talento y vivir la emoción de este deporte junto a tus compañeros.",
    imageSrc: "/images/Football.svg",
  },
  {
    title: "Tenis",
    description:
      "Eleva tu juego a un nuevo nivel en nuestras impecables canchas de tenis. Recibe clases personalizadas de nuestros expertos profesores, quienes te guiarán en el camino hacia el dominio de este apasionante deporte. ",

    imageSrc: "/images/Tennis.svg",
  },
  {
    title: "Natación",
    description:
      "Perfecciona tu técnica en nuestras amplias piscinas. Ofrecemos clases de natación para todas las edades y niveles, desde principiantes que buscan aprender hasta nadadores experimentados que desean mejorar su rendimiento.",
    imageSrc: "/images/swimming.svg",
  },

  {
    title: "Básquet",
    description:
      "Clases de básquetbol diseñadas para todas las edades y niveles. Desde principiantes hasta jugadores experimentados, en nuestro club encontrarás el entrenamiento ideal para perfeccionar tus habilidades.",
    imageSrc: "/images/Basquetball.svg",
  },
  {
    title: "Gimnasio",
    description:
      "Alcanza tus objetivos fitness en nuestro gimnasio totalmente equipado con tecnología de última generación. Accede a planes personalizados de entrenamiento y asesoría nutricional diseñados por nuestros expertos.",
    imageSrc: "/images/gym.svg",
  },
  {
    title: "Actividades recreativas",
    description:
      "Desconecta del estrés y encuentra tu equilibrio con nuestras clases de yoga, pilates y baile. Estas actividades te ayudarán a mejorar tu flexibilidad, fortalecer tu cuerpo y conectarte con tu bienestar interior..",
    imageSrc: "/images/Activities.svg",
  },
];
const renderCard = (card: CardData) => (
  <Card
    key={card.title}
    className="p-6 shadow-custom flex-shrink-0 w-[343px] h-[493px] sm:w-full sm:h-full rounded-lg"
    isPressable={true}
  >
    <CardHeader className="flex flex-col items-center justify-center gap-y-4">
      <h2 className="text-perfect-blue font-poppins text-xl font-semibold leading-8 text-center">
        {card.title}
      </h2>
    </CardHeader>
    <CardBody className="flex flex-col items-center justify-center p-[4px] gap-[10px]">
      <p className="text-perfect-blue font-monserrat text-sm font-normal leading-7">
        {card.description}
      </p>
      <Image src={card.imageSrc} alt="Image" className="rounded-none mt-3" />
    </CardBody>
  </Card>
);

const CardsSection: React.FC = () => {

  return (
    <>
      <section className="mobile:max-w-7xl w-11/12  flex flex-col items-center justify-center gap-y-6 mobile:gap-y-20 relative">
        <div className="flex flex-col justify-center  ">
          <span className="mobile:text-custom-blue text-perfect-blue font-raleway text-base mobile:text-lg font-semibold leading-6 text-center  ">
            Unidos por la pasión, el esfuerzo y la amistad
          </span>
          <h1 className=" text-perfect-blue mobile:text-custom-black  mobile:text-7xl text-xl font-poppins mobile:font-inter  font-bold leading-snug text-center">
            ¡Un lugar para todos!
          </h1>
        </div>

        <IoIosArrowBack className="sm:hidden absolute bottom-56 -left-9 z-30 w-16 h-16 text-slate-300" />

        <IoIosArrowForward className="sm:hidden absolute bottom-56 -right-9 z-30 w-16 h-16 text-slate-300" />

        <div className="flex justify-start items-center gap-10 w-full h-full overflow-x-scroll sm:grid sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {cardDataArray.map((card) => renderCard(card))}
        </div>
      </section>
    </>
  );
};

export default CardsSection;
