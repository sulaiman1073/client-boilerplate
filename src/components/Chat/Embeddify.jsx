import React from "react";
import reactStringReplace from "react-string-replace";
import Linkify from "react-linkify";
import EmbeddedImage from "./EmbeddedImage";

export default function Embeddify({ text }) {
  return (
    <Linkify>
      {reactStringReplace(text, /(https?:\/\/\S+)/g, (match, i) => (
        <EmbeddedImage key={match + i} link={match} />
      ))}
    </Linkify>
  );
}
