import React from "react";
import strings from "../../helpers/localization";
import classnames from "classnames";

export default function ScrollableCardList({
  axis,
  displayControls,
  children
}) {
  const scrollableClasses = classnames({
    "flex-row": axis === "x",
    "flex-col": axis !== "x",
    "cursor-pointer": displayControls,
    "flex flex-grow overflow-auto px-4 py-4 items-start mozilla-thin-scrollbar": true
  });

  return (
    <div className="py-4">
      <p className="px-4 text-lg text-primaryText select-none">
        {strings.upNext}
      </p>
      <div className={scrollableClasses}>{children}</div>
    </div>
  );
}
