import { getActivities } from "@/actions"
import { ActivityCard } from "./activityCard/ActivityCard"

export const ActivitiesSection = async () => {
  const title = 'Actividades y Clases Disponibles'
  const { activities } = await getActivities()

  if (!activities) {
    return (
      <section className="w-full flex flex-col gap-5 my-6">
        <h2 className="font-semibold text-[22px] text-[#175F70]">{title}</h2>
        <div>
          <p>No hay actividades disponibles</p>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full flex flex-col gap-5 mt-5 mb-6">
      <h2 className="font-medium text-[24px] text-[#175F70]">{title}</h2>

      <div className="flex gap-2 w-full overflow-x-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {
          activities?.map((activity, index) => (
            <ActivityCard key={index} {...activity} />
          ))
        }
      </div>
    </section>
  )
}
