import React, { createRef, forwardRef } from "react";
import Input from "../Controls/Input";
import Button from "../Controls/Button";
import {
  EmailShareButton,
  FacebookShareButton,
  LineShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  VKShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LineIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  VKIcon,
  WhatsappIcon
} from "react-share"; // More info on Props https://github.com/nygardk/react-share#readme

export default function InviteForm({ link }) {
  const ref = createRef();
  const currentUrl = window.location.href;
  const title = "Join me on @Something";
  const iconClassname =
    "focus:outline-none transform transition hover:scale-105 duration-75 ease-in-out";

  const copyHandler = () => {
    ref.current.select();
    ref.current.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");
  };

  const InputRef = forwardRef((props, ref) => {
    return (
      <Input
        value={currentUrl}
        readOnly={true}
        interiorButton={
          <Button
            actionButton
            size="sm"
            onClick={copyHandler}
            analyticsString="Copy Button: InviteForm"
          >
            Copy
          </Button>
        }
        forwardedRef={ref}
        className="w-full"
      />
    );
  });

  InputRef.displayName = "InputRef";

  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-8 pt-14 pb-20">
      <p className="text-sm text-secondaryText pb-4">
        Copy and share this link
      </p>
      <InputRef ref={ref} />
      <p className="text-sm text-secondaryText pt-4">
        Or Share it on Social Media
      </p>
      <div className="flex justify-center space-x-2 pt-4">
        <FacebookShareButton
          url={currentUrl}
          quote={title}
          className={iconClassname}
        >
          <FacebookIcon size={32} borderRadius={12} />
        </FacebookShareButton>
        <WhatsappShareButton
          url={currentUrl}
          title={title}
          className={iconClassname}
        >
          <WhatsappIcon size={32} borderRadius={12} />
        </WhatsappShareButton>
        <TelegramShareButton
          url={currentUrl}
          title={title}
          className={iconClassname}
        >
          <TelegramIcon size={32} borderRadius={12} />
        </TelegramShareButton>
        <EmailShareButton
          url={currentUrl}
          subject={title}
          className={iconClassname}
        >
          <EmailIcon size={32} borderRadius={12} />
        </EmailShareButton>
        <VKShareButton url={currentUrl} title={title} className={iconClassname}>
          <VKIcon size={32} borderRadius={12} />
        </VKShareButton>
        <TwitterShareButton
          url={currentUrl}
          title={title}
          className={iconClassname}
        >
          <TwitterIcon size={32} borderRadius={12} />
        </TwitterShareButton>
        <LineShareButton
          url={currentUrl}
          title={title}
          className={iconClassname}
        >
          <LineIcon size={32} borderRadius={12} />
        </LineShareButton>
        <RedditShareButton
          url={currentUrl}
          title={title}
          className={iconClassname}
        >
          <RedditIcon size={32} borderRadius={12} />
        </RedditShareButton>
      </div>
    </div>
  );
}
