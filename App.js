import React, { Component } from 'react';
import {StyleSheet, TouchableWithoutFeedback, Image, Text, View, Button } from 'react-native';
import Constants from 'expo-constants';
import { ScreenOrientation } from 'expo';
import Main from './Main';
import { Provider } from 'react-redux';
import store from './redux/store';
export default class ColourMemory extends Component {
  render() {
    return (
      <Provider store = {store}>
        <Main />
      </Provider>
        );
      }
    }
        
      
