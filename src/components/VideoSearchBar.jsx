import React, { useState } from "react";
import sources, { DEFAULT_SOURCE } from "../helpers/videoSourceImages";
import Input from "./Controls/Input";
import Button from "./Controls/Button";
import strings from "../helpers/localization";

export default function VideoSearchBar({ className, onClick }) {
  const [source, setSource] = useState(DEFAULT_SOURCE);
  const [value, setValue] = useState("");

  const handleChangeSource = source => {
    setSource(source);
    onClick(value, source);
  };

  return (
    <div className="bg-secondaryBackground px-4 py-4">
      <form
        className={className ? className : "mb-2"}
        onSubmit={e => e.preventDefault()}
      >
        <Input
          variant="video"
          size="md"
          placeholder={strings.videoSearchInput}
          value={value}
          onChange={e => setValue(e.target.value)}
          videoSource={source}
          onClick={() => onClick(value, source)}
          className="w-full md:w-3/4"
        />
      </form>
      <div className="flex flex-shrink-0 overflow-x-auto my-2 grid-cols-services">
        {sources.map((img, idx) => {
          return (
            <Button
              key={idx}
              imageButton
              imageButtonSrc={img.icon}
              imageButtonSpan={img.active === true ? "" : "Coming soon"}
              imageButtonSpanClassName="absolute text-xs text-secondaryText"
              imageButtonClassName={`h-6 ${
                img.active === false && "opacity-25"
              }`}
              className={`relative flex justify-center mr-6 items-center flex-shrink-0 my-2 ${
                source === img.source && img.active === true
                  ? "bg-gradient-r-button shadow-md"
                  : "bg-primaryBackground cursor-default"
              } 
              ${
                img.active === false
                  ? "bg-secondaryBackground cursor-disable"
                  : "w-10"
              } w-10 h-10 rounded-full focus:outline-none`}
              onClick={() => handleChangeSource(img.source)}
              analyticsString={`${source} Source Button: VideoSearchBar`}
              disabled={img.active === true ? false : true}
            />
          );
        })}
      </div>
    </div>
  );
}
