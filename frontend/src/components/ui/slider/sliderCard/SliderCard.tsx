import Image from "next/image"
import Link from "next/link"

interface ICard {
  name: string
  image: string
  description: string
  id: string
}

export const SliderCard = (card: ICard) => {

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "..."
    }
    return description;
  }

  const { name, image, description, id } = card

  return (
    <div className="flex-shrink-0 w-[260px] h-[340px] rounded-lg">
      <Link href={`/dashboard/activities/${id}`}>
        <Image src={image} width={200} height={200} alt={name} className="w-full h-[170px] object-cover rounded-lg" />
      </Link>
      <div className="bg-white p-4">
        <h3 className="text-[#175F70] text-xl font-semibold text-center p-2 my-2">{name}</h3>
        <p className="text-sm">{truncateDescription(description, 100)} <span className="font-semibold text-[#175F70] hover:underline" ><Link href={`/dashboard/activities/${id}`}>más</Link> </span></p>
      </div>
    </div>
  )
}
