import React from "react";

export default function AvatarIcon({
  avatar,
  username,
  imageClick,
  className = "",
  watching,
  tooltip,
  tooltipPlace
}) {
  const handleClick = event => {
    event.stopPropagation();
    imageClick();
  };

  const defaultClassName = "img w-12 h-12 rounded-circle";
  return (
    <div
      className={`rounded-circle flex-shrink-0 ${
        watching && "p-1 bg-gradient-r-primary"
      }`}
    >
      <div
        className={`rounded-circle ${watching && "p-1 bg-secondaryBackground"}`}
      >
        <img
          className={className ? className : defaultClassName}
          role="button"
          src={avatar}
          alt={`${username}'s avatar`}
          onClick={imageClick ? e => handleClick(e) : null}
          data-tip={tooltip}
          data-place={tooltipPlace}
        />
      </div>
    </div>
  );
}
