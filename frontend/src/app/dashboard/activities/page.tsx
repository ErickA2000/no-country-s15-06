import { getActivities, getSports } from "@/actions";
import { SliderSection, UpcomingEventsMobile } from "@/components";

export default async function ActivityPage() {
  const { activities } = await getActivities();
  const { sports } = await getSports();

  return (
    <div className="flex flex-col w-full items-center justify-center mb-5">
      <div className="flex flex-col w-11/12 gap-5 md:ms-5">
        <h1 className="font-medium text-[#175F70] text-2xl mt-4 md:mt-8">
          Actividades del club
        </h1>

        <SliderSection title="Deportes" activities={activities || []} />

        <SliderSection title="Mis actividades" activities={sports || []} />

        <div>
          <UpcomingEventsMobile />
        </div>
      </div>
    </div>
  );
}
