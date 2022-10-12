import React, { createRef, Component } from "react";
import { connect } from "react-redux";
import sortBy from "lodash/sortBy";
import Helmet from "react-helmet";
import { v4 as uuidv4 } from "uuid";
import { Redirect, withRouter } from "react-router-dom";
import {
  addMessage,
  getChannel,
  visitAndLeaveChannel,
  updateChannel,
  makeAdmin,
  deleteAdmin,
  addBan,
  deleteBan,
  openProfileModal,
  openDeleteChannelModal,
  searchVideos,
  addVideo,
  deleteVideo,
  swapVideos,
  setPlaying,
  setAlert,
  getTrending
} from "../../redux/actions";
// import ChannelHeader from "../../components/ChannelHeader";
import ChannelHeaderContainer from "./ChannelHeaderContainer";
import VideoPanel from "./VideoPanel";
import ForumPanel from "./ForumPanel";
import ChannelSettingsPanel from "../../components/Channel/ChannelSettingsPanel";
import ChannelQueue from "../../components/Channel/ChannelQueue";
import VideoSearch from "../../components/VideoSearch";
import { mapIdsToUsers } from "../../helpers/functions";
import {
  calculatePlayerStatus,
  calculateNextPlayerStatus,
  defaultPlayerStatus,
  LOOP
} from "../../helpers/videoSyncing";
import strings from "../../helpers/localization";
import { DEFAULT_SOURCE } from "../../helpers/videoSourceImages";

const CHANNEL_TYPE = "channel";
const ROOM_TYPE = "room";

const VIDEO_TAB = "video";
const POSTS_TAB = "channel";
const QUEUE_TAB = "queue";
const SETTINGS_TAB = "settings";

const HEADER_HEIGHT = 96; // The height of the website header + channel header

const mapStateToProps = (state, { match }) => {
  const { channelId, roomId, tab } = match.params;
  const finalId = channelId || roomId;

  const { defaultIcon, defaultAvatar } = state.general;
  const channel = state.channels[finalId];
  const channelApi = state.api.channel;
  const { id: ownId, username: ownUsername } = state.self;
  const users = state.users;

  const validTabs = [VIDEO_TAB, POSTS_TAB, QUEUE_TAB, SETTINGS_TAB];

  const startPlayerStatus = channel
    ? {
        videoStartTime: channel.videoStartTime,
        queueStartPosition: channel.queueStartPosition,
        clockStartTime: channel.clockStartTime,
        status: channel.status
      }
    : defaultPlayerStatus();

  return {
    channelId: finalId,
    defaultIcon,
    defaultAvatar,
    channel: channel ? channel : {},
    startPlayerStatus: startPlayerStatus,
    playlist: channel ? channel.queue : [],
    trendingResults: state.general.trendingResults,
    channelApi,
    ownId,
    ownUsername,
    users,
    tab: tab && validTabs.includes(tab) ? tab : VIDEO_TAB,
    type: channelId ? CHANNEL_TYPE : ROOM_TYPE
  };
};

const mapDispatchToProps = (dispatch, { match }) => {
  const channelId = match.params.channelId || match.params.roomId;

  return {
    handleSend: video =>
      dispatch(
        addMessage({
          id: uuidv4(),
          channelId,
          content: "Asking the admin to play something fun!",
          upload: "system",
          createdAt: new Date().toString(),
          author: {
            id: "",
            username: "this.props.ownUsername",
            avatar: null
          }
        })
      ),
    handleChannelFormSubmit: values =>
      dispatch(updateChannel({ channelId, ...values })),
    handleAddAdmin: userId => dispatch(makeAdmin({ channelId, userId })),
    handleRemoveAdmin: userId => dispatch(deleteAdmin({ channelId, userId })),
    handleAddBan: bannedId => dispatch(addBan({ channelId, bannedId })),
    handleRemoveBan: bannedId => dispatch(deleteBan({ channelId, bannedId })),
    openProfileModal: id => dispatch(openProfileModal(id)),
    handleSearch: (terms, source, next = false) =>
      dispatch(searchVideos({ channelId, source, terms, next })),
    handleGetTrending: (next, source) =>
      dispatch(getTrending({ next, source })),
    handleAddVideo: videoInfo =>
      dispatch(addVideo({ channelId, ...videoInfo })),
    handleDeleteVideo: channelVideoId =>
      dispatch(deleteVideo({ channelId, channelVideoId })),
    handleSwapVideos: ({ oldIndex, newIndex }) =>
      dispatch(swapVideos({ channelId, oldIndex, newIndex })),
    handleGetChannel: leave => dispatch(getChannel({ channelId, leave })),
    handleVisitAndLeave: visitAndLeaveInfo =>
      dispatch(visitAndLeaveChannel(visitAndLeaveInfo)),
    openDeleteChannelModal: () => dispatch(openDeleteChannelModal(channelId)),
    handleChannelNotFound: () =>
      dispatch(setAlert("The channel / room you entered does not exist.")),
    dispatchPlay: (queueStartPosition, videoStartTime) =>
      dispatch(setPlaying({ channelId, queueStartPosition, videoStartTime }))
  };
};

