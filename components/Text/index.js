import React from "react";
import { Text as NativeText } from "react-native";
import { useColorContext } from "../ColorContext";

export const Text = props => {
  const [{ accent }] = useColorContext();
  return (
    <NativeText
      {...props}
      style={[
        {
          color: accent,
          fontFamily: "Fira-Code",
          letterSpacing: -1,
          fontSize: 18
        },
        props.style
      ]}
    />
  );
};
