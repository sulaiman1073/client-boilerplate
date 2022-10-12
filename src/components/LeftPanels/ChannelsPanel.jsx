import React from "react";
import ChannelsList from "../InfoCardLists/ChannelsList";
import Button from "../Controls/Button";
import MiniFriendsList from "../MiniFriendsList";
import PanelHeader from "./PanelHeader";
import ReactTooltip from "react-tooltip";
import strings from "../../helpers/localization";

export default function ChannelsPanel({
  yourChannels,
  followingChannels,
  selectedChannel,
  friends,
  handleSelectChannel,
  handleSelectRoom,
  handleCollapse,
  handleCreateChannel,
  updateSelectedPage,
  selectedPage,
  setFriendsSearchFocus,
  numberOfNotifications
}) {
  return (
    <div className="flex flex-col w-84 h-full bg-primaryBackground select-none">
      <PanelHeader
        handleCollapse={handleCollapse}
        updateSelectedPage={updateSelectedPage}
        selectedPage={selectedPage}
        numberOfNotifications={numberOfNotifications}
      />
      <div className="flex-col h-full overflow-y-scroll">
        <MiniFriendsList
          friends={friends}
          handleSelectRoom={handleSelectRoom}
          handleFindFriends={() => {
            setFriendsSearchFocus(true);
            updateSelectedPage("friends");
          }}
          isLoading={false}
        />
        <div className="flex flex-col items-start bg-primaryBackground">
          <div className="flex items-center m-4 space-x-2">
            <h4 className="text-md font-semibold text-secondaryText">
              {strings.yourChannels}
            </h4>
            <Button
              actionButton
              size="sm"
              icon="plus"
              background="primaryButton"
              onClick={handleCreateChannel}
              analyticsString="Create Channel Button: ChannelsPanel"
              className="hover:scale-110"
              tooltip={strings.createChannelButton}
            />
          </div>
          <ChannelsList
            channels={yourChannels}
            selected={selectedChannel}
            handleSelect={handleSelectChannel}
            fullHeight={true}
            emptyMessage={strings.yourChannelsPlaceholder}
            isLoading={false}
          />
          <h4 className="m-4 text-md font-semibold text-secondaryText">
            {strings.followingChannels}
          </h4>
          <ChannelsList
            channels={followingChannels}
            selected={selectedChannel}
            handleSelect={handleSelectChannel}
            fullHeight={true}
            emptyMessage={strings.followingChannelsPlaceholder}
            isLoading={false}
          />
        </div>
      </div>
      <ReactTooltip
        effect="solid"
        backgroundColor="#F2F2F2"
        textColor="black"
        className="shadow-md rounded-md py-1 px-3 opacity-100"
        arrowColor="transparent"
      />
    </div>
  );
}
