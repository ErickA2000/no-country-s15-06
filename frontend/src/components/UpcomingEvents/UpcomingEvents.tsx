import React from "react";
import { UpcomingEventsMobile } from "./eventComponents/UpcomingEventsMobile";
import { UpcomingDesktopEvents } from "./eventComponents/UpcomingDesktopEvents";

type Props = {};

export function UpcomingEvents({}: Props) {
  return (
    <>
      <section>
        <div className="md:hidden">
          <UpcomingEventsMobile />
        </div>
        <div className="hidden md:block w-full">
          <UpcomingDesktopEvents />
        </div>
      </section>
    </>
  );
}
