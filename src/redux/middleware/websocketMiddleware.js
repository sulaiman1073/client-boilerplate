import {
  validateSession,
  refreshSession,
  login,
  logout,
  wsConnect,
  wsDisconnect,
  addMessageWs,
  deleteMessageWs,
  updateChannelWs,
  addPostWs,
  deletePostWs,
  likePostWs,
  unlikePostWs,
  addCommentWs,
  deleteCommentWs,
  likeCommentWs,
  unlikeCommentWs,
  addMemberWs,
  addMembersWs,
  deleteMemberWs,
  addAdminWs,
  deleteAdminWs,
  addBanWs,
  deleteBanWs,
  deleteSentFriendRequestWs,
  addReceivedFriendRequestWs,
  deleteReceivedFriendRequestWs,
  addFriendWs,
  deleteFriendWs,
  addBlockerWs,
  deleteBlockerWs,
  deleteChannelWs,
  addChannelWs,
  friendOnlineWs,
  friendOfflineWs,
  addVideoWs,
  deleteVideoWs,
  swapVideosWs
} from "../actions";

import { WS_EVENTS } from "../../helpers/constants";

const wsUrl =
  process.env.NODE_ENV !== "production"
    ? "ws://localhost:5000"
    : `wss://ws.popitalk.com`;

let socket;
// Timeout for heartbeat(), if it runs out, the socket is closed.
// Runs out if does not receive validateSession.fulfilled action in heartbeatInterval
let timeout;
let timeout2;
let reconnectionCount = 0;

