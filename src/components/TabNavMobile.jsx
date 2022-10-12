import React from "react";
import Button from "./Controls/Button";

function TabNavMobile({ selectedPage, updateSelectedPage }) {
  return (
    <div className="flex fixed bg-primaryBackground w-full justify-around z-50 bottom-0 sm:hidden">
      <Button
        styleNone
        icon="tv"
        styleNoneIconClassName={`fa-2x ${
          selectedPage === "channels"
            ? "text-highlightText"
            : "text-secondaryButtonText"
        }`}
        onClick={() => updateSelectedPage("channels")}
        className="p-5"
        analyticsString="Channels Button: TabNavMobile"
      />
      <Button
        styleNone
        icon="globe"
        styleNoneIconClassName={`fa-2x ${
          selectedPage === "main"
            ? "text-highlightText"
            : "text-secondaryButtonText"
        }`}
        onClick={() => updateSelectedPage("main")}
        className="p-5"
        analyticsString="Main Button: TabNavMobile"
      />
      <Button
        styleNone
        icon="user-friends"
        styleNoneIconClassName={`fa-2x ${
          selectedPage === "friends"
            ? "text-highlightText"
            : "text-secondaryButtonText"
        }`}
        onClick={() => updateSelectedPage("friends")}
        className="p-5"
        analyticsString="Friends Button: TabNavMobile"
      />
    </div>
  );
}

export default TabNavMobile;
