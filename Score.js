import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Score extends React.Component {
    static navigationOptions = {
        title: 'High Score',
    };
  render() {
    return (
      <View style={styles.container}>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});