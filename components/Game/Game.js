import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import GameCard from './GameCard';
import {actionCreators} from './../../redux/redux';
import store from './../../redux/store';

import { connect } from 'react-redux'


const mapStateToProps = (state) => ({
  state: state,
});

class Game extends React.Component {
  handleTouch(id, color) {
    console.log(id,color);
  } 

  initColor (){
    
    const colorList = [];
    let currentColor = 0;
    for(let i = 0; i < 16; i++){
        colorList[i] = ++currentColor;
      if (currentColor === 8){
        currentColor = 0;
      }
    }
    colorList.sort(() => { return 0.5 - Math.random() });
    return colorList;
  }

  componentWillMount(){
      this.props.dispatch(actionCreators.setColor(this.initColor()));
  }
  render(){
    return (
        <View style = {styles.game}>
          <View style = {styles.row}>
            <GameCard key =  {1}  id = {1}  handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[0]} />
            <GameCard key =  {2}  id = {2}  handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[1]} />
            <GameCard key =  {3}  id = {3}  handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[2]} />
            <GameCard key =  {4}  id = {4}  handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[3]} />
          </View>
          <View style = {styles.row}>
            <GameCard key =  {5}  id = {5}  handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[4]} />
            <GameCard key =  {6}  id = {6}  handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[5]} />
            <GameCard key =  {7}  id = {7}  handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[6]} />
            <GameCard key =  {8}  id = {8}  handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[7]} />
          </View>
          <View style = {styles.row}>
            <GameCard key =  {9}  id = {9}  handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[8]} />
            <GameCard key =  {10} id = {10} handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[9]} />
            <GameCard key =  {11} id = {11} handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[10]}  />
            <GameCard key =  {12} id = {12} handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[11]}  />
          </View>
          <View style = {styles.row}>
            <GameCard key =  {13} id = {13} handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[12]}  />
            <GameCard key =  {14} id = {14} handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[13]}  />
            <GameCard key =  {15} id = {15} handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[14]}  />
            <GameCard key =  {16} id = {16} handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[15]}  />
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  game: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    flexShrink: 1,
    
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexShrink: 1,
  }
});

export default connect(mapStateToProps)(Game);