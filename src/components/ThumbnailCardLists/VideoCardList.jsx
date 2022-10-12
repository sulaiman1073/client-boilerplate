import React from "react";
import PropTypes from "prop-types";
import VideoCard from "../ThumbnailCards/VideoCard.jsx";

function VideoCardList({ videoList, isCollapsed, tabSelected, isLoading }) {
  const currentVideoList = [];
  videoList.forEach(type => currentVideoList.push(...type.channels));

  return (
    <div className="mx-6 my-8">
      {isLoading ? (
        <div
          className={`grid grid-cols-1 w-full gap-4 gap-y-12 lg:gap-y-16 md:gap-y-12 sm:gap-y-12 pb-5 ${
            isCollapsed
              ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          }`}
        >
          <VideoCard isLoading />
          <VideoCard isLoading />
          <VideoCard isLoading />
          <VideoCard isLoading />
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 w-full gap-4 gap-y-12 lg:gap-y-16 md:gap-y-12 sm:gap-y-12 pb-5 ${
            isCollapsed
              ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          }`}
        >
          {currentVideoList.map(video => (
            <VideoCard cardWidthClass="w-auto" key={video.id} {...video} />
          ))}
        </div>
      )}
    </div>
  );
}

VideoCardList.propTypes = {
  videoList: PropTypes.array
};

VideoCardList.defaultProps = {
  videoList: []
};

export default VideoCardList;
