import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import styled from "styled-components";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Ionicons } from "@expo/vector-icons";

const Container = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const FancyText = styled(Text)`
  color: white;
  font-size: 18;
  font-weight: 100;
`;
const TextContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const StateOptions = ({ stateName, close, ...rest }) => {
  const [key, setKey] = useState(0);
  const [fileExists, setFileExists] = useState(false);
  useEffect(() => {
    FileSystem.getInfoAsync(
      FileSystem.documentDirectory + stateName + ".jpg"
    ).then(({ exists }) => {
      setFileExists(exists);
    });
  }, [stateName]);

  return (
    <>
      <Container {...rest}>
        <TouchableOpacity
          onPress={() =>
            getCameraRollPermission().then(
              ({ cancelled, uri }) =>
                !cancelled &&
                FileSystem.copyAsync({
                  from: uri,
                  to: FileSystem.documentDirectory + stateName + ".jpg"
                }).then(() => {
                  setFileExists(false);
                  setFileExists(true);
                })
            )
          }
        >
          <FancyText>{stateName}</FancyText>
          {fileExists ? (
            <Image
              style={{ width: 200, height: 200 }}
              source={{
                uri: FileSystem.documentDirectory + stateName + ".jpg"
              }}
            />
          ) : (
            <FancyText>No Photo Selected</FancyText>
          )}
        </TouchableOpacity>
      </Container>
      <Ionicons
        name="ios-close"
        size={48}
        onPress={close}
        color="white"
        style={{ position: "absolute", left: 30, top: 30 }}
      />
    </>
  );
};

const getCameraRollPermission = () =>
  Permissions.getAsync(Permissions.CAMERA_ROLL)
    .then(({ status }) => {
      if (status !== "granted") {
        return Permissions.askAsync(Permissions.CAMERA_ROLL);
      } else {
        return { status: "granted" };
      }
    })
    .then(({ status }) => {
      if (status === "granted") {
        return ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images
        });
      } else {
        Alert.alert(
          "Insufficient Permissions",
          "Please allow access to you camera roll to enable selecting photos",
          [{ text: "OK" }]
        );
        return Promise.resolve({ cancelled: true });
      }
    });
