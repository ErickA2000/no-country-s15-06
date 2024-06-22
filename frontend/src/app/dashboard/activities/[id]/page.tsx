import { getOneActivity } from "@/actions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

interface Props {
  params: {
    id: string
  }
}

export default async function ActivityPage({ params }: Props) {

  const { activity } = await getOneActivity(params.id)
  if (activity === null) {
    redirect('/dashboard/activities')
  }

  const days = activity.activityDay.map((day, index) => {
    return (
      <div key={index}>
        <p>{day.day}</p>
        <p>{day.hour}</p>
      </div>
    )
  }
  )

  return (
    <>
      <Link href="/dashboard/activities" className="flex gap-1 font-medium text-[#175F70] items-center py-3 hover:underline">
        <IoIosArrowBack />
        Actividades
      </Link>

      <div className="grid md:grid-cols-2 md:gap-11 mt-3 gap-3 md:ml-8">
        {/* Img */}
        <div className="h-64 md:w-full md:h-full">
          <Image src={activity.image} width={600} height={600} alt={activity.name} className="h-full object-cover object-center max-h-[600px]" />
        </div>

        {/* content */}
        <div className="mt-8 md:mt-0">
          <h1 className="font-medium text-2xl text-black">{activity.name}</h1>
          <h2 className="font-normal text-sm text-[#038110]">En actividad</h2>
          <p className="font-normal text-sm text-[#828282]">dias</p>
          <p className="font-normal text-sm text-[#828282] mb-8 mt-3">{activity.description}</p>

          <button className="rounded-lg px-3 py-2 border-2 boder-[#CC6600] text-[#CC6600] text-sm font-medium bg-white max-w-72 w-full mx-auto hover:opacity-80">
            Solicitar baja actividad
          </button>
        </div>
      </div>
    </>
  );
}