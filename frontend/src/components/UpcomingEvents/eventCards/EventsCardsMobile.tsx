import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { ClockIcon } from "../assets";
import { AvatarRandomGroups } from "../utils/AvatarGroups";
import { IEventData } from "@/interfaces/upcomingEvents.interface";

type Props = {
  currentEvents: IEventData[];
  handleOpenModal: (data: IEventData) => void;
};

export default function EventsCardsMobile({
  currentEvents,
  handleOpenModal,
}: Props) {
  return (
    <>
      <section className="w-full flex flex-col gap-5 my-4 md:my-6">
        <article
          className="flex gap-2 w-full overflow-x-scroll"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {currentEvents.map((event) => (
            <div key={event.id} className="flex-shrink-0 h-[180px] me-2">
              <Card
                radius="sm"
                className="w-56 bg-bone-card shadow-mini-card p-1"
              >
                <CardHeader>
                  <h3 className="text-sm text-primary-400-D font-semibold font-poppins">
                    {event.title}
                  </h3>
                </CardHeader>
                <CardBody className="inline-flex flex-row items-center gap-2">
                  <ClockIcon />
                  <p className="text-green-600 font-medium text-sm font-poppins">
                    Hoy a las {event.date}
                  </p>
                </CardBody>
                <CardFooter className="flex justify-between">
                  <AvatarRandomGroups
                    size="sm"
                    max={2}
                    total={event.assistans}
                    images={event.images}
                  />
                  <Button
                    key={event.id}
                    onPress={() => handleOpenModal(event)}
                    size="sm"
                    variant="flat"
                  >
                    Ver evento
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </article>
      </section>
    </>
  );
}
