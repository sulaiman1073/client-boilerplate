import {
  combineReducers,
  configureStore,
  getDefaultMiddleware
} from "@reduxjs/toolkit";
import generalReducer from "./reducers/general";
import apiReducer from "./reducers/api";
import selfReducer from "./reducers/self";
import channelsReducer from "./reducers/channels";
import postsReducer from "./reducers/posts";
import commentsReducer from "./reducers/comments";
import usersReducer from "./reducers/users";
import messagesReducer from "./reducers/messages";
import chatDraftsReducer from "./reducers/chatDrafts";
import postDraftsReducer from "./reducers/postDrafts";
import modalReducer from "./reducers/modal";
import userSearchReducer from "./reducers/userSearch";
import inviteReducer from "./reducers/invite";
import relationshipsReducer from "./reducers/relationships";
import userProfileReducer from "./reducers/userProfile";
import trendingChannelsReducer from "./reducers/trendingChannels";
import discoverChannelsReducer from "./reducers/discoverChannels";
import followingChannelsReducer from "./reducers/followingChannels";
import channelSearchReducer from "./reducers/channelSearch";
import uiReducer from "./reducers/ui";
import localstorageMiddleware from "./middleware/localstorageMiddleware";
import routingMiddleware from "./middleware/routingMiddleware";
import modalMiddleware from "./middleware/modalMiddleware";
import websocketMiddleware from "./middleware/websocketMiddleware";
import actionsMiddleware from "./middleware/actionsMiddleware";

const reducer = combineReducers({
  general: generalReducer,
  api: apiReducer,
  self: selfReducer,
  relationships: relationshipsReducer,
  channels: channelsReducer,
  users: usersReducer,
  messages: messagesReducer,
  posts: postsReducer,
  comments: commentsReducer,
  chatDrafts: chatDraftsReducer,
  postDrafts: postDraftsReducer,
  modal: modalReducer,
  userSearch: userSearchReducer,
  invite: inviteReducer,
  userProfile: userProfileReducer,
  ui: uiReducer,
  trendingChannels: trendingChannelsReducer,
  discoverChannels: discoverChannelsReducer,
  followingChannels: followingChannelsReducer,
  channelSearch: channelSearchReducer
});

const middleware = [
  actionsMiddleware(),
  localstorageMiddleware(),
  routingMiddleware(),
  modalMiddleware(),
  websocketMiddleware(),

  // process.env.NODE_ENV !== "production"
  //   ? websocketMiddleware("ws://localhost:4000/")
  //   : websocketMiddleware(
  //       `wss://${window.location.hostname}:${window.location.port}/ws/`
  //     ),
  ...getDefaultMiddleware()
];

const store = configureStore({
  reducer,
  middleware,
  devTools: true
  // devTools: process.env.NODE_ENV !== "production"
});

export default store;
