import { useColorContext } from "../components/ColorContext";

export const useIsDarkBackground = () => {
  const [{ background }] = useColorContext();

  const red = parseInt(background.substring(1, 3), 16);
  const green = parseInt(background.substring(3, 5), 16);
  const blue = parseInt(background.substring(5), 16);
  return red * 0.299 + green * 0.587 + blue * 0.114 > 186;
};

export const useIsDarkAccent = () => {
  const [{ accent }] = useColorContext();

  const red = parseInt(accent.substring(1, 3), 16);
  const green = parseInt(accent.substring(3, 5), 16);
  const blue = parseInt(accent.substring(5), 16);
  return red * 0.299 + green * 0.587 + blue * 0.114 > 186;
};

export const convertStateNameToFileName = stateName =>
  stateName.replace(/ /gim, "");
