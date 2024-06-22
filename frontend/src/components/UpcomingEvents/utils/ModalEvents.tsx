import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import {
  AdressIcon,
  AlertConfirmIcon,
  AlertSuccessIcon,
  CalendarIcon,
  ConfirmIcon,
  NotConfirmIcon,
  WatchTimeIcon,
} from "../assets";
import { AvatarRandomGroups } from "./AvatarGroups";
import { IModalProps } from "@/interfaces/upcomingEvents.interface";

export const ModalEvents: React.FC<IModalProps> = ({
  isOpen,
  onClose,
  onOpenChange,
  modalData,
  onConfirm,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-gray-200 border-b-1">
                Proximos eventos del club
              </ModalHeader>
              <ModalBody>
                <p className="text-primary-400-D text-2xl font-semibold my-4">
                  {modalData.title}
                </p>
                <p>{modalData.description}</p>
                <ul className="text-primary-300 mt-4">
                  <li className="flex gap-3 items-center mb-3">
                    <CalendarIcon />
                    {modalData.day}
                  </li>
                  <li className="flex gap-3 items-center mb-3">
                    <WatchTimeIcon />
                    {modalData.date}
                  </li>
                  <li className="flex gap-3 items-center mb-3">
                    <AdressIcon />
                    {modalData.site}
                    <br />
                    {modalData.address}
                  </li>
                  <li
                    className={`flex gap-3 items-center mb-3 ${
                      modalData.eventConfirmation ? "text-[#17c964]" : " "
                    }`}
                  >
                    {modalData.eventConfirmation ? (
                      <AlertSuccessIcon />
                    ) : (
                      <AlertConfirmIcon />
                    )}
                    {modalData.eventConfirmation
                      ? "Asistencia confirmada"
                      : "Confirmar asistencia"}
                  </li>
                </ul>
              </ModalBody>
              <ModalFooter className="flex justify-between">
                <AvatarRandomGroups
                  size="sm"
                  max={3}
                  total={modalData.assistans}
                  images={modalData.images}
                />
                <Button
                  color={modalData.eventConfirmation ? "danger" : "success"}
                  variant="light"
                  onPress={() => onConfirm(modalData.id)}
                  startContent={
                    modalData.eventConfirmation ? (
                      <NotConfirmIcon />
                    ) : (
                      <ConfirmIcon />
                    )
                  }
                >
                  {modalData.eventConfirmation
                    ? "Cancelar Asistencia"
                    : "Confirmar Asistencia"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