class Channel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      queueList: this.props.playlist,
      playerStatus: this.props.startPlayerStatus,
      searchTerm: "",
      source: DEFAULT_SOURCE.toLowerCase(),
      scrollToSearch: false,
      forceScroll: false
    };

    this.scrollRef = createRef();
    this.channelRef = createRef();
    this.searchRef = createRef();

    this.playNextVideo = this.playNextVideo.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(term, source, next) {
    source = source ? source : this.state.source;
    source = source.toLowerCase();
    if (source !== this.state.source) {
      this.setState({ source });
    }

    if (term !== null) {
      this.setState({
        searchTerm: term.trim()
      });
    } else {
      term = this.state.searchTerm;
    }

    if (term !== "") {
      this.props.handleSearch(term, source, next);
    } else {
      this.props.handleGetTrending(next, source);
    }
  }

  scrollToSearch() {
    this.scrollRef.current.scrollTo({
      top: this.searchRef.current.offsetTop - HEADER_HEIGHT,
      behavior: "smooth"
    });
    this.setState({
      scrollToSearch: false
    });
  }

  pickRoomName() {
    const room = this.props.channel;
    const users = this.props.users;
    const ownId = this.props.ownId;

    let roomName = "";
    if (room.name) {
      roomName = room.name;
    } else if (room.type === "friend") {
      roomName =
        users[room.members.filter(userId => userId !== ownId)[0]].username;
    } else if (room.type === "self") {
      roomName = this.props.ownUsername;
    } else if (room.type === "group") {
      roomName = sortBy(room.members, userId =>
        users[userId].username.toLowerCase()
      )
        .map(userId => users[userId].username)
        .join(", ");
    }
    return roomName;
  }

  mapVideoStatuses(playlist, currPosition, status) {
    return playlist.map((v, i) => {
      let videoStatus = "queued";
      if (i < currPosition) {
        videoStatus = "ended";
      } else if (i === currPosition) {
        videoStatus = status.toLowerCase();
      }

      return {
        ...v,
        status: videoStatus
      };
    });
  }

  playNextVideo() {
    let nextPosition = this.state.playerStatus.queueStartPosition + 1;
    if (nextPosition === this.props.playlist.length && LOOP) {
      nextPosition = 0;
    }

    if (this.props.playlist.length > nextPosition) {
      let newQueueList = null;
      if (nextPosition === 0) {
        // Reset video statuses when restarting playlist from beginning
        newQueueList = this.mapVideoStatuses(
          this.props.playlist,
          nextPosition,
          this.state.playerStatus.status
        );
      } else {
        newQueueList = [...this.state.queueList];
        newQueueList[
          nextPosition
        ].status = this.state.playerStatus.status.toLowerCase();
        newQueueList[nextPosition - 1].status = "ended";
      }

      const nextPlayerStatus = calculateNextPlayerStatus(
        this.props.startPlayerStatus,
        this.props.playlist,
        nextPosition
      );

      this.setState({
        playerStatus: {
          ...this.state.playerStatus,
          ...nextPlayerStatus
        },
        queueList: newQueueList
      });
    } else {
      // End the stream if the channel doesn't loop
      let newQueueList = [...this.state.queueList];
      newQueueList[nextPosition - 1].status = "ended";

      this.setState({
        playerStatus: {
          ...this.state.playerStatus,
          queueStartPosition: 0,
          videoStartTime: 0,
          status: "Ended"
        },
        queueList: newQueueList
      });
    }
  }

  setPlayerStatus() {
    const playerStatus = calculatePlayerStatus(
      this.props.startPlayerStatus,
      this.props.playlist
    );

    this.setState({
      playerStatus: {
        channelId: this.props.channelId,
        ...playerStatus
      },
      queueList: this.mapVideoStatuses(
        this.props.playlist,
        playerStatus.queueStartPosition,
        playerStatus.status
      )
    });

    if (this.props.trendingResults.results.length === 0) {
      this.props.handleGetTrending(false, this.state.source);
    }
  }

  componentDidMount() {
    if (!this.props.channel?.loaded) {
      this.props.handleGetChannel();
    } else if (!this.state.playerStatus.channelId) {
      this.setPlayerStatus();
      this.props.handleVisitAndLeave({
        visit: this.props.channelId
      });
    }

    this.setState({
      forceScroll: true
    });
  }

  componentWillUnmount() {
    this.props.handleVisitAndLeave({
      leave: this.props.channelId
    });
  }

  componentDidUpdate(prevProps) {
    const loadChannel =
      prevProps.channelId !== this.props.channelId ||
      ((prevProps.tab === QUEUE_TAB || prevProps.tab === SETTINGS_TAB) &&
        this.props.tab !== QUEUE_TAB &&
        this.props.tab !== SETTINGS_TAB);
    if (loadChannel) {
      this.setState({
        searchTerm: ""
      });
    }

    if (
      prevProps.channelId !== this.props.channelId &&
      !this.props.channel?.loaded
    ) {
      this.props.handleGetChannel(prevProps.channelId);
    } else if (
      (!prevProps.channel && this.props.channel) ||
      (!prevProps.channel.loaded && this.props.channel.loaded) ||
      prevProps.startPlayerStatus.queueStartPosition !==
        this.props.startPlayerStatus.queueStartPosition ||
      prevProps.startPlayerStatus.videoStartTime !==
        this.props.startPlayerStatus.videoStartTime ||
      prevProps.startPlayerStatus.status !==
        this.props.startPlayerStatus.status ||
      prevProps.startPlayerStatus.clockStartTime !==
        this.props.startPlayerStatus.clockStartTime ||
      loadChannel
    ) {
      this.setPlayerStatus();
    } else if (prevProps.playlist !== this.props.playlist) {
      this.setState({
        queueList: this.mapVideoStatuses(
          this.props.playlist,
          this.state.playerStatus.queueStartPosition,
          this.state.playerStatus.status
        )
      });
    }

    if (
      (prevProps.tab !== this.props.tab || this.state.forceScroll) &&
      this.scrollRef.current
    ) {
      const tab = this.props.tab;

      if (tab === VIDEO_TAB) {
        this.scrollRef.current.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      } else if (tab === POSTS_TAB) {
        this.scrollRef.current.scrollTo({
          top: this.channelRef.current.offsetTop + 6,
          behavior: "smooth"
        });
      } else if (tab === SETTINGS_TAB || tab === QUEUE_TAB) {
        if (tab === QUEUE_TAB && this.state.scrollToSearch) {
          this.scrollToSearch();
        } else {
          this.scrollRef.current.scrollTo({ top: 0 });
        }
      }

      this.setState({
        forceScroll: false
      });
    }

    if (
      this.props.channelId !== prevProps.channelId &&
      this.props.channel?.loaded &&
      prevProps.channel?.loaded
    ) {
      this.props.handleVisitAndLeave({
        leave: prevProps.channelId,
        visit: this.props.channelId
      });
    }
  }

  render() {
    const channelApi = this.props.channelApi;
    const channel = this.props.channel;
    const tab = this.props.tab;

    if (
      channelApi.status !== "loading" &&
      channelApi.status !== "initial" &&
      !channel
    ) {
      this.props.handleChannelNotFound();
      return <Redirect to="/channels" />;
    }

    const loading = channel?.loaded ? false : true;
    if (loading || this.state.playerStatus.channelId !== this.props.channelId) {
      return <></>;
    }
    const channelId = this.props.channelId;
    const ownId = this.props.ownId;
    const type = this.props.type;
    const defaultIcon = this.props.defaultIcon;
    const defaultAvatar = this.props.defaultAvatar;
    const handleDeleteVideo = this.props.handleDeleteVideo;
    const handleAddVideo = videoData => {
      this.props.handleAddVideo(videoData);
      this.scrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
    const handleSwapVideos = this.props.handleSwapVideos;

    const admins = channel.admins
      ? mapIdsToUsers(channel.admins, this.props.users, defaultAvatar)
      : [];
    const users = this.props.users;

    const editor =
      channel.ownerId === ownId || admins.find(a => a.id === ownId);
    const isOwner = channel.ownerId === ownId;
    const isMember = channel.members
      ? !!channel.members.filter(memberId => memberId === ownId).length
      : null;
    const isAdmin =
      channel.type !== "channel" ? false : channel.admins.includes(ownId);

    const handleSearch = this.handleSearch;
    let searchResults = this.props.trendingResults.results;
    let totalResults = this.props.trendingResults.totalResults;
    if (this.state.searchTerm !== "") {
      searchResults = channel.videoSearch.results;
      totalResults = channel.videoSearch.totalResults;
    }
    const displayControls =
      channel.type === "channel"
        ? channel.admins.find(a => a === ownId)
        : ownId;

    let handleNothingPlaying = null;
    if (type === ROOM_TYPE) {
      handleNothingPlaying = () => this.scrollToSearch();
    } else if (displayControls) {
      handleNothingPlaying = () => {
        this.props.history.push(`/channels/${channelId}/${QUEUE_TAB}`);
      };
    } else {
      handleNothingPlaying = video => {
        this.props.handleSend();
      };
    }

    return (
      <>
        <div className="flex flex-col bg-secondaryBackground w-full overflow-x-hidden">
          {/* Channel & Room structure */}
          <div className="w-full h-12 bg-primaryBackground">
            <ChannelHeaderContainer
              channelId={channelId}
              isMember={isMember}
              isAdmin={isAdmin}
              status={this.state.playerStatus.status.toLowerCase()}
            />
          </div>
          <div
            ref={this.scrollRef}
            className={`flex flex-col overflow-x-hidden h-full ${this.props.searchClasses}`}
          >
            {(tab === VIDEO_TAB || tab === POSTS_TAB) && (
              <>
                <VideoPanel
                  channelId={channelId}
                  dispatchPlay={this.props.dispatchPlay}
                  handleDeleteVideo={handleDeleteVideo}
                  handleSwapVideos={handleSwapVideos}
                  handlePlayNextVideo={this.playNextVideo}
                  handleFindMore={() => {
                    if (type === CHANNEL_TYPE) {
                      this.props.history.push(
                        `/channels/${channelId}/${QUEUE_TAB}`
                      );
                      this.setState({
                        scrollToSearch: true
                      });
                    } else {
                      this.scrollToSearch();
                    }
                  }}
                  handleNothingPlaying={handleNothingPlaying}
                  displayControls={displayControls}
                  playlist={this.state.queueList}
                  playerStatus={this.state.playerStatus}
                  isChannel={type === CHANNEL_TYPE && true}
                  classNames="pt-0"
                />
                {type === CHANNEL_TYPE && (
                  <ForumPanel
                    ref={this.channelRef}
                    channelId={this.props.channelId}
                    isMember={isMember}
                    isAdmin={isAdmin}
                    isOwner={isOwner}
                    status={this.state.playerStatus.status.toLowerCase()}
                  />
                )}
                {type === ROOM_TYPE && (
                  <VideoSearch
                    ref={this.searchRef}
                    searchTerm={this.state.searchTerm}
                    searchResults={searchResults}
                    totalResults={totalResults}
                    handleSearch={handleSearch}
                    handleAddVideo={handleAddVideo}
                  />
                )}
              </>
            )}
            {tab === QUEUE_TAB && (
              <ChannelQueue
                ref={this.searchRef}
                name={channel.name}
                icon={channel.icon || defaultIcon}
                searchTerm={this.state.searchTerm}
                searchResults={searchResults}
                totalResults={totalResults}
                handleSearch={handleSearch}
                handleAddVideo={handleAddVideo}
                queue={this.state.queueList}
                handleSwapVideos={handleSwapVideos}
                handleDeleteVideo={handleDeleteVideo}
                handleFindMore={() => this.scrollToSearch()}
              />
            )}
            {tab === SETTINGS_TAB && (
              <ChannelSettingsPanel
                ownerId={channel.ownerId}
                followers={mapIdsToUsers(channel.members, users, defaultAvatar)}
                admins={admins}
                bannedUsers={mapIdsToUsers(
                  channel.banned,
                  users,
                  defaultAvatar
                )}
                initialChannelForm={{
                  ...channel,
                  private: !channel.public,
                  category: ""
                }}
                handleChannelFormSubmit={values =>
                  this.props.handleChannelFormSubmit(values)
                }
                channelFormLoading={channelApi.loading}
                channelFormError={
                  channelApi.status === "error" ? channelApi.error : false
                }
                addAdminHandler={this.props.handleAddAdmin}
                removeAdminHandler={this.props.handleRemoveAdmin}
                addBanHandler={this.props.handleAddBan}
                removeBanHandler={this.props.handleRemoveBan}
                handleProfile={id => this.props.openProfileModal(id)}
                openDeleteChannelModal={this.props.openDeleteChannelModal}
              />
            )}
          </div>
        </div>
        {tab !== SETTINGS_TAB && <>{this.props.chatPanel}</>}
        {/* Google Search Index & SEO */}
        <Helmet>
          <meta charSet="UFT-8" />
          <title>
            {this.pickRoomName()} · {strings.mainTitle}
          </title>
          <meta
            name="description"
            content={channel.description + " " + strings.mainDescription}
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="keywords" content={strings.mainKeywords} />
        </Helmet>
      </>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Channel)
);
