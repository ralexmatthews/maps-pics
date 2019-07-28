import React from "react";
import { Text as NativeText } from "react-native";
import { useColorContext } from "../ColorContext";

export const Text = props => {
  const [{ accent }] = useColorContext();
  return (
    <NativeText
      {...props}
      style={[
        { color: accent, fontFamily: "Cochin", fontSize: 18 },
        props.style
      ]}
    />
  );
};
