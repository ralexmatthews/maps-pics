import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Spring, animated } from "react-spring/renderprops";

const AnimatedView = animated(View);

export const TransitionView = ({ pages, currentPage }) => {
  const [leaving, setLeaving] = useState(false);
  const [ShowingPage, setShowingPage] = useState(pages[currentPage]);

  useEffect(() => {
    setLeaving(true);
  }, [currentPage]);

  return (
    <Spring
      to={{
        scale: leaving ? 0.7 : 1.0,
        opacity: leaving ? 0.1 : 1.0
      }}
    >
      {({ scale, opacity }) => {
        if (opacity < 0.2) {
          setLeaving(false);
          setShowingPage(pages[currentPage]);
        }
        return (
          <AnimatedView style={{ transform: [{ scale }], opacity }}>
            {ShowingPage}
          </AnimatedView>
        );
      }}
    </Spring>
  );
};
