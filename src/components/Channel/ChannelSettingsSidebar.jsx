import React from "react";
import ButtonsList from "../Controls/ButtonsList";
import MenuButton from "../Controls/MenuButton";
import strings from "../../helpers/localization";

export default function ChannelSettingsSidebar({
  buttons,
  openDeleteChannelModal
}) {
  return (
    <div className="h-full py-8 px-6 justify-center bg-secondaryBackground rounded-xl shadow-xs flex flex-col justify-between">
      <ButtonsList buttons={buttons} />
      <MenuButton
        danger={true}
        text={strings.deleteChannel}
        onClick={openDeleteChannelModal}
      />
    </div>
  );
}