const websocketMiddleware = () => store => next => action => {
  next(action);
  const actionType = action.type;
  // If there's a validateSession action which is fullfilled,
  // then a new webscoket is created, that connect to URL defined above
  // and if websocket is not already connected, so that 2 websockets wouldnt be opened.
  if (
    (actionType === validateSession.fulfilled.toString() ||
      actionType === login.fulfilled.toString() ||
      actionType === refreshSession.fulfilled.toString()) &&
    !store.getState().general.wsConnected
  ) {
    clearTimeout(timeout);
    clearTimeout(timeout2);
    reconnectionCount = 0;
    const wsTicket = action.payload.wsTicket;
    socket = new WebSocket(wsUrl, wsTicket);
    console.log(action);
    // An event listener to be called when the connection is opened.
    socket.onopen = () => {
      console.log("OPENED");
      reconnectionCount = 0;
      clearTimeout(timeout2);
    };

    // Logs an error if websocket is closed unexpectedly.
    socket.onerror = event => {
      console.log("event from onerror", event);
    };

    const heartbeat = () => {
      clearTimeout(timeout);
      // Enqueues data to be transmitted.
      socket.send(JSON.stringify({ type: WS_EVENTS.PONG }));
      // Refreshes timeout
      timeout = setTimeout(() => {
        socket.close();
      }, store.getState().general.heartbeatInterval + 1000);
    };

    // An event listener to be called when the connection is closed.
    socket.onclose = event => {
      console.log("Socket was closed");
      console.log("Event code: ", event.code);
      // Very likely there will be no reason provided.
      console.log("Reason: ", event.reason);
      console.log("Event from onclose: ", event);
      // clears timeout for disconnecting, because the socket is closed.
      clearTimeout(timeout);
      // sets state as disconnected.
      store.dispatch(wsDisconnect());
      // If socket has to reconnect, an interval for the session validations is set which tries to reconnect/validate session again.
      if (!socket.dontReconnect && reconnectionCount < 20) {
        // interval = setInterval(() => {
        //   // Calls api.validateSession(), if it's fullfiled, sets validatedSession Redux state to true
        //   store.dispatch(refreshSession());
        // }, 10000);
        timeout2 = setTimeout(() => {
          reconnectionCount++;
          store.dispatch(refreshSession());
        }, 10000);
      } else if (!socket.dontReconnect && reconnectionCount >= 20) {
        store.dispatch(logout());
      }
    };

    // An event listener to be called when a message is received from the server.
    socket.onmessage = ({ data: message }) => {
      // console logs for trying to find messages that don't arrive
      // console.log(JSON.parse(message));
      // if (JSON.parse(message).type === "ADD_MESSAGE")
      //   console.log({
      //     type: JSON.parse(message).type,
      //     content: JSON.parse(message)?.payload?.message?.content,
      //     author: JSON.parse(message)?.payload?.message?.author?.username
      //   });
      // It is parsed to JSON
      const parsedMessage = JSON.parse(message);
      const messageType = parsedMessage.type;
      const messagePayload = parsedMessage.payload;

      console.log("MESSAGE TYPE", messageType);
      // These functions are executed by messages received from the server.
      const commandHandler = {
        [WS_EVENTS.HELLO]() {
          store.dispatch(wsConnect(Number(messagePayload.heartbeatInterval)));
          heartbeat();
        },
        [WS_EVENTS.PING]() {
          heartbeat();
        },
        [WS_EVENTS.CHANNEL.ADD_MESSAGE]() {
          const { capacity } = store.getState().channels[
            messagePayload.channelId
          ].chatSettings;
          store.dispatch(addMessageWs({ ...messagePayload, capacity }));
        },
        [WS_EVENTS.CHANNEL.DELETE_MESSAGE]() {
          store.dispatch(deleteMessageWs(messagePayload));
        },
        [WS_EVENTS.CHANNEL.ADD_POST]() {
          store.dispatch(addPostWs(messagePayload));
        },
        [WS_EVENTS.CHANNEL.DELETE_POST]() {
          store.dispatch(deletePostWs(messagePayload));
        },
        [WS_EVENTS.CHANNEL.ADD_POST_LIKE]() {
          store.dispatch(likePostWs(messagePayload));
        },
        [WS_EVENTS.CHANNEL.DELETE_POST_LIKE]() {
          store.dispatch(unlikePostWs(messagePayload));
        },
        [WS_EVENTS.CHANNEL.ADD_COMMENT]() {
          store.dispatch(addCommentWs(messagePayload));
        },
        [WS_EVENTS.CHANNEL.DELETE_COMMENT]() {
          store.dispatch(deleteCommentWs(messagePayload));
        },
        [WS_EVENTS.CHANNEL.ADD_COMMENT_LIKE]() {
          store.dispatch(likeCommentWs(messagePayload));
        },
        [WS_EVENTS.CHANNEL.DELETE_COMMENT_LIKE]() {
          store.dispatch(unlikeCommentWs(messagePayload));
        },
        [WS_EVENTS.CHANNEL.ADD_MEMBER]() {
          store.dispatch(addMemberWs(messagePayload));
        },
        [WS_EVENTS.CHANNEL.ADD_MEMBERS]() {
          store.dispatch(addMembersWs(messagePayload));
        },
        [WS_EVENTS.CHANNEL.DELETE_MEMBER]() {
          store.dispatch(deleteMemberWs(messagePayload));
        },
        [WS_EVENTS.CHANNEL.ADD_ADMIN]() {
          store.dispatch(addAdminWs(messagePayload));
        },
        [WS_EVENTS.CHANNEL.DELETE_ADMIN]() {
          store.dispatch(deleteAdminWs(messagePayload));
        },
        [WS_EVENTS.CHANNEL.ADD_BAN]() {
          store.dispatch(addBanWs(messagePayload));
        },
        [WS_EVENTS.CHANNEL.DELETE_BAN]() {
          store.dispatch(deleteBanWs(messagePayload));
        },
        [WS_EVENTS.USER.DELETE_SENT_FRIEND_REQUEST]() {
          store.dispatch(deleteSentFriendRequestWs(messagePayload));
        },
        [WS_EVENTS.USER.ADD_RECEIVED_FRIEND_REQUEST]() {
          store.dispatch(addReceivedFriendRequestWs(messagePayload));
        },
        [WS_EVENTS.USER.DELETE_RECEIVED_FRIEND_REQUEST]() {
          store.dispatch(deleteReceivedFriendRequestWs(messagePayload));
        },
        [WS_EVENTS.USER.ADD_FRIEND]() {
          store.dispatch(addFriendWs(messagePayload));
        },
        [WS_EVENTS.USER.DELETE_FRIEND]() {
          store.dispatch(deleteFriendWs(messagePayload));
        },
        [WS_EVENTS.USER.ADD_BLOCKER]() {
          store.dispatch(addBlockerWs(messagePayload));
        },
        [WS_EVENTS.USER.DELETE_BLOCKER]() {
          store.dispatch(deleteBlockerWs(messagePayload));
        },
        [WS_EVENTS.CHANNEL.DELETE_CHANNEL]() {
          store.dispatch(deleteChannelWs(messagePayload));
        },
        [WS_EVENTS.USER.ADD_CHANNEL]() {
          store.dispatch(addChannelWs(messagePayload));
        },
        [WS_EVENTS.CHANNEL.UPDATE_CHANNEL]() {
          store.dispatch(updateChannelWs(messagePayload));
        },
        [WS_EVENTS.CHANNEL.SET_FRIEND_ONLINE]() {
          store.dispatch(friendOnlineWs(messagePayload));
        },
        [WS_EVENTS.CHANNEL.SET_FRIEND_OFFLINE]() {
          store.dispatch(friendOfflineWs(messagePayload));
        },
        [WS_EVENTS.VIDEO_CONTROL.ADD_VIDEO]() {
          store.dispatch(addVideoWs(messagePayload));
        },
        [WS_EVENTS.VIDEO_CONTROL.DELETE_VIDEO]() {
          store.dispatch(deleteVideoWs(messagePayload));
        },
        [WS_EVENTS.VIDEO_CONTROL.REORDER_QUEUE]() {
          store.dispatch(swapVideosWs(messagePayload));
        },
        [WS_EVENTS.CHANNEL.ADD_VIEWER]() {
          console.log("ADD VIEWER", messagePayload);
        },
        [WS_EVENTS.CHANNEL.DELETE_VIEWER]() {
          console.log("DELETE VIEWER");
        }
      };
      // If commandHandler.[computedPropertyMessageType] is defined, then this function is executed.
      // The functions are defined in commandHandler.
      if (commandHandler[messageType]) {
        commandHandler[messageType]();
      }
    };
  } else if (
    actionType === logout.fulfilled.toString() &&
    store.getState().general.wsConnected &&
    socket
  ) {
    // If user logs out, a dontRecconect prop is set to true so
    // that the interval which tries to validate the session
    // does not try to reconnect.
    console.log("LOGOUT SOCKET");
    socket.dontReconnect = true;
    socket.close();
  }
};

export default websocketMiddleware;
