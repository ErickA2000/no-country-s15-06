import { SliderCard } from "./sliderCard/SliderCard"
import { IActivity } from "@/interfaces/activities.interface"

interface IActivitiesSection {
  title: string
  activities: IActivity[]
}

export const SliderSection = async ({ title = 'Actividades', activities }: IActivitiesSection) => {

  if (activities.length === 0) {
    return (
      <section className="w-full flex flex-col gap-5 my-6">
        <h2 className="font-semibold text-[22px] text-[#175F70]">Mis actividades</h2>
        <p>No hay actividades cargadas...</p>
      </section>
    )
  }

  return (
    <section className="w-full flex flex-col gap-5 mb-6">
      <h2 className="font-semibold text-xl text-[#175F70]">{title}</h2>

      <div className="flex gap-2 w-full overflow-x-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {
          activities?.map((card, index) => (
            <SliderCard key={index} {...card} />
          ))
        }
      </div>
    </section>
  )
}
