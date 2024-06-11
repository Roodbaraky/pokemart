"use client";
import React from "react";
import { Button } from "./ui/button";

export default function JumpToTopButton() {
  return (
    <Button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="w-36 mx-auto"
    >
      Jump to top
    </Button>
  );
}
