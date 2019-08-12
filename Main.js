import React, { Component } from 'react';
import {StyleSheet, TouchableWithoutFeedback, Image, Text, View, Button } from 'react-native';
import Constants from 'expo-constants';
import { ScreenOrientation } from 'expo';

import Header from './components/Header';
import Game from './components/Game/Game';

import { connect } from 'react-redux'


const mapStateToProps = (state) => ({
  state: state,
});

class Main extends Component {
  render() {
    return (
      <View style={styles.app}>
        <Header />
        <Game />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    paddingTop: Constants.statusBarHeight,
    flex: 1
  }
});



export default connect(mapStateToProps)(Main);