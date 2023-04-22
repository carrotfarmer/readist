import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

export const ColorModeSwitch: React.FC = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      {colorMode === "light" ? (
        <IconButton
          onClick={toggleColorMode}
          colorScheme="teal"
          aria-label="color mode switch"
          icon={<BsMoonFill />}
        />
      ) : (
        <IconButton
          onClick={toggleColorMode}
          colorScheme="teal"
          aria-label="color mode switch"
          icon={<BsSunFill />}
        />
      )}
    </>
  );
};

