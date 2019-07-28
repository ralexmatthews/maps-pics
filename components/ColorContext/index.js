import React, { useContext, useState, createContext, useEffect } from "react";
import { AsyncStorage } from "react-native";

const ColorContext = createContext({ background: "#000", accent: "#FFF9E6" });

export const ColorContextProvider = props => {
  const [colors, setColors] = useState({
    background: "#000",
    accent: "#FFF9E6"
  });

  useEffect(() => {
    AsyncStorage.getItem("colors").then(value => {
      if (value) {
        try {
          setColors(JSON.parse(value));
        } catch {}
      }
    });
  }, []);

  return <ColorContext.Provider {...props} value={[colors, setColors]} />;
};

/** @type {() => [{ background: string, accent: string}, (object) => void]} */
export const useColorContext = () => useContext(ColorContext);

export const useSaveColor = () => {
  const [colors] = useColorContext();

  useEffect(() => {
    const timer = setTimeout(
      () =>
        AsyncStorage.setItem("colors", JSON.stringify(colors)).catch(() => {}),
      1000
    );

    return () => clearTimeout(timer);
  }, [colors]);
};
