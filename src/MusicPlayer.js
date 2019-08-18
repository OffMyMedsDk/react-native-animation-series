import React, { useState } from "react";

import styled from "styled-components";
import { ProgressBar } from "react-native-paper";
import { TouchableOpacity, Animated, Easing } from "react-native";

const translateY = new Animated.Value(0);
const scale = new Animated.Value(1);
const rotation = new Animated.Value(0);
const opacity = new Animated.Value(0);

const MusicPlayer = () => {
  const [toggled, setToggled] = useState(true);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });

  const opacityInterpolate = opacity.interpolate({
    inputRange: [0, 0.85, 1],
    outputRange: [0, 0, 1]
  });

  const rotationLoop = () => {
    return Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2500,
        easing: Easing.linear
      })
    ).start();
  };

  const onPress = () => {
    setToggled(!toggled);
    if (toggled) {
      Animated.parallel([
        Animated.timing(translateY, { toValue: -70 }),
        Animated.timing(scale, { toValue: 1.2 }),
        rotationLoop(),
        Animated.timing(opacity, { toValue: 1 })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, { toValue: 0 }),
        Animated.timing(scale, { toValue: 1 }),
        Animated.timing(rotation, { toValue: 0 }),
        Animated.timing(opacity, { toValue: 0 })
      ]).start();
    }
  };

  return (
    <Container>
      <AnimatedImage
        source={require("./cots.jpg")}
        style={{ transform: [{ scale }, { rotate: spin }] }}
      />
      <AnimatedDiskCenter style={{ transform: [{ scale }] }} />
      <Row>
        <Icon
          source={require("./back.png")}
          style={{ width: 23.46, height: 16.93 }}
        />
        <TouchableOpacity onPress={onPress}>
          {toggled ? (
            <Icon
              source={require("./play.png")}
              style={{ width: 23.46, height: 16.93 }}
            />
          ) : (
            <Icon
              source={require("./stop.png")}
              style={{ width: 20, height: 16.93 }}
            />
          )}
        </TouchableOpacity>
        <Icon
          source={require("./next.png")}
          style={{ width: 23.46, height: 16.93 }}
        />
      </Row>
      <AnimatedPlaying style={{ transform: [{ translateY }] }}>
        <AnimatedColumn style={{ opacity: opacityInterpolate }}>
          <Artist>Quinn XCII</Artist>
          <Title>Another day in paradise</Title>
          <ProgressBar
            progress={0.5}
            color="#FF8EAB"
            style={{ width: 150, position: "absolute", bottom: 25, left: 60 }}
          />
        </AnimatedColumn>
      </AnimatedPlaying>
    </Container>
  );
};

export default MusicPlayer;

const Container = styled.View`
  width: 326px;
  height: 99.5px;
  background: #ffffff;
  border-radius: 14px;
  box-shadow: 0 50px 57px #6f535b;
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  width: 100px;
  height: 100px;
  position: absolute;
  left: 20px;
  top: -30px;
  border-radius: 50px;
`;

const AnimatedImage = Animated.createAnimatedComponent(Image);

const DiskCenter = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  position: absolute;
  left: 60px;
  top: 10px;
  z-index: 10;
  background: #ffffff;
`;

const AnimatedDiskCenter = Animated.createAnimatedComponent(DiskCenter);

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  height: 80px;
  width: 150px;
  justify-content: space-between;
  position: absolute;
  right: 30px;
`;

const Icon = styled.Image``;

const Playing = styled.View`
  background: rgba(255, 255, 255, 0.6);
  width: 300px;
  height: 85px;
  border-radius: 14px;
  z-index: -1;
  align-items: center;
  padding-top: 10px;
`;

const AnimatedPlaying = Animated.createAnimatedComponent(Playing);

const Column = styled.View`
  flex-direction: column;
  height: 100%;
  padding-left: 60px;
`;

const AnimatedColumn = Animated.createAnimatedComponent(Column);

const Artist = styled.Text`
  font-size: 15px;
  font-family: "roboto-bold";
  color: rgba(0, 0, 0, 0.7);
`;

const Title = styled.Text`
  font-size: 12px;
  font-family: "roboto-light";
  color: rgba(0, 0, 0, 0.7);
`;
