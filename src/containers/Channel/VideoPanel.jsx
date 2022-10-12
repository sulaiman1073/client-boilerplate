import React, { Component } from "react";
import { connect } from "react-redux";
import {
  openInviteModal,
  openProfileModal,
  openSocialShareModal,
  setPaused,
  setVolume
} from "../../redux/actions";
import { mapIdsToUsers } from "../../helpers/functions";
import VideoSection from "../../components/VideoSection";
import QueueSection from "../../components/ThumbnailCardLists/QueueSection";
import VideoPanelCard from "../../components/ThumbnailCards/VideoPanelCard";
import ScrollableCardList from "../../components/ThumbnailCardLists/ScrollableCardList";

const mapStateToProps = (state, { channelId }) => {
  const { defaultAvatar, volume } = state.general;
  const channel = state.channels[channelId];
  const viewerIds = channel.viewers;
  const users = state.users;
  const viewers = viewerIds
    ? mapIdsToUsers(viewerIds, users, defaultAvatar)
    : [];

  return {
    viewers: viewers,
    isInvitingAllowed: channel.type === "group",
    volume: volume
  };
};

const mapDispatchToProps = (dispatch, { channelId }) => ({
  openInviteModal: () => dispatch(openInviteModal(channelId, false)),
  openSocialShareModal: () => dispatch(openSocialShareModal(channelId, false)),
  openProfileModal: id => dispatch(openProfileModal(id)),
  dispatchPause: (queueStartPosition, videoStartTime) =>
    dispatch(setPaused({ channelId, queueStartPosition, videoStartTime })),
  setVolume: volume => dispatch(setVolume(volume))
});

class VideoPanel extends Component {
  constructor(props) {
    super(props);

    this.handleSkip = this.handleSkip.bind(this);
  }

  handleSkip(id = null, s = 0) {
    const index = id
      ? this.props.playlist.findIndex(v => v.id === id)
      : this.props.playerStatus.queueStartPosition;

    if (this.props.playerStatus.status === "Playing") {
      this.props.dispatchPlay(index, s);
    } else {
      this.props.dispatchPause(index, s);
    }
  }

  render() {
    let video = null;
    if (this.props.playerStatus.channelId === this.props.channelId) {
      video = this.props.playlist[this.props.playerStatus.queueStartPosition];
    }

    return (
      <div className={this.props.classNames}>
        <VideoSection
          {...video}
          playerStatus={this.props.playerStatus}
          activeFriendViewers={this.props.viewers}
          inviteUsers={() => this.props.openInviteModal()}
          socialShare={() => this.props.openSocialShareModal()}
          openProfile={id => this.props.openProfileModal(id)}
          isInvitingAllowed={this.props.isInvitingAllowed}
          displayControls={this.props.displayControls}
          volume={this.props.volume}
          setVolume={this.props.setVolume}
          dispatchPlay={this.props.dispatchPlay}
          dispatchPause={this.props.dispatchPause}
          dispatchSkip={s => this.handleSkip(null, s)}
          dispatchPlayNextVideo={this.props.handlePlayNextVideo}
          handleNothingPlaying={this.props.handleNothingPlaying}
          isChannel={this.props.isChannel}
        />
        {this.props.displayControls ? (
          <QueueSection
            queueList={this.props.playlist}
            handlerChange={this.props.handleSwapVideos}
            handleSkip={this.handleSkip}
            handleDeleteVideo={this.props.handleDeleteVideo}
            handleFindMore={this.props.handleFindMore}
          />
        ) : (
          <ScrollableCardList axis="x">
            {this.props.playlist.map(value => (
              <VideoPanelCard
                {...value}
                key={value.id}
                size="sm"
                type="none"
                className="mr-2"
              />
            ))}
          </ScrollableCardList>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoPanel);
