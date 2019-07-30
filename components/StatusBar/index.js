import React from "react";
import { StatusBar as DefaultStatusBar } from "react-native";
import { useIsDarkBackground } from "../../utils";

export const StatusBar = () => {
  const darkBackground = useIsDarkBackground();

  return (
    <DefaultStatusBar
      barStyle={darkBackground ? "dark-content" : "light-content"}
    />
  );
};
