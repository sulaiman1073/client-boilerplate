import React from "react";
import DescriptionCard from "./DescriptionCard";

export default function SignupSection({ id }) {
  return (
    <div className="w-full h-auto bg-gradient-r-primary pb-8">
      <div className="flex flex-col w-full h-full bg-primaryBackground shadow-lg rounded-b-lg sm:p-20 p-4">
        <div className="flex flex-col w-full justify-center items-center my-8">
          <h1 className="text-3xl font-bold text-primaryText sm:p-12 p-4">
            Watch Videos and listen to Music, together.
          </h1>
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full gap-4 gap-y-12 lg:gap-y-16 md:gap-y-12 sm:gap-y-12 py-8 px-0 md:px-20">
            <DescriptionCard
              title="Watch together"
              src="https://i.ibb.co/y5bfPpL/watch-Together.png"
              alt="Watch together"
              description="Enjoy the internet in sync with your friends. Watch videos and
									listen to music together on Popitalk."
            />
            <DescriptionCard
              title="Chat"
              src="https://i.ibb.co/X5BHwwZ/chat.png"
              alt="Chat"
              description="Watch content from YouTube together. Vimeo, Crunchyroll anime,
								Twitch and SoundCloud are coming soon."
            />
            <DescriptionCard
              title="Public Channels"
              src="https://i.ibb.co/PYv5D1N/public-Channels.png"
              alt="Public Channels"
              description="Create your own channel and share your video playlist with everyone. Get followers and become the biggest channel!"
            />
          </div>
        </div>
        <div className="flex flex-col w-full justify-center items-center my-8 mb-20">
          <h2 className="text-3xl font-bold text-primaryText sm:p-12 p-4">
            Why use Popitalk.
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full gap-4 gap-y-12 lg:gap-y-16 md:gap-y-12 sm:gap-y-12 p-8 px-0 md:px-20">
            <DescriptionCard
              title="Binge-Watching"
              src="https://i.ibb.co/gVvhdM9/binge-Watch.png"
              alt="Binge-Watching"
              description="Popitalk is great for binge-watching your favorite web series or Let's Play with friends or other fans! Either fill the playlist with all episodes or let people vote on their favorite episodes!"
            />
            <DescriptionCard
              title="Internet DJ"
              src="https://i.ibb.co/C7qhQdt/internet-Dj.png"
              alt="Internet DJ"
              description="Ever dreamed of being a DJ? You know the latest and greatest indie tracks on Soundcloud? Fire up your own room and build a playlist that people will remember for weeks. You don't know any good music? No problem, just leave the voting enabled and collaborate with your friends!"
            />
            <DescriptionCard
              title="Long-Distance Relationships"
              src="https://i.ibb.co/WxrND8X/long-Distance-Relationship.png"
              alt="Long-Distance Relationships"
              description="Long-Distance Relationships are hard and Popitalk cannot fix that. But many couples use Popitalk to watch videos together and have a movie night even when you're apart. Don't forget to mark your room as private to keep creepy strangers out."
            />
            <DescriptionCard
              title="Hanging Out"
              src="https://i.ibb.co/NpwYhK8/hanging-Out.png"
              alt="Hanging Out"
              description="Create a room just for you and your friends where you meet after school and watch the latest cat videos while you chat how your day went. With permanent room you always know where to find each other."
            />
            <DescriptionCard
              title="Your Own Channel"
              src="https://i.ibb.co/M9HQpqz/your-Own-Channel.png"
              alt="Your Own Channel"
              description="Our users came up with pretty awesome ideas so far. Just try yours out and see if it works! Channels are very configurable and should fit your needs. Create interesting channels and try to become the biggest Channel on Popitalk!"
            />
            <DescriptionCard
              title="Video Premieres"
              src="https://i.ibb.co/KzztpLw/video-Premiere.png"
              alt="Video Premieres"
              description="You create videos and want to release your newest creation with a sweet event and see the reactions of your viewers as they happen? Upload your video to YouTube and flag it as hidden. You can add it to the playlist with the video link and invite your fans to the room. Hit play when you are ready to start your very own premiere!"
            />
          </div>
          <p className="w-full h-auto flex justify-end text-secondaryText text-sm px-0 md:px-16">
            Icon made by Freepik from www.flaticon.com
          </p>
        </div>
      </div>
    </div>
  );
}
