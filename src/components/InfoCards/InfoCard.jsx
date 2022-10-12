import React from "react";
import classnames from "classnames";

export default function InfoCard({
  avatar,
  controls,
  title,
  subtitle,
  subtitleColor = "black",
  subtitleSize = "xs",
  boldFont = false,
  backgroundColor = "transparent",
  hoverable = true,
  addBorder,
  padding = "none",
  cardClick,
  isLoading,
  badge = false
}) {
  const titleClasses = classnames("text-sm text-primaryText truncate", {
    "font-bold": boldFont
  });

  const subtitleClasses = classnames("truncate", {
    "text-secondaryText": subtitleColor === "gray",
    "text-primaryText": subtitleColor === "black",
    "font-bold": boldFont,
    "text-sm": subtitleSize === "sm",
    "text-xs": subtitleSize === "xs"
  });

  const containerClasses = classnames(
    "flex items-center rounded-lg px-2 m-2 cursor-pointer",
    {
      "py-2": padding === "sm",
      "py-1": padding === "xs",
      "py-0": padding === "none",
      "border border-highlightText": addBorder,
      "bg-primaryBackground": backgroundColor === "white",
      "bg-secondaryBackground": backgroundColor === "gray",
      "bg-highlightBackground": backgroundColor === "highlight",
      "hover:bg-highlightBackground duration-75": hoverable
    }
  );

  return (
    <>
      {isLoading === true ? (
        <div className="flex items-center rounded-lg px-2">
          <div className="flex animate-pulse space-x-4 w-full items-center">
            <div className="flex-shrink-0 rounded-full bg-gray-200 h-12 w-12" />
            <div className="flex flex-col w-full space-y-2">
              <div className="h-4 bg-gray-200 rounded w-11/12"></div>
              <div className="h-4 bg-gray-200 rounded w-2/4"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className={containerClasses}>
          <div
            className="relative flex items-center w-full"
            role={cardClick ? "button" : null}
            onClick={cardClick ? e => cardClick(e) : null}
          >
            {avatar}
            <div className="flex flex-col w-full mx-3 my-2 space-y-1 truncate">
              {title && subtitle ? (
                <>
                  <p className={titleClasses}>{title}</p>
                  <p className={subtitleClasses}>{subtitle}</p>
                  {badge === true && (
                    <div className="absolute flex items-center right-0 top-0 h-full w-3 m-3">
                      <div className="bg-gradient-r-button w-3 h-3 rounded-full mb-2" />
                    </div>
                  )}
                </>
              ) : (
                <p className={titleClasses}>{title}</p>
              )}
            </div>
          </div>
          <div className="flex-shrink-0">{controls && controls}</div>
        </div>
      )}
    </>
  );
}
