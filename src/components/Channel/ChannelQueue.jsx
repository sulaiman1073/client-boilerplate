import React from "react";
import VideoSearch from "../VideoSearch";
import ChannelListQueue from "../ThumbnailCardLists/ChannelListQueue";
import strings from "../../helpers/localization";

function ChannelQueue(
  {
    queue,
    handleSwapVideos,
    handleDeleteVideo,
    searchTerm,
    searchResults = [],
    totalResults,
    handleSearch,
    handleFindMore,
    handleAddVideo
  },
  ref
) {
  return (
    <div className="flex flex-col bg-secondaryBackground">
      <div className="px-4 my-4">
        <h2 className="text-2xl text-primaryText">{strings.manageUpNext}</h2>
        <p className="text-sm text-secondaryText">{strings.upNextSubtitle}</p>
      </div>
      <ChannelListQueue
        playlist={queue}
        handleChange={handleSwapVideos}
        handleDeleteVideo={handleDeleteVideo}
        handleFindMore={handleFindMore}
      />
      <VideoSearch
        ref={ref}
        searchTerm={searchTerm}
        searchResults={searchResults}
        totalResults={totalResults}
        handleSearch={handleSearch}
        handleAddVideo={handleAddVideo}
      />
    </div>
  );
}

export default React.forwardRef(ChannelQueue);
