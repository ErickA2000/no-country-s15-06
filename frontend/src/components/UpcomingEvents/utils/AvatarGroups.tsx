import { IAvatarGroupProps } from "@/interfaces/upcomingEvents.interface";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import React from "react";

export const AvatarRandomGroups: React.FC<IAvatarGroupProps> = ({
  size,
  max,
  total,
  images,
}) => {
  const avatarUrls = "https://i.pravatar.cc/150?u=a04258114e29026302d";
  return (
    <>
      <AvatarGroup size={size} max={max} total={total}>
        {images.map((url, index) => (
          <Avatar
            key={index}
            isBordered
            color={url === avatarUrls ? "success" : "default"}
            src={url}
          />
        ))}
      </AvatarGroup>
    </>
  );
};
