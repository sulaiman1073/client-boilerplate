import React from "react";
import classnames from "classnames";
import { getTextClass } from "../../helpers/functions";

export default function ControlHeader({ header, error, size, bold = true }) {
  const textClasses = getTextClass(size);
  const headerClasses = classnames("mb-1", textClasses, {
    "text-sm": size === "sm",
    "text-base": size === "md",
    "text-lg": size === "lg",
    "font-bold": bold
  });

  return (
    <>
      {header && (
        <h4 className={headerClasses}>
          {header}{" "}
          {error && (
            <span className="text-errorText text-xs font-bold">{error}</span>
          )}
        </h4>
      )}
    </>
  );
}
