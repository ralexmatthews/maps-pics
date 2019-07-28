import React from "react";
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Linking
} from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { useColorContext } from "../ColorContext";
import { Text } from "../Text";

const Container = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 16px 0 32px;
`;
const ImageHolder = styled(View)`
  width: 200px;
  height: 200px;
  border-radius: 18;
  margin: auto;
  overflow: hidden;
`;
const AppName = styled(Text)`
  font-size: 32;
  font-weight: 700;
  text-align: center;
`;
const MessageText = styled(Text)`
  width: 400px;
  margin-bottom: 16px;
`;

const HyperLink = ({ children }) => (
  <TouchableOpacity
    onPress={() => {
      Linking.openURL("mailto:amatthews2539@gmail.com");
    }}
  >
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        width: 400
      }}
    >
      <Text style={{ textDecorationLine: "underline", textAlign: "left" }}>
        {children}
      </Text>
    </View>
  </TouchableOpacity>
);

export const About = ({ close }) => {
  const [{ accent }] = useColorContext();

  return (
    <>
      <ScrollView>
        <Container>
          <ImageHolder>
            <Image
              style={{ width: 200, height: 200 }}
              source={require("../../assets/icon.png")}
            />
          </ImageHolder>
          <AppName>Stray</AppName>
          <MessageText>
            {"    "}Thank you for downloading my first app, Stray. This app was
            designed to allow those of us who like to stray; those of us who
            like to travel the US far and wide to document our journeys, and to
            remind ourselves of the memories made along the way.
          </MessageText>
          <MessageText>
            {"    "}My goal was to make it very simple to add in photos and to
            create a customizable wall art photo. If you feel there is a way to
            make this easier or any other feature suggestions or bug reports,
            feel free to contact me.
          </MessageText>
          <MessageText>
            {"    "}Thank you for your feedback, and please continue to stray
            far and wide.
          </MessageText>
          <Text style={{ width: 400 }}>Alex Matthews</Text>
          <HyperLink>amatthews2539@gmail.com</HyperLink>
        </Container>
      </ScrollView>
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
