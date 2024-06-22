import { IActivity } from "@/interfaces/activities.interface"
import Image from "next/image"

export const ActivityCard = (activity: IActivity) => {
  const { name, image } = activity

  return (
    <div className="relative flex-shrink-0 w-[180px] h-[125px] ">
      <Image src={image} width={200} height={200} alt={name} className="w-full h-full object-cover rounded-lg" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
        <h3 className="font-semibold text-2xl text-white text-center">{name}</h3>
      </div>
    </div>
  )
}
