import YoutubeLogo from "../assets/sources/youtube-logo.png";
import CrunchyrollLogo from "../assets/sources/crunchyroll-logo.png";
import TwitchLogo from "../assets/sources/twitch-logo.png";
import InstagramLogo from "../assets/sources/instagram-logo.png";
import GfycatLogo from "../assets/sources/gfycat-logo.png";
import FacebookLogo from "../assets/sources/facebook-logo.png";
import SpotifyLogo from "../assets/sources/spotify-logo.png";

export const DEFAULT_SOURCE = "Youtube";

const sources = [
  { source: "Youtube", icon: YoutubeLogo, active: true },
  { source: "Crunchyroll", icon: CrunchyrollLogo, active: false },
  { source: "Twitch", icon: TwitchLogo, active: false },
  { source: "Instagram", icon: InstagramLogo, active: false },
  { source: "Gfycat", icon: GfycatLogo, active: false },
  { source: "Facebook", icon: FacebookLogo, active: false },
  { source: "Spotify", icon: SpotifyLogo, active: false }
];

export default sources;
