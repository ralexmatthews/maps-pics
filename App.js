import React, { useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import { Spring } from "react-spring/renderprops";
import { Ionicons } from "@expo/vector-icons";
import { Map } from "./components/Map";
import { TransitionView } from "./components/TransitionView";
import { StateOptions } from "./components/StateOptions";

export default function App() {
  const [selectedState, setSelectedState] = useState("");
  const [page, setPage] = useState("home");
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
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
              close={() => {
                setPage("home");
              }}
              stateName={selectedState}
            />
          )
        }}
      />
      <Spring to={{ translateX: settingsOpen ? 0 : 300 }}>
        {({ translateX }) =>
          translateX < 290 && (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-end",
                position: "absolute",
                right: 30,
                top: 30,
                transform: [{ translateX }]
              }}
            >
              <FancyText>Foo</FancyText>
            </View>
          )
        }
      </Spring>
      <Ionicons
        name="ios-settings"
        size={24}
        color="white"
        style={{ position: "absolute", bottom: 30, right: 30 }}
        onPress={() => {
          setSettingsOpen(!settingsOpen);
        }}
      />
    </Background>
  );
}

const Background = styled(View)`
  background-color: black;
  height: 100%;
  width: 100%;
`;
const FancyText = styled(Text)`
  color: white;
`;
