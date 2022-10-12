import React from "react";
import DropDownContainer from "./DropDownContainer";
import ContainerHeader from "../ContainerHeader";
import FriendUsersList from "../InfoCardLists/FriendUsersList";
import ReactTooltip from "react-tooltip";
import strings from "../../helpers/localization";

export default function FriendRequests({ friendRequests, ...rest }) {
  return (
    <DropDownContainer>
      <ContainerHeader title={strings.friendRequestHeader} />
      <FriendUsersList users={friendRequests} {...rest} />
      <ReactTooltip
        effect="solid"
        backgroundColor="#F2F2F2"
        textColor="black"
        className="shadow-md rounded-md py-1 px-3 opacity-100"
        arrowColor="transparent"
      />
    </DropDownContainer>
  );
}
