import React, { Component } from "react";

import { connect } from "react-redux";
import styled from "styled-components";
import { bindActionCreators } from "redux";
import { Animated, Dimensions, TouchableOpacity } from "react-native";

import actions from "./redux/actions";

const screenWidth = Dimensions.get("window").width;

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.scale = new Animated.Value(1);
    this.translateX = new Animated.Value(0);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.toggled !== this.props.toggled) {
      this.handleMenu();
    }
  }

  handleMenu = () => {
    const { toggled } = this.props;

    if (toggled) {
      Animated.spring(this.scale, { toValue: 0.6 }).start();
      Animated.spring(this.translateX, { toValue: screenWidth / 2 }).start();
    } else {
      Animated.spring(this.scale, { toValue: 1 }).start();
      Animated.spring(this.translateX, { toValue: 0 }).start();
    }
  };

  handleToggle = () => {
    const { toggleMenu, toggled } = this.props;
    toggleMenu(!toggled);
  };

  render() {
    return (
      <AnimatedContainer
        style={{
          transform: [{ translateX: this.translateX }, { scale: this.scale }]
        }}
      >
        <TouchableOpacity onPress={this.handleToggle}>
          <Title>Toggle Menu</Title>
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
)(Dashboard);

const Container = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: #b8bece;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Title = styled.Text`
  color: #000000;
  font-size: 25px;
`;
