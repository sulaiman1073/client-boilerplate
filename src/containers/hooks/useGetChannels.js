import { useSelector } from "react-redux";

export default function useGetChannels() {
  let channelList = [];
  const followedChannels = useSelector(state => {
    return state.followingChannels.channels;
  });
  const trendingChannels = useSelector(state => {
    return state.trendingChannels.channels;
  });
  const discoverChannels = useSelector(state => {
    return state.discoverChannels.channels;
  });

  channelList = [
    { title: "Following", channels: followedChannels },
    { title: "Discover", channels: discoverChannels },
    { title: "Trending", channels: trendingChannels }
  ];

  return channelList;
}
