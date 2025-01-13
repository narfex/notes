"use client";
import React from "react";
import Typewriter from "typewriter-effect";

type Props = {};

const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter
      options={{
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("$NOTES.")
          .pauseFor(1000)
          .deleteAll()
          .typeString("AI-Powered.")
          .pauseFor(1000)
          .deleteAll()
          .typeString("Memes.")
          .start();
      }}
    />
  );
};

export default TypewriterTitle;
