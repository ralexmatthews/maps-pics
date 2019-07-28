import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "../Text";

export const SettingsListItem = ({ onPress, children, ...rest }) => (
  <TouchableOpacity onPress={onPress}>
    <View {...rest}>
      <Text style={{ marginBottom: 48, fontSize: 18 }}>{children}</Text>
    </View>
  </TouchableOpacity>
);
