import React from "react";
import PopupMenu from "../Controls/PopupMenu";
import FriendRequestButtons from "../Controls/FriendRequestButtons";
import ImageUpload from "../Controls/ImageUpload";
import Button from "../Controls/Button";
import ReactTooltip from "react-tooltip";
import strings from "../../helpers/localization";
// import ChannelCardList from "../ThumbnailCardLists/ChannelCardList";

export default function ProfileModal({
  user,
  following,
  followers,
  friends,
  recentVideos,
  followedChannels,
  unfriendHandler,
  blockHandler,
  updateAvatar,
  updateUserApi
}) {
  // variants: self, friend, stranger, sentRequest, receivedRequest, blocked
  const variant = user.variant;
  const myProfile = variant === "self";

  let options = null;
  if (!myProfile) {
    options = [
      {
        name: variant === "blocked" ? "Unblock" : "Block",
        handler: blockHandler
      }
    ];
  }
  if (variant === "friend") {
    options.unshift({ name: "Unfriend", handler: unfriendHandler });
  }

  return (
    <div className="flex items-start justify-center p-4 py-8 overflow-auto">
      <div className="flex justify-start items-center space-x-8 py-6 px-12">
        {myProfile ? (
          <ImageUpload
            name="avatar"
            size="sm"
            icon={user.avatar}
            onUpload={url => {
              updateAvatar(url);
            }}
            onRemove={() => {
              updateAvatar(null);
            }}
            disabled={updateUserApi.loading}
          />
        ) : (
          <img
            className="img w-32 h-32 rounded-circle"
            src={user.avatar}
            alt={`${user.username}'s avatar`}
          />
        )}
        <div className="flex flex-col justify-start items-center">
          <div className="flex flex-row w-full items-center justify-start py-2">
            <p className="text-2xl font-semibold text-primaryText">
              {user.username}
            </p>
            <FriendRequestButtons user={user} tooltipPlace="bottom" size="sm" />
          </div>
          <div className="text-secondaryText w-full">
            {`${user.firstName} ${user.lastName}`}
          </div>
          <div className="flex space-x-8 my-4 text-primaryText">
            <Button
              styleNone
              styleNoneContent={`${following} ${strings.followingChannels}`}
              className="text-sm font-semibold"
              analyticsString="Show following list Button: ProfileModal"
            />
            {/* <Button
              styleNone
              styleNoneContent={`${followers} Followers`}
              className="text-sm font-semibold"
              analyticsString="Show followers list Button: ProfileModal"
            /> */}
            <Button
              styleNone
              styleNoneContent={`${friends} ${strings.friendsText}`}
              className="text-sm font-semibold"
              analyticsString="Show friends list Button: ProfileModal"
            />
          </div>
        </div>
      </div>
      {updateUserApi.error && (
        <div className="flex justify-center">
          <p className="text-errorText text-sm">{updateUserApi.error}</p>
        </div>
      )}
      {options ? (
        <div className="flex">
          <PopupMenu id={user.id} options={options} />
        </div>
      ) : (
        <></>
      )}
      <ReactTooltip
        effect="solid"
        backgroundColor="#F2F2F2"
        textColor="black"
        className="shadow-md rounded-md py-1 px-3 opacity-100"
        arrowColor="transparent"
      />
      {/* <div className="text-md font-bold pb-4 text-primaryText">
        {myProfile
          ? "Videos You Watched"
          : `Videos You and ${user.username} Watched`}
      </div> */}
      {/* <div className="flex">
        <ChannelCardList channelList={recentVideos} />
      </div>
      <div className="text-md font-bold pb-8 text-primaryText">
        {myProfile
          ? "Channels You Follow"
          : `Channels You and ${user.username} Follow`}
      </div>
      <div className="flex">
        <ChannelCardList channelList={followedChannels} />
      </div> */}
    </div>
  );
}
