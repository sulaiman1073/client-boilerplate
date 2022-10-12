import React from "react";
import Button from "./Controls/Button";
import AvatarIcon from "./Controls/AvatarIcon";
import VideoStatus from "./VideoStatus";
import VideoPlayer from "./VideoPlayer";
import ReactTooltip from "react-tooltip";

export default function VideoSection({
  title,
  url,
  displayControls,
  sourceChannelName,
  activeFriendViewers,
  inviteUsers,
  socialShare,
  openProfile,
  isInvitingAllowed,
  isChannel,
  playerStatus,
  volume,
  setVolume,
  dispatchPlay,
  dispatchPause,
  dispatchSkip,
  dispatchPlayNextVideo,
  handleNothingPlaying
}) {
  return (
    <div className="flex flex-col">
      <VideoPlayer
        url={url}
        displayControls={displayControls}
        playerStatus={playerStatus}
        volume={volume}
        setVolume={setVolume}
        dispatchPlay={dispatchPlay}
        dispatchPause={dispatchPause}
        dispatchSkip={dispatchSkip}
        dispatchPlayNextVideo={dispatchPlayNextVideo}
        handleNothingPlaying={handleNothingPlaying}
      />
      <div className="flex flex-col pt-4 px-4">
        <div className="flex items-center justify-between h-8 space-x-2">
          <div className="flex items-center flex-row left-0 space-x-1">
            <VideoStatus
              status={playerStatus.status.toLowerCase()}
              type="text"
              string
            />
            {activeFriendViewers.map((friend, idx) => {
              return (
                <AvatarIcon
                  key={idx}
                  username={friend.username}
                  avatar={friend.avatar}
                  imageClick={() => openProfile(friend.id)}
                  className="img h-8 w-8 rounded-circle transition transform ease-in-out hover:scale-110 duration-100 cursor-pointer"
                  tooltip={friend.username}
                  tooltipPlace="bottom"
                />
              );
            })}
          </div>
          {isInvitingAllowed ? (
            <Button
              actionButton
              icon="user-plus"
              size="sm"
              onClick={inviteUsers}
              analyticsString="Invite User Button: VideoSection"
            />
          ) : isChannel ? (
            <Button
              actionButton
              size="sm"
              onClick={socialShare}
              analyticsString="Invite User Button: VideoSection"
            >
              Invite
            </Button>
          ) : (
            <div />
          )}
        </div>
        {url ? (
          <div>
            <div className="py-2">
              <p
                className="text-lg text-primaryText font-semibold truncate-2-lines overflow-hidden"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              <p className="text-sm text-secondaryText py-2">
                {sourceChannelName} {url}
              </p>
            </div>
          </div>
        ) : (
          <p></p>
        )}
      </div>
      <ReactTooltip
        effect="solid"
        backgroundColor="#F2F2F2"
        textColor="black"
        className="shadow-lg rounded-md py-1 px-3"
        arrowColor="transparent"
      />
    </div>
  );
}
