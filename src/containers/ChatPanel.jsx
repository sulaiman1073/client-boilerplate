import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import ChatPanel from "../components/Chat/ChatPanel";
import { openListModal } from "../redux/actions";
import { createSelector } from "reselect";
import useIsMember from "../containers/hooks/useIsMember";

const selectChannelMessages = createSelector(
  (state, channelId) => state.channels[channelId].messages,
  (state, _) => state.messages,
  (messageIds, messages) => messageIds.map(msgId => messages[msgId])
);

// const messages = useSelector(state =>
//   selectFormattedMessages(state, channelId)
// );

function ChatPanelContainer(props) {
  const channelId = props.match.params.roomId || props.match.params.channelId;
  const channelMessages = useSelector(state =>
    selectChannelMessages(state, channelId)
  );
  const dispatch = useDispatch();
  const openFollowersList = () =>
    dispatch(openListModal(channelId, "followers"));
  const channel = useSelector(state => state.channels[channelId]);
  const ownId = useSelector(state => state.self.id);
  const followersCount = useSelector(
    state => state.channels[channelId]?.members?.length
  );
  const isRoom = !!props.match.params.roomId;
  const [isGifsOpen, setIsGifsOpen] = useState(false);
  const updateGifsOpen = () => {
    setIsGifsOpen(!isGifsOpen);
  };
  const isMember = useIsMember(channel.members, ownId);

  return (
    <ChatPanel
      channelMessages={channelMessages}
      channelId={channelId}
      openFollowersList={openFollowersList}
      followersCount={followersCount}
      isRoom={isRoom}
      updateGifsOpen={updateGifsOpen}
      isGifsOpen={isGifsOpen}
      isMember={isMember}
    />
  );
}

export default withRouter(ChatPanelContainer);
