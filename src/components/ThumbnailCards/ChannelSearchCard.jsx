import React from "react";
// import RoomIcon from "../Controls/RoomIcon";
import AvatarDeck from "../Controls/AvatarDeck";
import { useSelector } from "react-redux";
import VideoStatus from "../VideoStatus";
import strings from "../../helpers/localization";
import history from "../../history";
import channelPlaceholder from "../../assets/default/channelPlaceholder1.png";
import { mapIdsToUsers } from "../../helpers/functions";

export default function ChannelCard({
  id,
  name,
  icon,
  description,
  viewers,
  queueStartPosition,
  queue,
  playbackStatus,
  loading,
  videoInfo
}) {
  const { defaultAvatar } = useSelector(state => state.general);
  const users = useSelector(state => state.users);
  const viewerInfoObject = viewers
    ? mapIdsToUsers(viewers, users, defaultAvatar)
    : [];
  const avatars = viewerInfoObject.map(viewer => viewer.avatar);
  const handleSelect = () => {
    history.push(`/channels/${id}/video`);
  };
  let videoThumbnail = "";
  let videoTitle = strings.nothingPlaying;

  if (videoInfo) {
    videoThumbnail = videoInfo.thumbnail;
    videoTitle = videoInfo.title;
  }
  return (
    <>
      {loading ? (
        <div className="shadow-sm rounded-md p-4 max-w-xl w-full mx-auto my-4">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-300 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex flex-row w-full h-68 items-center px-0 sm:px-8 md:px-16 my-4"
          role={handleSelect ? "button" : null}
          onClick={handleSelect}
        >
          <div className="flex px-6 py-4 rounded-lg cursor-pointer">
            {/* === Channel Thumbnail Section === */}
            <div className="w-68">
              <div className="relative justify-center pb-5/4 md:pb-16/9 rounded-lg bg-primaryBackground">
                {/* ChannelCard background image */}
                {videoThumbnail ? (
                  <img
                    src={videoThumbnail}
                    alt={"channel"}
                    className="absolute img top-0 h-full rounded-lg bg-primaryBackground pt-px"
                  />
                ) : (
                  <img
                    src={channelPlaceholder}
                    alt={"channel"}
                    className="absolute img top-0 h-full rounded-lg bg-primaryBackground"
                  />
                )}
              </div>
            </div>
            {/*  === Channel Description Section === */}
            <div className="flex flex-col justify-start max-w-lg px-4">
              {/* Video Title & Video Status & Viewer list */}
              <div className="flex text-lg font-bold w-full truncate-2-lines text-primaryText">
                <VideoStatus status={playbackStatus} type="text" string />
                <p dangerouslySetInnerHTML={{ __html: videoTitle }} />
              </div>
              {avatars.length > 0 && (
                <div className="flex w-full my-1">
                  <AvatarDeck
                    avatars={avatars}
                    size="md"
                    className="img w-8 h-8"
                    threshold={6}
                  />
                </div>
              )}
              {/* Channel Icon & Description*/}
              <div className="flex flex-col items-center my-1">
                <div className="flex items-center justify-start w-full">
                  {/* <RoomIcon
                    ids={[id]}
                    images={[icon]}
                    // watching={live}
                    size="sm"
                    className="mr-2 w-6 h-6"
                  /> */}
                  <p className="pr-2 text-sm font-semibold truncate text-primaryText">
                    {name}
                  </p>
                </div>
                <p className="pr-2 text-sm truncate text-secondaryText w-full">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
