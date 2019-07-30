import React from "react";
import styled from "styled-components";
import { BlurView } from "expo-blur";
import { useIsDarkAccent } from "../../utils";

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

export const SettingsBlurView = ({ ...props }) => {
  const darkAccent = useIsDarkAccent();

  return (
    <>
      <SettingsContainer
        {...props}
        tint={darkAccent ? "dark" : "light"}
        intensity={85}
      />
    </>
  );
};
