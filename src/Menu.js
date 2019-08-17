import React, { Component } from "react";

import styled from "styled-components";
import LottieView from "lottie-react-native";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { PanResponder, Animated, TouchableOpacity } from "react-native";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
      reverse: false
    };

    this.firstOption = new Animated.ValueXY();
    this.secondOption = new Animated.ValueXY();
    this.thirdOption = new Animated.ValueXY();
    this.panAnimation = new Animated.ValueXY();

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return !(gestureState.dx === 0 && gestureState.dy === 0);
      },
      onPanResponderGrant: (evt, gestureState) => {
        this.panAnimation.setOffset(this.panAnimation.__getValue());
        // this.panAnimation.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (evt, gestureState) => {
        this.panAnimation.setValue({ x: gestureState.dx, y: gestureState.dy });
        if (gestureState.dy <= -250 && this.state.toggle) {
          this.menuDown();
        } else if (gestureState.dy >= 200 && this.state.toggle) {
          this.menuUp();
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.panAnimation.setValue({ x: gestureState.dx, y: gestureState.dy });
      }
    });
  }

  menuDown = () => {
    Animated.sequence([
      Animated.timing(this.firstOption, {
        toValue: { x: 0, y: 230 },
        duration: 150
      }),
      Animated.timing(this.secondOption, {
        toValue: { x: 0, y: 160 },
        duration: 150
      }),
      Animated.timing(this.thirdOption, {
        toValue: { x: 0, y: 90 },
        duration: 150
      })
    ]).start();
  };

  menuUp = () => {
    Animated.sequence([
      Animated.timing(this.firstOption, {
        toValue: { x: 0, y: -230 },
        duration: 150
      }),
      Animated.timing(this.secondOption, {
        toValue: { x: 0, y: -160 },
        duration: 150
      }),
      Animated.timing(this.thirdOption, {
        toValue: { x: 0, y: -90 },
        duration: 150
      })
    ]).start();
  };

  handlePress = () => {
    const { toggle } = this.state;

    if (!toggle) {
      this.animation.play(1, 60);
      Animated.sequence([
        Animated.timing(this.firstOption, {
          toValue: { x: 0, y: -230 },
          duration: 150
        }),
        Animated.timing(this.secondOption, {
          toValue: { x: 0, y: -160 },
          duration: 150
        }),
        Animated.timing(this.thirdOption, {
          toValue: { x: 0, y: -90 },
          duration: 150
        })
      ]).start(() => {
        this.setState({ toggle: true });
      });
    }

    if (toggle) {
      this.animation.reset();
      Animated.sequence([
        Animated.timing(this.firstOption, {
          toValue: { x: 0, y: 0 },
          duration: 150
        }),
        Animated.timing(this.secondOption, {
          toValue: { x: 0, y: 0 },
          duration: 150
        }),
        Animated.timing(this.thirdOption, {
          toValue: { x: 0, y: 0 },
          duration: 150
        })
      ]).start(() => {
        this.setState({ toggle: false });
      });
    }
  };

  render() {
    const { onChange } = this.props;

    return (
      <AnimatedContainer
        {...this.panResponder.panHandlers}
        style={this.panAnimation.getLayout()}
      >
        <AnimatedBubble style={{ zIndex: 10 }}>
          <TouchableOpacity onPress={this.handlePress}>
            <LottieView
              source={require("./menu.json")}
              style={{ width: 200 }}
              ref={lottie => (this.animation = lottie)}
              loop={false}
            />
          </TouchableOpacity>
        </AnimatedBubble>

        <AnimatedBubble
          style={{ transform: this.firstOption.getTranslateTransform() }}
        >
          <TouchableOpacity onPress={() => onChange("Like")}>
            <AntDesign name="like2" size={20} color="#3498db" />
          </TouchableOpacity>
        </AnimatedBubble>

        <AnimatedBubble
          style={{ transform: this.secondOption.getTranslateTransform() }}
        >
          <TouchableOpacity onPress={() => onChange("Dislike")}>
            <AntDesign name="dislike2" size={20} color="#e74c3c" />
          </TouchableOpacity>
        </AnimatedBubble>

        <AnimatedBubble
          style={{ transform: this.thirdOption.getTranslateTransform() }}
        >
          <TouchableOpacity onPress={() => onChange("Retweet")}>
            <EvilIcons name="retweet" size={30} color="#2ecc71" />
          </TouchableOpacity>
        </AnimatedBubble>
      </AnimatedContainer>
    );
  }
}

export default Menu;

const Container = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  box-shadow: 1px 2px 7px #e8e8e8;
  background: #ffffff;
`;

const Bubble = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  box-shadow: 1px 2px 4px #e8e8e8;
  background: #ffffff;
  position: absolute;
  z-index: -1;
  align-items: center;
  justify-content: center;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const AnimatedBubble = Animated.createAnimatedComponent(Bubble);
