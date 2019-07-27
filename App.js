import React, { useState } from "react";
import { View } from "react-native";
import styled from "styled-components";
import { Spring } from "react-spring/renderprops";
import { BlurView } from "expo-blur";
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
const SettingsContainer = styled(BlurView)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 200px;
  padding: 30px 30px 0 0;
`;

export default function App() {
  const [selectedState, setSelectedState] = useState("");
  const [page, setPage] = useState("home");
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <ColorContextProvider>
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
              />
            ),
            options: (
              <StateOptions
                close={() => setPage("home")}
                stateName={selectedState}
              />
            ),
            colors: <Colors close={() => setPage("home")} />
          }}
        />
        <Spring to={{ translateX: settingsOpen ? 0 : 200 }}>
          {({ translateX }) =>
            translateX < 195 && (
              <SettingsContainer
                style={{ transform: [{ translateX }] }}
                tint="dark"
                intensity={90}
              >
                <SettingsListItem
                  onPress={() => {
                    setPage("colors");
                    setSettingsOpen(false);
                  }}
                >
                  Colors
                </SettingsListItem>
              </SettingsContainer>
            )
          }
        </Spring>
        <SettingsIcon
          style={{ position: "absolute", bottom: 30, right: 30 }}
          onPress={() => {
            setSettingsOpen(!settingsOpen);
          }}
        />
      </Background>
    </ColorContextProvider>
  );
}
