import React from "react";
import { Card, CardBody, Image, Button } from "@nextui-org/react";
import { IEventData } from "@/interfaces/upcomingEvents.interface";
import { AvatarRandomGroups } from "../utils/AvatarGroups";

type Props = {
  currentEvents: IEventData[];
  handleOpenModal: (data: IEventData) => void;
};

export default function EventsCardDesktop({
  currentEvents,
  handleOpenModal,
}: Props) {
  return (
    <>
      <Card className="max-w-3xl w-full hidden lg:block py-4 bg-white/80">
        {currentEvents.map((event) => (
          <CardBody
            key={event.id}
            className="flex flex-row justify-between items-center px-8 py-3"
          >
            <div className="flex flex-row items-center justify-center gap-3">
              <div className="bg-[#42B2AB] rounded-[20px] p-2">
                <Image
                  alt="nextui logo"
                  height={40}
                  radius="sm"
                  src="/example-green.svg"
                  width={40}
                />
              </div>
              <div className="flex flex-col flex-1">
                <p className="text-base font-normal font-inter text-primary-400-D">
                  {event.title}
                </p>
                <p className="text-sm font-normal font-inter text-primary-300">
                  {event.day}
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-5 mx-5">
              <AvatarRandomGroups
                size="md"
                max={3}
                total={event.assistans}
                images={event.images}
              />
              <Button
                key={event.id}
                onPress={() => handleOpenModal(event)}
                variant="bordered"
                color="warning"
              >
                Ver evento
              </Button>
            </div>
          </CardBody>
        ))}
      </Card>
    </>
  );
}
