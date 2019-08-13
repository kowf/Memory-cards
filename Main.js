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

class Logo extends React.Component {
  render() {
    return (
      <Image style={styles.icon} source={require('./assets/AppIcon.png')}/>
    );
  }
}

class HighScore extends React.Component {
  render(){
    return (
      <Button 
            style = {styles.highscore}
            title="High score" 
            color="navy"
            onPress={() =>
              this.props.nav.navigate('Score')
            } 
            acccessibilityLabel="See the high score list"
          />
    )
  }
}

class CurrentScore extends React.Component {
  render(){
    return (
      <Text style = {styles.score}>{this.props.state.score}</Text>
    )
  }
}

class Main extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <Logo />,
      headerRightContainerStyle: {paddingRight: 10, paddingLeft: 10},
      headerRight: (
        <HighScore nav = {navigation} />
      ),
      
    }
  };
  render() {
    return (
      <View style={styles.app}>
        <Game />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    paddingTop: Constants.statusBarHeight,
    flex: 1
  },
  icon:{
    marginLeft: 10,
    width: 50,
    height: 50,
  },
  score:{
    flex:1,
    textAlign: 'center',
    color: 'white'
  },
  highscore: {
    marginRight: 10
  },
});


export default connect(mapStateToProps)(Main);