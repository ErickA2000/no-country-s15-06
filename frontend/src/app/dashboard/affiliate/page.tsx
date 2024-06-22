import { getProfile } from "@/actions/auth/get-profile";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Avatar,
} from "@nextui-org/react";

export default async function AffiliatePage() {
  const { ok, message, data } = await getProfile();
  if (!ok) {
    console.error(message);
    return;
  }

  return (
    <div className="flex  justify-center items-center h-screen bg-transparent">
      <div className="flex space-x-4  static">
        <Card className="w-[400px] h-[631px] flex justify-center  items-center  relative">
          <CardHeader className="p-0 w-full absolute top-0">
            <Image
              className="w-full z-0  "
              src="/icons/Shape 1top1.svg"
              alt="decorative"
            />
            <Image
              className=" w-10 z-10  h-6 absolute top-0 left-0"
              src="/images/StAnaLogo.png"
              alt="decorative"
              width={30}
              height={30}
            />
          </CardHeader>
          <CardBody className="flex flex-col justify-center items-center gap-10 w-full">
            <div className="flex flex-col gap-4">
              <Avatar
                src="https://i.pravatar.cc/300?u=a04258114e29026302d"
                className="w-40  h-40 text-large self-center"
              />
              <p className="font-montserrat tex-lg font-normal leading-6 text-left  text-primary-400">
                {`${data?.firstName} ${data?.lastName}`}
              </p>
            </div>
            <div className="flex justify-center items-center">
              <ul className="block w-full font-montserrat  text-lg font-normal  leading-6  text-primary-400">
                <li>
                  ID : <span className="ml-4">{data?.dni}</span>
                </li>
                <li>
                  FD :{" "}
                  <span className="ml-4">{data?.createdAt.slice(0, 10)}</span>
                </li>
                <li>
                  Phone : <span className="ml-4">1201248510</span>
                </li>
                <li>
                  E-mail : <span className="ml-4">{data?.account.email}</span>
                </li>
              </ul>
            </div>
          </CardBody>
          <CardFooter className="p-0 w-full absolute bottom-0">
            <Image src="/icons/bottom.svg" alt="decorative" />
          </CardFooter>
        </Card>

        <Card className="w-[400px] h-[631px] rounded-none flex justify-center relative ">
          <CardHeader className="p-0 w-full absolute top-0">
            <Image className="" src="/icons/TightTop.svg" alt="decorative" />
          </CardHeader>
          <CardBody className="flex justify-center items-center gap-2 w-full p-4">
            <Image
              src="/images/QR.svg"
              alt="QR"
              className="w-50  h-50 text-large self-center"
            />
            <ul className="block font-montserrat  text-lg font-normal leading-6 text-left text-primary-400">
              <li>
                Fecha de inicio :{" "}
                <span className="ml-4">{data?.createdAt.slice(0, 10)}</span>
              </li>
              <li>
                Fecha de expiracion :{" "}
                <span className="ml-4">{data?.updatedAt.slice(0, 10)}</span>
              </li>
            </ul>
            <p className="text-black self-start w-40 font-montserrat text-lg  font-normal leading-6 ">
              {data?.address}
            </p>
          </CardBody>
          <CardFooter className="p-0 w-full absolute bottom-0">
            <Image src="/icons/bottom.svg" alt="decorative" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

