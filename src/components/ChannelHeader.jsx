import React from "react";
import RoomIcon from "./Controls/RoomIcon";
import { Link, useLocation } from "react-router-dom";
import strings from ".././helpers/localization";
import Button from "./Controls/Button";

export default function ChannelHeader({
  id,
  isAdmin,
  name,
  icon,
  videoStatus,
  type = "channel",
  isLoading,
  handleFollow,
  isMember
}) {
  const location = useLocation();

  let navButtons = [
    { name: strings.video, endpoint: "video" },
    { name: strings.posts, endpoint: "channel" }
  ];
  if (isAdmin) {
    navButtons.push({ name: strings.upNext, endpoint: "queue" });
    navButtons.push({ name: strings.settings, endpoint: "settings" });
  }

  return (
    <div className="flex w-full h-12 bg-secondaryBackground justify-between items-center px-4 py-1 z-20 rounded-t-md">
      {isLoading ? (
        <div className="flex flex-row items-center w-full h-full space-x-2">
          <RoomIcon ids={[id]} images={""} size="sm" loading />
          <div className="animate-pulse w-1/2 h-4 bg-gray-300 rounded" />
        </div>
      ) : (
        <div className="flex items-center">
          <RoomIcon
            ids={[id]}
            images={[icon]}
            watching={videoStatus === "playing" ? true : false}
            size="sm"
            className="transition transform ease-in-out hover:scale-110 duration-100 cursor-pointer"
          />
          <p className="flex flex-shrink-0 text-md font-medium text-primaryText p-2 w-full truncate overflow-hidden">
            {name}
          </p>
        </div>
      )}
      {type === "channel" && (
        <nav className="flex flex-shrink-0 truncate items-center">
          {navButtons.map((button, idx) => {
            let className =
              "mx-1 font-semibold no-underline focus:outline-none p-2 hover:text-highlightText";
            if (
              location.pathname.startsWith(`/channels/${id}/${button.endpoint}`)
            ) {
              className = `${className} rainbow-text`;
            } else {
              className = `${className} text-secondaryText`;
            }
            return (
              <Link
                to={`/channels/${id}/${button.endpoint}`}
                className={className}
                key={idx}
              >
                {button.name}
              </Link>
            );
          })}
          {!isMember && (
            <Button
              actionButton
              size="sm"
              shape="pill"
              className="mx-2 h-8"
              onClick={handleFollow}
              analyticsString="Follow Button: Channel Description"
            >
              {strings.followButton}
            </Button>
          )}
        </nav>
      )}
    </div>
  );
}
