import React from "react";
import DropDownContainer from "./DropDownContainer";
import ContainerHeader from "../ContainerHeader";
import strings from "../../helpers/localization";
import Button from "../Controls/Button";

export default function FriendRequests({ friendRequests, ...rest }) {
  return (
    <DropDownContainer>
      <ContainerHeader title={strings.aboutSomething} />
      <div className="flex flex-col justify-center items-center h-auto w-full bg-primaryBackground py-2">
        <a href="https://twitter.com/abc" className="w-full px-4">
          <Button
            styleNone
            styleNoneContent={strings.twitter}
            styleNoneContentClassName="text-primaryText text-sm"
            className="py-2 hover:bg-highlightBackground rounded-lg duration-75 w-full"
          />
        </a>
        <a
          href="https://www.youtube.com/channel/something"
          className="w-full px-4"
        >
          <Button
            styleNone
            styleNoneContent={strings.youtube}
            styleNoneContentClassName="text-primaryText text-sm"
            className="py-2 hover:bg-highlightBackground rounded-lg duration-75 w-full"
          />
        </a>
        <a href="https://discord.gg/hdFfgg7" className="w-full px-4">
          <Button
            styleNone
            styleNoneContent={strings.discord}
            styleNoneContentClassName="text-primaryText text-sm"
            className="py-2 hover:bg-highlightBackground rounded-lg duration-75 w-full"
          />
        </a>
        <a href="https://about.something.com/" className="w-full px-4">
          <Button
            styleNone
            styleNoneContent={strings.sendFeedbackButton}
            styleNoneContentClassName="text-primaryText text-sm"
            className="py-2 hover:bg-highlightBackground rounded-lg duration-75 w-full"
          />
        </a>
      </div>
    </DropDownContainer>
  );
}
