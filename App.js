import React, { useState, useRef, useEffect } from "react";
import { View, CameraRoll, Alert } from "react-native";
import styled from "styled-components";
import { Spring } from "react-spring/renderprops";
import * as Font from "expo-font";
import { captureRef as takeSnapshotAsync } from "react-native-view-shot";
import { Map } from "./components/Map";
import { TransitionView } from "./components/TransitionView";
import { StateOptions } from "./components/StateOptions";
import { SettingsListItem } from "./components/SettingsListItem";
import { Colors } from "./components/Colors";
import {
  useColorContext,
  ColorContextProvider
} from "./components/ColorContext";
import { SettingsIcon } from "./components/SettingsIcon";
import { About } from "./components/About";
import { SettingsBlurView } from "./components/SettingsBlurView";
import { StatusBar } from "./components/StatusBar";

const Background = props => {
  const [{ background }] = useColorContext();
  return (
    <StyledBackground style={{ backgroundColor: background }} {...props} />
  );
};
const StyledBackground = styled(View)`
  height: 100%;
  width: 100%;
`;

export default function App() {
  const [selectedState, setSelectedState] = useState("");
  const [page, setPage] = useState("home");
  const [settingsOpen, setSettingsOpen] = useState(false);

  const mapRef = useRef();

  useEffect(() => {
    Font.loadAsync({
      "Fira-Code": require("./assets/fonts/FiraCode-Retina.ttf")
    });
  }, []);

  return (
    <ColorContextProvider>
      <StatusBar />
      <Background>
        <TransitionView
          currentPage={page}
          pages={{
            home: (
              <Map
                onPress={state => {
                  setPage("options");
                  setSelectedState(state);
                }}
                ref={mapRef}
              />
            ),
            options: (
              <StateOptions
                close={() => setPage("home")}
                stateName={selectedState}
              />
            ),
            colors: <Colors close={() => setPage("home")} />,
            about: <About close={() => setPage("home")} />
          }}
        />
        <Spring to={{ translateX: settingsOpen ? 0 : 200 }}>
          {({ translateX }) =>
            translateX < 195 && (
              <SettingsBlurView style={{ transform: [{ translateX }] }}>
                <SettingsListItem
                  onPress={() => {
                    setPage("colors");
                    setSettingsOpen(false);
                  }}
                >
                  Colors
                </SettingsListItem>
                <SettingsListItem
                  onPress={() => {
                    if (!mapRef.current) {
                      return;
                    }

                    takeSnapshotAsync(mapRef.current)
                      .then(CameraRoll.saveToCameraRoll)
                      .then(() => {
                        Alert.alert(
                          "Saved",
                          "Your map has been saved to your camera roll",
                          [{ text: "OK" }]
                        );
                      })
                      .catch(() => {
                        Alert.alert(
                          "Error",
                          "There was an error when attempting to save your photo to your camera roll",
                          [{ text: "OK" }]
                        );
                      });
                  }}
                >
                  Export Map
                </SettingsListItem>
                <SettingsListItem
                  onPress={() => {
                    setPage("about");
                    setSettingsOpen(false);
                  }}
                >
                  About
                </SettingsListItem>
              </SettingsBlurView>
            )
          }
        </Spring>
        <SettingsIcon
          style={{
            position: "absolute",
            bottom: 30,
            right: 30,
            opacity: page === "home" ? 1 : 0
          }}
          onPress={() => {
            page === "home" && setSettingsOpen(!settingsOpen);
          }}
        />
      </Background>
    </ColorContextProvider>
  );
}
