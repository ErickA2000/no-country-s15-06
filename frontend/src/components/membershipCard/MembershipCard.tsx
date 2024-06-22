// components/MembershipCard.tsx
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
} from "@nextui-org/react";
import React from "react";
import styles from "./MembershipCard.module.css";
import { IActivity } from "@/interfaces/memberShipType.interface";

interface MembershipCardProps {
  planName: string;
  pricePerMonth: number;
  pricePerYear: number;
  isAnnual: boolean;
  statement: string;
  features: IActivity[];
  onSelect: () => void;
}

const MembershipCard: React.FC<MembershipCardProps> = ({
  planName,
  pricePerMonth,
  pricePerYear,
  features,
  isAnnual,
  statement,
  onSelect,
}) => {
  return (
    <Card className="w-80 p-8 rounded-xl  text-primary-300 min-h-[500px] ">
      <CardHeader className="w-full  flex-col flex-wrap items-start gap-y-3 ">
        {isAnnual ? (
          <>
            <div className="flex  justify-between text-primary-300">
              <span className=" text-4xl font-normal leading-relaxed ">
                $ {pricePerYear}
              </span>
              <span className=" text-2xl p-2"> /anual</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between text-primary-300">
              <span className=" text-4xl font-normal leading-relaxed ">
                $ {pricePerMonth}
              </span>
              <span className=" text-2xl p-2"> /mensual</span>
            </div>
          </>
        )}
        <span className=" font-bold block">{planName}</span>
      </CardHeader>
      <CardBody className="mobile:w-full w-60 py-2 gap-y-8">
        <span className="text-left">{statement}</span>
        <ul className={`list-disc list-inside mb-4 ${styles.customBullet}`}>
          {features?.map((feature, index) => {
            return (
              <li
                key={index}
                className="font-inter mobile:text-lg text-base text-ligther-gray font-medium leading-7 text-left"
              >
                {feature.name}
              </li>
            );
          })}
        </ul>
      </CardBody>

      <CardFooter className="w-full flex justify-center items-center">
        <Button
          className="w-full text-base bg-transparent border-2 border-secondary-400 text-secondary-400"
          radius="lg"
          variant="bordered"
          onClick={onSelect}
        >
          Elegir Plan
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MembershipCard;
