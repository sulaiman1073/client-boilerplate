import React, { Fragment, useState, useEffect } from "react";
import FriendsPanel from "./FriendsPanel";
import CollapsedPanel from "./CollapsedPanel";
import ChannelsPanel from "./ChannelsPanel";
import { Helmet } from "react-helmet";
import useSound from "use-sound";
import notificationSound from "../../assets/sounds/pop-sound.mp3";
import { useInterval } from "react-use";
import { useWindowSize } from "../../helpers/functions";
import strings from "../../helpers/localization";

export default function LeftPanel({
  yourChannels,
  followingChannels,
  userSearchResults,
  userSearchStatus,
  blocks,
  handleSearch,
  roomsResults,
  selected,
  handleSelectChannel,
  handleSelectRoom,
  selectedPage,
  handleCollapse,
  handleCreateChannel,
  handleProfile,
  isCollapsed,
  updateSelectedPage,
  handleCreateRoom,
  friendsSearchFocus,
  setFriendsSearchFocus,
  numberOfNotifications
}) {
  const channels = [...yourChannels, ...followingChannels];
  const size = useWindowSize();
  const [isCollapsedResponsive, setCollapsedResponsive] = useState();
  const [isFavicon, setFavicon] = useState();
  const [play] = useSound(notificationSound);
  const [isRunning, setIsRunning] = useState(true);
  const [checked, setChecked] = useState(false);

  useInterval(
    // Sound notifications are triggered.
    () => {
      if (checked) {
        play();
        setIsRunning(false);
      }
    },
    isRunning ? 50 : null
  );

  useEffect(() => {
    // Triggers collapse when screen size reduces.
    if (size.width <= 1024) {
      setCollapsedResponsive(true);
    } else {
      setCollapsedResponsive(false);
    }
    // Favicon changes state depending on notifications.
    if (numberOfNotifications !== 0) {
      setFavicon("https://i.ibb.co/JkKgxv9/favicon-notification.png");
      setChecked(true);
    } else {
      setFavicon("https://i.ibb.co/wL0BpLN/favicon.png");
      setChecked(false);
      setIsRunning(true);
    }
  }, [isCollapsed, numberOfNotifications, selectedPage, size.width]);

  if ((isCollapsed === false) & (isCollapsedResponsive === true)) {
    isCollapsed = true;
  }

  return (
    <Fragment>
      <div
        className={`${
          isCollapsed || isCollapsedResponsive ? "hidden" : ""
        } w-full md:w-auto shadow-md h-full`}
      >
        {selectedPage === "channels" ? (
          <ChannelsPanel
            yourChannels={yourChannels}
            followingChannels={followingChannels}
            friends={roomsResults}
            selectedChannel={selected}
            handleSelectChannel={handleSelectChannel}
            handleSelectRoom={handleSelectRoom}
            handleCreateChannel={handleCreateChannel}
            selectedPage={selectedPage}
            updateSelectedPage={updateSelectedPage}
            handleCollapse={handleCollapse}
            setFriendsSearchFocus={setFriendsSearchFocus}
            numberOfNotifications={numberOfNotifications}
          />
        ) : (
          <FriendsPanel
            userSearchResults={userSearchResults}
            userSearchStatus={userSearchStatus}
            blocks={blocks}
            handleSearch={handleSearch}
            initialRooms={roomsResults}
            selectedRoom={selected}
            handleSelectRoom={handleSelectRoom}
            updateSelectedPage={updateSelectedPage}
            handleCollapse={handleCollapse}
            handleProfile={handleProfile}
            selectedPage={selectedPage}
            handleCreateRoom={handleCreateRoom}
            friendsSearchFocus={friendsSearchFocus}
            setFriendsSearchFocus={setFriendsSearchFocus}
            numberOfNotifications={numberOfNotifications}
          />
        )}
      </div>
      <div
        className={`block ${
          isCollapsed || isCollapsedResponsive ? "md:block" : "hidden"
        } h-full`}
      >
        <CollapsedPanel
          rooms={roomsResults}
          channels={channels}
          selected={selected}
          handleSelectRoom={handleSelectRoom}
          handleSelect={handleSelectChannel}
          handleCollapse={handleCollapse}
          isCollapsed={isCollapsed}
          selectedPage={selectedPage}
          updateSelectedPage={updateSelectedPage}
          setFriendsSearchFocus={setFriendsSearchFocus}
          numberOfNotifications={numberOfNotifications}
          isCollapsedResponsive={isCollapsedResponsive}
        />
      </div>
      <Helmet>
        <meta charSet="UFT-8" />
        <title>{strings.mainTitle}</title>
        <meta name="description" content={strings.mainDescription} />
        <link rel="icon" type="image/png" href={isFavicon} target="_blank" />
        <meta name="keywords" content={strings.mainKeywords} />
      </Helmet>
    </Fragment>
  );
}
