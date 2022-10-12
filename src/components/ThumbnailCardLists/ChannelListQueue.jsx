import React from "react";
import SortableList from "./SortableList";
import VideoMinimalQueueCard from "../ThumbnailCards/VideoMinimalQueueCard";

export default function ChannelListQueue({
  playlist,
  handleChange,
  handleDeleteVideo,
  handleFindMore
}) {
  const itemRenderer = value => (
    <VideoMinimalQueueCard
      {...value}
      handleRemove={() => handleDeleteVideo(value.id)}
    />
  );

  return (
    <SortableList
      items={playlist}
      itemRenderer={itemRenderer}
      handlerChange={handleChange}
      distance={1}
    >
      <VideoMinimalQueueCard handleFindMore={handleFindMore} />
    </SortableList>
  );
}
