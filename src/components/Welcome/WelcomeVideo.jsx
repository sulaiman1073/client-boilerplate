import React from "react";

export default function WelcomeVideo({ id }) {
  return (
    <div
      className="lg:w-104 lg:h-104 md:w-84 md:h-84 sm:w-40 sm:h-40
          // flex flex-shrink-0 items-center bg-gradient-r-primary rounded-circle p-1"
    >
      <div className="flex w-full h-full bg-primaryBackground items-center rounded-circle overflow-hidden">
        <video
          autoPlay
          muted
          loop
          style={{
            width: "100%",
            height: "100%"
          }}
          className="rounded-circle"
        >
          <source
            src="https://popitalk-s3.s3.us-east-2.amazonaws.com/popitalkvideo-88btdo7q-lsr1_EaKU776R.compressed.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag. Please upgrade your
          browser.
        </video>
      </div>
    </div>
  );
}
