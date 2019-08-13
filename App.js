import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppNav from './AppNavigator';

export default class ColourMemory extends Component {
  render() {
    return (
      <Provider store = {store}>
        <AppNav />
      </Provider>
        );
      }
    }
        
      
