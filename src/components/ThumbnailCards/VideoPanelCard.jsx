import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import classnames from "classnames";
import moment from "moment";
import Button from "../Controls/Button";
import VideoStatus from "../VideoStatus";
import strings from "../../helpers/localization";

export default function VideoPanelCard({
  id,
  title,
  views,
  publishedAt,
  thumbnail = "somedefaultimagehere",
  status,
  statusMessage,
  type = "cancel",
  handleSkip,
  handleAddVideo,
  handleDeleteVideo,
  handleFindMore,
  url,
  loading,
  size,
  className
}) {
  // const leftInfo = `${views}`;
  const rightInfo = `${moment(publishedAt).locale(strings.location).fromNow()}`;
  const [disableButton, setDisableButton] = useState();
  const [addButtonIcon, setAddButtonIcon] = useState("plus");
  const [removeButtonIcon, setRemoveButtonIcon] = useState("minus");

  const cardClasses = classnames({
    "max-w-2xs": size === "sm",
    "max-w-md": size === "md",
    "max-w-lg": size === "lg",
    "w-full flex-shrink-0 items-center": true,
    [className]: className
  });
  const removeButtonPressed = () => {
    setRemoveButtonIcon("check");
    handleDeleteVideo(id);
  };
  const addButtonPressed = () => {
    setAddButtonIcon("check");
    const videoInfo = {
      title: title,
      publishedAt: publishedAt,
      thumbnail: thumbnail,
      url: url
    };
    handleAddVideo({
      source: "youtube",
      sourceId: id,
      videoInfo: JSON.stringify(videoInfo)
    });
    setDisableButton(true);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setDisableButton(false);
      setAddButtonIcon("plus");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    ReactTooltip.rebuild();
  }, []);
  return (
    <>
      {loading ? (
        <div className="animate-pulse flex-shrink-0">
          <div className="flex shadow-xs rounded-md pb-16/9 my-4 items-between bg-gray-300" />
          <div className="flex-1 space-y-2 w-full">
            <div className="h-4 bg-gray-300 rounded" />
            <div className="h-4 bg-gray-300 rounded w-5/6" />
          </div>
        </div>
      ) : (
        <>
          {!title && (
            <div
              className="flex w-full flex-shrink-0 max-w-2xs items-center pr-2"
              role="button"
              onClick={handleFindMore}
            >
              <div className="relative cursor-pointer pb-16/9 w-full rounded-md shadow-xs hover:shadow-md transition-all ease-in-out duration-100 bg-disabledBackground hover:bg-highlightBackground focus:outline-none">
                <div className="absolute flex items-center justify-center w-full h-full">
                  <Button
                    styleNone
                    styleNoneContent={strings.findMoreVideos}
                    icon="search"
                    styleNoneContentClassName="mx-2 text-secondaryText text-sm"
                    styleNoneIconClassName="text-secondaryText"
                    className="hover:filter-brightness-9"
                    analyticsString="Direct to Search Button: VideoPanelCard"
                  />
                </div>
              </div>
            </div>
          )}
          {title && (
            <div className={cardClasses}>
              <div className="relative flex justify-center flex-grow pb-16/9 w-full rounded-md shadow-xs hover:shadow-md transition-all ease-in-out duration-100">
                <div className="absolute top-0 left-0 w-full h-full p-2 rounded-b-xl">
                  <div className="relative flex justify-between">
                    <VideoStatus
                      status={status}
                      statusMessage={statusMessage}
                    />
                    {type === "cancel" && (
                      <Button
                        actionButton
                        className="absolute right-0 flex z-10 bg-highlightBackground"
                        onClick={removeButtonPressed}
                        analyticsString="Remove Video: VideoPanelCard"
                        onMouseLeave={() => setRemoveButtonIcon("minus")}
                        icon={removeButtonIcon}
                        size="sm"
                        background="cancel"
                        tooltip="Remove Video"
                        tooltipPlace="left"
                      />
                    )}
                    {type === "add" && (
                      <Button
                        actionButton
                        disabled={disableButton}
                        className="flex z-10 bg-highlightBackground"
                        onClick={addButtonPressed}
                        analyticsString="Add Video Button: VideoPanelCard"
                        icon={addButtonIcon}
                        size="sm"
                        tooltip="Add to queue"
                        tooltipPlace="left"
                      />
                    )}
                  </div>
                </div>
                <img
                  src={thumbnail}
                  alt="video-thumbnail"
                  className="absolute top-0 w-full pb-px h-full img rounded-md object-cover"
                  onClick={handleSkip && (() => handleSkip(id))}
                />
              </div>
              <div className="w-full pt-2 px-0">
                <p
                  className="text-sm font-semibold truncate-2-lines overflow-hidden text-primaryText break-words"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
                <div className="flex items-end">
                  <p className="text-xs pt-2 text-secondaryText items-end ">
                    {/* {leftInfo} &middot; {rightInfo} */}
                    {"YouTube"} &middot; {rightInfo}
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
