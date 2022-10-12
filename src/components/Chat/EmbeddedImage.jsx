import React, { useEffect, useState } from "react";
import { imageLoader } from "../../helpers/functions";

export default function EmbeddedImage({ link }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    imageLoader(link, () => setImageLoaded(true));
  }, [link]);

  return imageLoaded ? (
    <img src={link} alt="" className="block h-32" />
  ) : (
    <a href={link} rel="noopener noreferrer" target="_blank">
      {link}
    </a>
  );
}
