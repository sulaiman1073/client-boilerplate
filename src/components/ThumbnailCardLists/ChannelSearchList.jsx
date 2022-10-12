import React from "react";
import PropTypes from "prop-types";
import ChannelSearchCard from "../ThumbnailCards/ChannelSearchCard.jsx";
import strings from "../../helpers/localization.js";

function ChannelSearchList({ channelList }) {
  function mapChannels(channels) {
    let channelSearchCards = [];
    for (let cid in channels) {
      channelSearchCards.push(
        <ChannelSearchCard key={cid} id={cid} {...channels[cid]} />
      );
    }
    return channelSearchCards;
  }
  return (
    <div className="my-8">
      <div>
        {Object.keys(channelList).length > 0 ? (
          <div>{mapChannels(channelList)}</div>
        ) : (
          <div className="flex items-center justify-center text-secondaryText w-full h-32">
            {strings.nothingToShow}
          </div>
        )}
      </div>
    </div>
  );
}

ChannelSearchList.propTypes = {
  channelList: PropTypes.object
};

ChannelSearchList.defaultProps = {
  channelList: {}
};

export default ChannelSearchList;
