import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import DropDownMenu from "./DropDowns/DropDownMenu";
import DeleteAccountDropDown from "./DropDowns/DeleteAccountDropDown";
import FriendRequests from "./DropDowns/FriendRequests";
// import Notifications from "./DropDowns/Notifications";
import FeedbackDropDown from "./DropDowns/FeedbackDropDown";
import DropDownControls from "./DropDowns/DropDownControls";
import Button from "./Controls/Button";
import strings from "../helpers/localization";

const SETTINGS = 1;
const ACCOUNT_SETTINGS = 2;
const DELETE_ACCOUNT = 3;

export default function SiteHeaderMain({
  userID,
  username,
  avatar,
  friendRequests,
  notifications,
  openProfileHandler,
  openBlockedUsersHandler,
  openEditInformationHandler,
  openChangePasswordHandler,
  clearNotificationsHandler,
  deleteAccountHandler,
  logoutHandler
}) {
  const [dropdownList, setDropdownList] = useState([]);

  const toggleSettings = () => {
    if (dropdownList.length > 0) {
      setDropdownList([]);
    } else {
      setDropdownList([SETTINGS]);
    }
  };

  const popDropdown = () => {
    setDropdownList(dropdownList.slice(0, -1));
  };

  const openBlockedUsersModal = () => {
    setDropdownList([]);
    openBlockedUsersHandler();
  };

  const openEditInformationModal = () => {
    setDropdownList([]);
    openEditInformationHandler();
  };

  const openChangePasswordModal = () => {
    setDropdownList([]);
    openChangePasswordHandler();
  };

  const settingsButtons = [
    {
      text: strings.accountSettings,
      onClick: () => setDropdownList([...dropdownList, ACCOUNT_SETTINGS])
    },
    {
      text: strings.blockedUsers,
      onClick: openBlockedUsersModal
    },
    {
      text: strings.logOut,
      onClick: logoutHandler,
      danger: true
    }
  ];

  const accountSettingsButtons = [
    {
      text: strings.editUserInformation,
      onClick: openEditInformationModal
    },
    {
      text: strings.changePassword,
      onClick: openChangePasswordModal
    } /*,
    {
      text: "Delete Account",
      onClick: () => setDropdownList([...dropdownList, DELETE_ACCOUNT]),
      danger: true
    }*/
  ];

  const settingsDropdown =
    dropdownList.length > 0 ? dropdownList[dropdownList.length - 1] : 0;

  return (
    <header className="sm:px-6 // relative flex items-center justify-between h-12 px-2 z-30 bg-primaryBackground select-none">
      <Link
        to="/channels"
        className="flex flex-shrink-0 items-center justify-center"
      >
        <Button
          imageButton
          imageButtonSrc={Logo}
          imageButtonClassName="w-10 h-10"
          analyticsString="Main Logo Button: SiteHeaderMain"
          hoverable
        />
      </Link>
      <div className="sm:space-x-6 // flex items-center space-x-2">
        <Button
          hoverable
          imageButton
          imageButtonSrc={avatar}
          imageButtonSpan={username}
          imageButtonClassName="w-8 h-8 mr-2 rounded-full object-cover"
          imageButtonSpanClassName="hidden sm:block text-sm"
          onClick={() => openProfileHandler(userID)}
          analyticsString="My Profile Button: SiteHeaderMain"
          className="flex "
        />
        <ul className="sm:space-x-6 // flex items-center space-x-2">
          <li>
            <DropDownControls
              icon="user-plus"
              hasNotification={friendRequests.length > 0}
            >
              <FriendRequests
                friendRequests={friendRequests}
                handleProfile={openProfileHandler}
              />
            </DropDownControls>
          </li>
          {/* <li>
            <DropDownControls
              icon="bell"
              className="relative"
              hasNotification={notifications.length > 0}
            >
              <Notifications
                notifications={notifications}
                handleProfile={openProfileHandler}
                handleClear={clearNotificationsHandler}
              />
            </DropDownControls>
          </li> */}
          <li className="hidden lg:block">
            <DropDownControls
              icon="cog"
              onClick={toggleSettings}
              onClose={() => setDropdownList([])}
            >
              {settingsDropdown === SETTINGS ? (
                <DropDownMenu
                  title={strings.settingsHeader}
                  buttons={settingsButtons}
                />
              ) : settingsDropdown === ACCOUNT_SETTINGS ? (
                <DropDownMenu
                  title={strings.accountSettings}
                  buttons={accountSettingsButtons}
                  handleBack={popDropdown}
                />
              ) : settingsDropdown === DELETE_ACCOUNT ? (
                <DeleteAccountDropDown
                  handleDelete={deleteAccountHandler}
                  handleBack={popDropdown}
                />
              ) : (
                <></>
              )}
            </DropDownControls>
          </li>
          <li className="hidden lg:block">
            <DropDownControls
              icon="info-circle"
              analyticsString="To about.popitalk Button: SiteHeaderMain"
            >
              <FeedbackDropDown />
            </DropDownControls>
          </li>
          <li className="block lg:hidden">
            <DropDownControls
              icon="bars"
              onClick={toggleSettings}
              onClose={() => setDropdownList([])}
            >
              <FeedbackDropDown />
              {settingsDropdown === SETTINGS ? (
                <DropDownMenu
                  title={strings.settingsHeader}
                  buttons={settingsButtons}
                />
              ) : settingsDropdown === ACCOUNT_SETTINGS ? (
                <DropDownMenu
                  title={strings.accountSettings}
                  buttons={accountSettingsButtons}
                  handleBack={popDropdown}
                />
              ) : settingsDropdown === DELETE_ACCOUNT ? (
                <DeleteAccountDropDown
                  handleDelete={deleteAccountHandler}
                  handleBack={popDropdown}
                />
              ) : (
                <></>
              )}
            </DropDownControls>
          </li>
        </ul>
      </div>
    </header>
  );
}
