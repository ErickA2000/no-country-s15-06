import React from "react";
import { Link } from "@nextui-org/react";
import {
  LinkedinIcon,
  YoutubeIcon,
  FacebookIcon,
  InstagramIcon,
} from "./assets";

type Props = {};

export function Footer({}: Props) {
  return (
    <footer className="bg-footer-blue md:bg-primary-400-D dark:bg-gray-900 text-white font-poppins">
      <div className="mx-auto w-full max-w-screen-lg p-4 py-6 lg:py-8">
        <div className="flex justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center text-white">
              <h3 className="md:mb-5 self-center md:text-3xl whitespace-nowrap leading-5">
                Santa Ana Club deportivo
              </h3>
            </Link>
            <div className="flex bg-white max-w-xs rounded-lg py-2 px-3 mt-4 justify-between sm:mt-0 items-center">
              <Link
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <FacebookIcon />
                <span className="sr-only">Facebook page</span>
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <LinkedinIcon />
                <span className="sr-only">Linkedin Page</span>
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <YoutubeIcon />
                <span className="sr-only">Youtube Page</span>
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <InstagramIcon />
                <span className="sr-only">Instagram Page</span>
              </Link>
            </div>
          </div>
          <div className="gap-8 sm:gap-6">
            <div>
              <h2 className="md:text-3xl font-poppins leading-5 dark:text-gray-900 mb-3 md:mb-0">
                Menú
              </h2>
              <ul className="text-white dark:text-gray-400 md:text-2xl font-normal">
                <li className="mb-4 sm:mb-2">
                  <Link
                    href="#"
                    className="hover:underline text-white/80 font-normal"
                  >
                    Beneficios
                  </Link>
                </li>
                <li className="mb-4 sm:mb-2">
                  <Link
                    href="#"
                    className="hover:underline text-white/80 font-normal"
                  >
                    Membresías
                  </Link>
                </li>
                <li className="mb-4 sm:mb-2">
                  <Link
                    href="#"
                    className="hover:underline text-white/80 font-normal"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
