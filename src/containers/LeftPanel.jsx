import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { Switch, Route } from "react-router";
import LeftPanel from "../components/LeftPanels/LeftPanel";
import {
  toggleLeftPanel,
  searchUsers,
  openProfileModal,
  openInviteModal,
  setLastMessageSeen
} from "../redux/actions";
import history from "../history";
import { mapIdsToUsers, setRelationshipHandlers } from "../helpers/functions";
import { orderBy } from "lodash";
import { channelHasNewMessage } from "../util/channelHasNewMessage";

export default function LeftPanelContainer() {
  let match = useRouteMatch("/channels/:channelId");
  let selectedChannel = match?.params.channelId ? match.params.channelId : 0;

  match = useRouteMatch("/rooms/:roomId");
  if (selectedChannel === 0) {
    selectedChannel = match?.params.roomId ? match.params.roomId : 0;
  }

  const [selectedPage, setSelectedPage] = useState(
    match?.params.roomId ? "friends" : "channels"
  );
  const [friendsSearchFocus, setFriendsSearchFocus] = useState(false);

  const channels = useSelector(state => state.channels);
  const numberOfNotifications = useSelector(state => {
    let counter = 0;
    const channels = Object.keys(state.channels).map(key => {
      return state.channels[key];
    });
    channels.forEach(channel => {
      if (channelHasNewMessage(channel)) counter++;
    });
    return counter;
  });
  const users = useSelector(state => state.users);
  const relationships = useSelector(state => state.relationships);
  const foundUsers = useSelector(state => state.userSearch);
  const userSearchStatus = useSelector(state => state.api.userSearchApi.status);
  const { defaultAvatar, defaultIcon } = useSelector(state => state.general);
  const { id: ownId, channelIds, roomIds } = useSelector(state => state.self);
  const isCollapsed = useSelector(state => state.ui.isCollapsed);

  const dispatch = useDispatch();

  const blocks = relationships.blockers.length + relationships.blocked.length;

  let yourChannels = [];
  let followingChannels = [];
  channelIds
    .map(channelId => ({
      id: channelId,
      ...channels[channelId],
      icon: channels[channelId].icon || defaultIcon
    }))
    .forEach(channel => {
      if (channel.ownerId === ownId || channel.owner_id === ownId) {
        yourChannels.push(channel);
      } else {
        if (
          channel.ownerId !== ownId &&
          channel.owner_id !== ownId &&
          channel.members
        ) {
          if (channel.members.includes(ownId)) {
            followingChannels.push(channel);
          }
        }
      }
    });

  const rooms = orderBy(
    roomIds.map(roomId => {
      const members = mapIdsToUsers(
        channels[roomId].members,
        users,
        defaultAvatar
      ).filter(m =>
        channels[roomId].members.length === 1 ? true : m.id !== ownId
      );

      return {
        id: roomId,
        ...channels[roomId],
        members
      };
    }),
    room => new Date(room.lastMessageAt),
    ["desc"]
  );

  const foundUsersMap = foundUsers.map(u => {
    return setRelationshipHandlers(
      u,
      relationships,
      dispatch,
      defaultAvatar,
      ownId
    );
  });

  const updateSelectedPageAndMain = page => {
    const pages = {
      channels: "/channels",
      friends: "/friends"
    };
    if (pages[page]) {
      if (friendsSearchFocus) {
        setFriendsSearchFocus(false);
      }
      history.push(pages[page]);
    } else {
      console.log("no such page exists.");
    }
  };

  const updateSelectedPanelPage = page => {
    const pages = {
      channels: "channels",
      friends: "friends"
    };
    if (pages[page]) {
      setSelectedPage(pages[page]);
    } else {
      console.log("no such page exists.");
    }
  };

  const handleSelectChannel = id => {
    if (selectedPage !== "channels") setSelectedPage("channels");
    history.push(`/channels/${id}/video`);
  };
  const handleSelectRoom = id => {
    dispatch(setLastMessageSeen({ channelId: id }));
    if (selectedPage !== "friends") setSelectedPage("friends");
    history.push(`/rooms/${id}/video`);
  };
  const handleOpenProfile = id => dispatch(openProfileModal(id));
  const handleCreateRoom = id => dispatch(openInviteModal(id, true));

  return (
    <Switch>
      <Route exact path="/channels">
        <LeftPanel
          yourChannels={yourChannels}
          followingChannels={followingChannels}
          userSearchResults={foundUsersMap}
          userSearchStatus={userSearchStatus}
          blocks={blocks}
          handleSearch={username => dispatch(searchUsers(username))}
          roomsResults={rooms}
          selected={selectedChannel}
          handleSelectChannel={handleSelectChannel}
          handleSelectRoom={handleSelectRoom}
          handleCreateChannel={() => history.push("/create")}
          handleProfile={handleOpenProfile}
          updateSelectedPage={updateSelectedPageAndMain}
          isCollapsed={isCollapsed}
          selectedPage="channels"
          handleCollapse={() => dispatch(toggleLeftPanel())}
          handleCreateRoom={() => handleCreateRoom(selectedChannel)}
          setFriendsSearchFocus={setFriendsSearchFocus}
          numberOfNotifications={numberOfNotifications}
        />
      </Route>
      <Route exact path="/friends">
        <LeftPanel
          yourChannels={yourChannels}
          followingChannels={followingChannels}
          userSearchResults={foundUsersMap}
          userSearchStatus={userSearchStatus}
          blocks={blocks}
          handleSearch={username => dispatch(searchUsers(username))}
          roomsResults={rooms}
          selected={selectedChannel}
          handleSelectChannel={handleSelectChannel}
          handleSelectRoom={handleSelectRoom}
          handleCreateChannel={() => history.push("/create")}
          handleProfile={handleOpenProfile}
          updateSelectedPage={updateSelectedPageAndMain}
          isCollapsed={isCollapsed}
          selectedPage="friends"
          handleCollapse={() => dispatch(toggleLeftPanel())}
          handleCreateRoom={() => handleCreateRoom(selectedChannel)}
          friendsSearchFocus={friendsSearchFocus}
          setFriendsSearchFocus={setFriendsSearchFocus}
          numberOfNotifications={numberOfNotifications}
        />
      </Route>
      <Route>
        <LeftPanel
          yourChannels={yourChannels}
          followingChannels={followingChannels}
          userSearchResults={foundUsersMap}
          userSearchStatus={userSearchStatus}
          blocks={blocks}
          handleSearch={username => dispatch(searchUsers(username))}
          roomsResults={rooms}
          selected={selectedChannel}
          handleSelectChannel={handleSelectChannel}
          handleSelectRoom={handleSelectRoom}
          handleCreateChannel={() => history.push("/create")}
          handleProfile={handleOpenProfile}
          updateSelectedPage={updateSelectedPanelPage}
          isCollapsed={isCollapsed}
          selectedPage={selectedPage}
          handleCollapse={() => dispatch(toggleLeftPanel())}
          handleCreateRoom={() => handleCreateRoom(selectedChannel)}
          setFriendsSearchFocus={setFriendsSearchFocus}
          numberOfNotifications={numberOfNotifications}
        />
      </Route>
    </Switch>
  );
}
