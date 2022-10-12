import React from "react";
import Button from "../Controls/Button";
import strings from "../../helpers/localization";

export default function PanelHeader({
  handleCollapse,
  updateSelectedPage,
  selectedPage,
  numberOfNotifications
}) {
  return (
    <div className="flex bg-primaryBackground items-center w-full select-none space-x-4">
      <Button
        hoverable
        styleNone
        icon="bars"
        className="hidden sm:block p-4 ml-2 rounded-full text-secondaryText hover:text-highlightText"
        onClick={handleCollapse}
        analyticsString="Collapse Button: PanelHeader"
      />
      <nav
        className={`text-xl px-2 p-3 focus:outline-none hover:bg-secondaryBackground rounded-xl transition transform ease-in-out hover:scale-105 duration-100 ${
          selectedPage === "channels"
            ? "rainbow-text cursor-default font-semibold"
            : "text-secondaryText cursor-pointer font-regular"
        }`}
        onClick={() => updateSelectedPage("channels")}
      >
        {strings.channels}
      </nav>
      <nav
        className={`flex text-xl px-2 p-1 focus:outline-none hover:bg-secondaryBackground rounded-xl transition transform ease-in-out hover:scale-105 duration-100 ${
          selectedPage === "friends"
            ? "rainbow-text cursor-default font-semibold"
            : "text-secondaryText cursor-pointer font-regular"
        } `}
        onClick={() => updateSelectedPage("friends")}
      >
        {strings.friends}
        {numberOfNotifications !== 0 && (
          <span className="flex items-center justify-center bg-gradient-r-cancel rounded-full w-2 h-2 animate-bounce text-xs text-tertiaryText font-bold ml-2 mt-1" />
        )}
      </nav>
    </div>
  );
}
