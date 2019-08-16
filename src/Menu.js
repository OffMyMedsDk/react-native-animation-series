import React, { Component } from "react";

import { connect } from "react-redux";
import styled from "styled-components";
import { bindActionCreators } from "redux";
import {
  Animated,
  Dimensions,
  TouchableOpacity,
  StatusBar
} from "react-native";

import actions from "./redux/actions";

const screenWidth = Dimensions.get("window").width;

class Menu extends Component {
  constructor(props) {
    super(props);

    this.translateX = new Animated.Value(-screenWidth);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.toggled !== this.props.toggled) {
      this.handleMenu();
    }
  }

  handleMenu = () => {
    const { toggled } = this.props;

    if (!toggled) {
      Animated.spring(this.translateX, {
        toValue: -screenWidth
      }).start();

      StatusBar.setBarStyle("dark-content", true);
    }

    if (toggled) {
      Animated.spring(this.translateX, {
        toValue: 0
      }).start();

      StatusBar.setBarStyle("light-content", true);
    }
  };

  handleToggle = () => {
    const { toggleMenu, toggled } = this.props;
    toggleMenu(!toggled);
  };

  render() {
    return (
      <AnimatedContainer
        style={{ transform: [{ translateX: this.translateX }] }}
      >
        <OptionGroup>
          <Option>Option 1</Option>
          <Option>Option 2</Option>
          <Option>Option 3</Option>
          <Option>Option 4</Option>
        </OptionGroup>
        <TouchableOpacity onPress={this.handleToggle}>
          <Text>Close</Text>
        </TouchableOpacity>
      </AnimatedContainer>
    );
  }
}

const mapStateToProps = state => {
  const { toggled } = state;
  return { toggled };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

const Container = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #13272e;
  justify-content: center;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const OptionGroup = styled.View`
  margin: 20px 25px;
`;

const Option = styled.Text`
  font-size: 25px;
  color: rgba(255, 255, 255, 0.6);
`;

const Text = styled.Text`
  font-size: 35px;
  color: rgba(255, 255, 255, 0.3);
  margin: 25px;
`;
