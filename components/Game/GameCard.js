import React, { Component } from 'react';
import { StyleSheet, Image, TouchableHighlight, Text, Dimensions } from 'react-native';
const colorPath = {
  1: require('./../../assets/1.blue.jpg'),
  2: require('./../../assets/2.brown.jpg'),
  3: require('./../../assets/3.green.jpg'),
  4: require('./../../assets/4.grey.jpg'),
  5: require('./../../assets/5.orange.jpg'),
  6: require('./../../assets/6.purple.jpg'),
  7: require('./../../assets/7.red.jpg'),
  8: require('./../../assets/8.yellow.jpg')
}

var { height, width } = Dimensions.get('window');
//header 50, margin sum 25
var cardHeight = height > width ? (width - 150) / 4 : (height - 150) / 4;
function GameCards(props) {
   let { height, width } = Dimensions.get('window');
   cardHeight = height > width ? width / 4 - 10 : (height - 100) / 4 - 10;
  return (
    <TouchableHighlight style={styles.card} onPress={() => { props.handleTouch(props.id, props.color) }}>
      {props.visible ?
        //FOR DEBUG
        //<Text style = {{fontSize: 20}}>{props.color}</Text>:
        <Image style={styles.image} source={props.revealed ? colorPath[props.color] : require('./../../assets/Cardfacing_down.jpg')} /> :
        <Text></Text>}
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 5,
    height: cardHeight,
    width: cardHeight,
  },
  image: {
    height: cardHeight,
    width: cardHeight,
  }
});
export default GameCards;