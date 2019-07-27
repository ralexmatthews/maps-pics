import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { ColorPicker, fromHsv } from "react-native-color-picker";
import { useColorContext, useSaveColor } from "../ColorContext";

const Container = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Colors = ({ close }) => {
  const [{ background, accent }, setColors] = useColorContext();
  useSaveColor();
  return (
    <>
      <Container>
        <ColorPicker
          color={accent}
          onColorChange={newColor =>
            setColors({ background, accent: fromHsv(newColor) })
          }
          style={{ height: "75%", width: "35%" }}
        />
        <ColorPicker
          color={background}
          onColorChange={newColor =>
            setColors({ background: fromHsv(newColor), accent })
          }
          style={{ height: "75%", width: "35%" }}
        />
      </Container>
      <Ionicons
        name="ios-close"
        size={48}
        onPress={close}
        color={accent}
        style={{ position: "absolute", left: 30, top: 30 }}
      />
      <View style={{ position: "absolute", left: 30, bottom: 30 }}>
        <TouchableOpacity
          onPress={() => {
            setColors({ background: "#000", accent: "#fff" });
          }}
        >
          <View>
            <Text style={{ color: accent }}>Reset</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};
