import React, { useState } from "react";
import styled from "styled-components";
import Menu from "./src/Menu";

function App() {
  const [selected, setSelect] = useState("");
  return (
    <Container>
      <Text>{selected}</Text>
      <Menu onChange={setSelect} />
    </Container>
  );
}

export default App;

const Container = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  font-size: 25px;
  font-family: Arial;
`;
