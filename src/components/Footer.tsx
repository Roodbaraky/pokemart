import React from "react";
import { Button } from "./ui/button";
import JumpToTopButton from "./JumpToTopButton";

export const Footer = () => {
  return (
    <footer className="m-t-auto text-center border-t-2 border-gray-300 flex flex-col">
     <JumpToTopButton/>
      <small>&copy; 2024 All rights reserved.</small>
    </footer>
  );
};
