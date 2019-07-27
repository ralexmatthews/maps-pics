import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useColorContext } from "../ColorContext";

export const SettingsListItem = ({ onPress, children, ...rest }) => {
  const [{ accent }] = useColorContext();
  return (
    <TouchableOpacity onPress={onPress}>
      <View {...rest}>
        <Text style={{ color: accent }}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};
