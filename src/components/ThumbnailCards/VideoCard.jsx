import React from "react";
import moment from "moment";
import strings from "../../helpers/localization";

export default function VideoCard({
  id,
  title,
  views,
  publishedAt,
  thumbnail = "somedefaultimagehere",
  handleShare,
  handleWatch,
  isLoading
}) {
  // const leftInfo = `${views}`;
  const rightInfo = `${moment(publishedAt).locale(strings.location).fromNow()}`;
  return (
    <>
      {isLoading ? (
        <div className="animate-pulse max-w-lg">
          <div className="flex shadow-xs rounded-md pb-16/9 my-4 items-between bg-gray-300" />
          <div className="flex-1 space-y-2 w-full">
            <div className="h-4 bg-gray-300 rounded" />
            <div className="h-4 bg-gray-300 rounded w-5/6" />
          </div>
        </div>
      ) : (
        <div className="cursor-pointer w-full flex-shrink-0 max-w-lg h-full group">
          <div className="relative flex justify-center flex-grow pb-16/9 w-full rounded-md group-hover:shadow-xl transition-all ease-in-out duration-100">
            <img
              src={thumbnail}
              alt="video-thumbnail"
              className="absolute top-0 h-full pb-px img rounded-md object-cover"
            />
            <div
              className="flex absolute w-full h-full top-0 left-0 rounded-md justify-center items-center 
            text-tertiaryText text-md font-bold bg-black bg-opacity-25 transition-opacity opacity-0 hover:opacity-100 duration-100"
            >
              <p className="transition transform ease-in-out hover:scale-105 duration-100">
                {strings.watch}
              </p>
            </div>
          </div>
          <div className="w-full pt-2 px-1">
            <p
              className="text-sm font-semibold truncate-2-lines overflow-hidden text-primaryText break-words"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <div className="flex items-end">
              <p className="text-xs pt-2 text-secondaryText items-end">
                {"Youtube"} &middot; {rightInfo}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
