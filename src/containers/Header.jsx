/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  login,
  logout,
  deleteAccount,
  openProfileModal,
  openEditUserSettingsModal,
  openChangePasswordModal,
  openBlockedUsersModal
} from "../redux/actions";
import { mapIdsToUsers, setRelationshipHandlers } from "../helpers/functions";
import SiteHeaderMain from "../components/SiteHeaderMain";
import SiteHeaderWelcome from "../components/SiteHeaderWelcome";

export default function HeaderContainer() {
  const { loggedIn } = useSelector(state => state.general);
  const { id, username, avatar } = useSelector(state => state.self);
  const { defaultAvatar } = useSelector(state => state.general);
  const relationships = useSelector(state => state.relationships);
  const users = useSelector(state => state.users);
  const loginApi = useSelector(state => state.api.loginApi);
  const history = useHistory();

  const dispatch = useDispatch();
  const deleteAccountDispatcher = useCallback(() => dispatch(deleteAccount()), [
    dispatch
  ]);

  useEffect(() => {
    if (loginApi.status === "success") {
      history.push("/channels");
    }
  }, [history, loginApi]);

  const friendRequests = mapIdsToUsers(
    [
      ...relationships.receivedFriendRequests,
      ...relationships.sentFriendRequests
    ],
    users,
    defaultAvatar
  ).map(u => {
    return setRelationshipHandlers(
      u,
      relationships,
      dispatch,
      defaultAvatar,
      id
    );
  });

  if (loggedIn) {
    return (
      <SiteHeaderMain
        userID={id}
        username={username}
        avatar={avatar || defaultAvatar}
        friendRequests={friendRequests}
        notifications={[]}
        openProfileHandler={id => dispatch(openProfileModal(id))}
        openBlockedUsersHandler={() => dispatch(openBlockedUsersModal())}
        openEditInformationHandler={() => dispatch(openEditUserSettingsModal())}
        openChangePasswordHandler={() => dispatch(openChangePasswordModal())}
        clearNotificationsHandler={() => console.log("clear notifications")}
        deleteAccountHandler={deleteAccountDispatcher}
        logoutHandler={() => {
          dispatch(logout());
          history.push("/");
        }}
      />
    );
  } else {
    const handleLogin = (username, password) => {
      dispatch(
        login({
          usernameOrEmail: username,
          password: password
        })
      );
    };

    return (
      <SiteHeaderWelcome
        apiLoading={loginApi.loading}
        apiError={loginApi.status === "error" ? loginApi.error : false}
        dispatchLogin={handleLogin}
      />
    );
  }
}
