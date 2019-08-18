import React, { useEffect, useState } from "react";

import * as Font from "expo-font";
import styled from "styled-components";

import MusicPlayer from "./src/MusicPlayer";

function App() {
  const [fontLoaded, setLoaded] = useState(false);

  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    await Font.loadAsync({
      "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
      "roboto-light": require("./assets/fonts/Roboto-Light.ttf"),
      "roboto-medium": require("./assets/fonts/Roboto-Medium.ttf"),
      "roboto-thin": require("./assets/fonts/Roboto-Thin.ttf")
    });
    setLoaded(true);
  };

  return <Container>{fontLoaded && <MusicPlayer />}</Container>;
}

export default App;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #fff2f6;
`;
