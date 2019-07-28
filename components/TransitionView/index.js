import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Spring, animated } from "react-spring/renderprops";

const AnimatedView = animated(View);

export const TransitionView = ({ pages, currentPage }) => {
  const [rendered, setRendered] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [ShowingPage, setShowingPage] = useState(pages[currentPage]);

  useEffect(() => {
    rendered && setLeaving(true);
    setRendered(true);
  }, [currentPage]);

  return (
    <Spring
      to={{
        scale: leaving ? 0.7 : 1.0,
        opacity: leaving ? 0.1 : 1.0
      }}
      from={{
        scale: 0.7,
        opacity: 0.1
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
