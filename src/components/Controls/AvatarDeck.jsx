import React from "react";
import classnames from "classnames";
import Button from "./Button";

export default function AvatarDeck({
  ids,
  avatars,
  size = "md",
  className,
  threshold = 6
}) {
  const deckClasses = classnames({
    "flex flex-row-reverse justify-end mr-5": true,
    "children:-mr-2": size === "sm",
    "children:-mr-3": size === "md",
    "children:-mr-4": size === "lg",
    [className]: className
  });
  const avatarClasses = classnames({
    "img inline-block rounded-circle text-white border-2 border-imageBorder2": true,
    "h-6 w-6": size === "sm",
    "h-8 w-8": size === "md",
    "h-10 w-10": size === "lg"
  });

  return (
    <div className={deckClasses}>
      {avatars &&
        avatars.map((avatar, index) => {
          if (index < threshold) {
            return (
              <img
                key={ids?.[index] || index}
                src={avatar}
                alt="avatar"
                className={avatarClasses}
              />
            );
          } else if (index === avatars.length - 1) {
            const totalLeft = avatars.length - threshold;
            return (
              <Button
                hoverable
                styleNone
                styleNoneContent={`+${totalLeft}`}
                key={ids?.[index] || index}
                className={`${avatarClasses} bg-disabledBackground text-xs order-first z-10`}
                analyticsString="View More Users Button: AvatarDeck"
              />
            );
          } else {
            return null;
          }
        })}
    </div>
  );
}
