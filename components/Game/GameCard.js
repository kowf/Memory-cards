import React, {Component} from 'react';
import {View, StyleSheet, Image, Alert, TouchableHighlight, Text} from 'react-native';


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

function GameCards (props){
    return (
      <TouchableHighlight style={styles.card}  onPress={() => {props.handleTouch(props.id,props.color)}}>
        { props.visible[props.id] ? 
        //FOR DEBUG
        //<Text style = {{fontSize: 20}}>{props.color}</Text>:
        <Image source = { props.revealed[props.id] ? colorPath[props.color] : require('./../../assets/Cardfacing_down.jpg') } /> :
        <Text></Text>}
      </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
  card:{
    margin: 1,
    flex: 1,
  }
});
export default GameCards;