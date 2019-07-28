import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Alert, Image } from "react-native";
import styled from "styled-components";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Ionicons } from "@expo/vector-icons";
import { useColorContext } from "../ColorContext";
import { Text } from "../Text";

const Container = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const FancyText = styled(Text)`
  font-size: 18;
  font-weight: 100;
`;
const TextContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 200px;
`;
const PhotoTextHolder = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
`;

export const StateOptions = ({ stateName, close, ...rest }) => {
  const [{ accent }] = useColorContext();
  const [fileExists, setFileExists] = useState(false);
  useEffect(() => {
    FileSystem.getInfoAsync(
      FileSystem.documentDirectory + stateName.replace(/ /gim, "") + ".jpg"
    ).then(({ exists }) => {
      setFileExists(exists);
    });
  }, [stateName]);

  return (
    <>
      <Container {...rest}>
        <TextContainer>
          <FancyText>{stateName}</FancyText>
          {fileExists && (
            <TouchableOpacity
              onPress={() => {
                FileSystem.deleteAsync(
                  FileSystem.documentDirectory +
                    stateName.replace(/ /gim, "") +
                    ".jpg",
                  {
                    idempotent: true
                  }
                ).then(() => {
                  setFileExists(false);
                });
              }}
            >
              <FancyText>Clear</FancyText>
            </TouchableOpacity>
          )}
        </TextContainer>
        <TouchableOpacity
          onPress={() =>
            getCameraRollPermission().then(
              ({ cancelled, uri }) =>
                !cancelled &&
                FileSystem.copyAsync({
                  from: uri,
                  to:
                    FileSystem.documentDirectory +
                    stateName.replace(/ /gim, "") +
                    ".jpg"
                }).then(() => {
                  setFileExists(false);
                  setFileExists(true);
                })
            )
          }
        >
          {fileExists ? (
            <Image
              style={{ width: 200, height: 200 }}
              source={{
                uri:
                  FileSystem.documentDirectory +
                  stateName.replace(/ /gim, "") +
                  ".jpg"
              }}
            />
          ) : (
            <PhotoTextHolder>
              <FancyText>No Photo Selected</FancyText>
            </PhotoTextHolder>
          )}
        </TouchableOpacity>
      </Container>
      <Ionicons
        name="ios-close"
        size={48}
        onPress={close}
        color={accent}
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
