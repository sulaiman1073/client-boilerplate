import React from "react";
import classnames from "classnames";
import Button from "./Button";
import YoutubeLogo from "../../assets/sources/youtube-logo.png";
import CrunchyrollLogo from "../../assets/sources/crunchyroll-logo.png";
import TwitchLogo from "../../assets/sources/twitch-logo.png";
import InstagramLogo from "../../assets/sources/instagram-logo.png";
import GfycatLogo from "../../assets/sources/gfycat-logo.png";
import FacebookLogo from "../../assets/sources/facebook-logo.png";
import SpotifyLogo from "../../assets/sources/spotify-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ControlHeader from "./ControlHeader";
import { getTextClass, getInputClasses } from "../../helpers/functions";

const sources = [
  { source: "Youtube", icon: YoutubeLogo },
  { source: "Crunchyroll", icon: CrunchyrollLogo },
  { source: "Twitch", icon: TwitchLogo },
  { source: "Instagram", icon: InstagramLogo },
  { source: "Gfycat", icon: GfycatLogo },
  { source: "Facebook", icon: FacebookLogo },
  { source: "Spotify", icon: SpotifyLogo }
];

const sourcesObj = {};

sources.forEach(source => {
  sourcesObj[source.source] = source.icon;
});

export default function Input({
  variant = "primary",
  shape = "regular",
  header,
  value = "",
  maxLength = 200,
  error,
  size = "sm",
  videoSource,
  interiorButton,
  forwardedRef,
  className,
  onClick = () => console.log("clicked"),
  ...rest
}) {
  const El = variant === "textarea" ? "textarea" : "input";
  const textClasses = getTextClass(size);

  const inputClasses = classnames(
    getInputClasses(shape, error),
    "relative bottom-0 py-2 px-4 rounded-md hover:shadow-md transition duration-100",
    textClasses,
    {
      "border-primaryBorder": error,
      "rounded-md px-3": shape === "pill",
      "pl-12 pr-12 rounded-md": variant === "video",
      "pl-3 pr-12 bg-secondaryBackground": variant === "user",
      "pl-3 pr-12": variant === "channel",
      "pr-20": variant === "counter" || variant === "textarea",
      "resize-none overflow-hidden h-32 pt-1": variant === "textarea",
      "pl-10": variant === "filter" || variant === "filterModal",
      "bg-secondaryBackground": variant === "filterModal"
    }
  );

  const counterClasses = classnames("absolute right-0 mr-2", textClasses, {
    "text-sm": size === "sm",
    "text-base": size === "md",
    "text-lg": size === "lg",
    "text-secondaryText": value.length < maxLength,
    "text-primaryText": value.length >= maxLength,
    "bottom-0 mb-2": variant === "textarea"
  });

  const iconClasses = classnames(
    "absolute left-0 ml-3 text-secondaryText z-10",
    textClasses
  );

  return (
    <div className={className}>
      <ControlHeader
        header={header}
        error={error}
        size={size}
        bold={variant !== "video"}
      />
      <div className="relative flex flex-row items-center">
        {(variant === "filter" || variant === "filterModal") && (
          <FontAwesomeIcon icon="search" className={iconClasses} />
        )}
        <El
          value={value}
          maxLength={maxLength}
          className={inputClasses}
          ref={forwardedRef}
          {...rest}
        />
        {interiorButton && (
          <div className="absolute right-0 mr-2 transition transform ease-in-out hover:scale-105 duration-100">
            {interiorButton}
          </div>
        )}
        {variant === "video" && (
          <>
            <img
              src={sourcesObj[videoSource]}
              alt={videoSource}
              className="img absolute left-0 ml-3 w-6 h-6 object-contain"
            />
            <Button
              actionButton
              icon="search"
              size="sm"
              background="secondary"
              className="absolute right-0 mr-3 hover:scale-110 shadow-none"
              onClick={onClick}
              analyticsString="Search Button: Input"
            />
          </>
        )}
        {(variant === "user" || variant === "channel") && (
          <>
            <Button
              actionButton
              icon="search"
              size="sm"
              background="secondary"
              className="absolute right-0 mr-2 hover:scale-110 shadow-none"
              onClick={onClick}
              analyticsString="Search Button: Input"
            />
          </>
        )}
        {(variant === "counter" || variant === "textarea") && (
          <>
            <p className={counterClasses}>{`${(value && value.length) || "0"}/${
              maxLength || "0"
            }`}</p>
          </>
        )}
      </div>
    </div>
  );
}
