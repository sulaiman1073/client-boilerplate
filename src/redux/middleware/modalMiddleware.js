// import {
//   createRoom,
//   addRoomMembers,
//   deleteChannel,
//   closeAllModals
// } from "../actions";

const modalMiddleware = () => store => next => action => {
  next(action);

  //  if (createRoom.fulfilled.match(action)) {
  //     store.dispatch(closeAllModals());
  //   } else if (inviteFriends.fulfilled.match(action)) {
  //     store.dispatch(closeAllModals());
  //   }
};

export default modalMiddleware;
