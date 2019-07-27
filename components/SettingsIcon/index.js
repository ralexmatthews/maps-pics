import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useColorContext } from "../ColorContext";

export const SettingsIcon = props => {
  const [{ accent }] = useColorContext();
  return <Ionicons {...props} name="ios-settings" size={24} color={accent} />;
};
