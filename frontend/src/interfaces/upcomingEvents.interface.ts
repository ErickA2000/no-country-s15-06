export interface IEventData {
    id: string;
    title: string;
    day: string;
    date: string;
    description: string;
    assistans: number;
    site: string;
    address: string;
    images: string[];
    eventConfirmation: boolean;
}

export interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: (isOpen: boolean) => void;
    modalData: IEventData;
    onConfirm: (id: string) => void;
}

export interface IAvatarGroupProps {
    size: "sm" | "md" | "lg";
    max: number;
    total: number;
    images: string[];
    addAvatar?: boolean | null;
}