import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import GameCard from './GameCard';
import {actionCreators} from './../../redux/redux';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  state: state,
});

var inProgress = false;

class Game extends React.Component {
  handleTouch = (id, color) => {
    
    if (this.props.state.revealed[id] || !this.props.state.visible[id] || inProgress) {
      return;
    }
    this.props.dispatch(actionCreators.addFlipCount(1));
    this.props.dispatch(actionCreators.reveal(id, true));
    //last card = before this touch
    
    if (this.props.state.flipCount === 2) {
      this.props.dispatch(actionCreators.addFlipCount(-2));
      if (this.props.state.lastCard.color !== color) {
        //failed: cover both cards
        inProgress = true;
        setTimeout(() => {
          this.props.dispatch(actionCreators.score(-1));
          this.props.dispatch(actionCreators.reveal(this.props.state.lastCard.id,false));
          this.props.dispatch(actionCreators.reveal(id, false)); 
          inProgress = false;
        },1000);
      } else {
        //scores: hide both cards
        inProgress = true;
        setTimeout(() => {
          this.props.dispatch(actionCreators.score(5));
          this.props.dispatch(actionCreators.hide(this.props.state.lastCard.id));
          this.props.dispatch(actionCreators.hide(id)); 
          this.props.dispatch(actionCreators.removePair(1));
          if (this.props.state.pairCount === 0 ){
            //win
            this.props.nav.navigate('AskName', {score: this.props.state.score});
            this.props.dispatch(actionCreators.resetGame());
            this.props.dispatch(actionCreators.setColor(this.initColor()));
            this.render();
          }
          inProgress = false;     
        },1000);
           
        this.render();
      }
    }
    else {
       this.props.dispatch(actionCreators.setLastCard(id,color));
    }
    
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
            <GameCard key =  {0}  id = {0} revealed = {this.props.state.revealed} visible = {this.props.state.visible} handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[0]} />
            <GameCard key =  {1}  id = {1} revealed = {this.props.state.revealed} visible = {this.props.state.visible} handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[1]} />
            <GameCard key =  {2}  id = {2} revealed = {this.props.state.revealed} visible = {this.props.state.visible} handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[2]} />
            <GameCard key =  {3}  id = {3} revealed = {this.props.state.revealed} visible = {this.props.state.visible} handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[3]} />
          </View>
          <View style = {styles.row}>
            <GameCard key =  {4}  id = {4} revealed = {this.props.state.revealed} visible = {this.props.state.visible} handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[4]} />
            <GameCard key =  {5}  id = {5} revealed = {this.props.state.revealed} visible = {this.props.state.visible} handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[5]} />
            <GameCard key =  {6}  id = {6} revealed = {this.props.state.revealed} visible = {this.props.state.visible} handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[6]} />
            <GameCard key =  {7}  id = {7} revealed = {this.props.state.revealed} visible = {this.props.state.visible} handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[7]} />
          </View>
          <View style = {styles.row}>
            <GameCard key =  {8}  id = {8} revealed = {this.props.state.revealed} visible = {this.props.state.visible} handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[8]} />
            <GameCard key =  {9}  id = {9}revealed = {this.props.state.revealed} visible = {this.props.state.visible} handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[9]} />
            <GameCard key =  {10} id = {10}revealed = {this.props.state.revealed} visible = {this.props.state.visible} handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[10]}  />
            <GameCard key =  {11} id = {11}revealed = {this.props.state.revealed} visible = {this.props.state.visible} handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[11]}  />
          </View>
          <View style = {styles.row}>
            <GameCard key =  {12} id = {12}revealed = {this.props.state.revealed} visible = {this.props.state.visible} handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[12]}  />
            <GameCard key =  {13} id = {13}revealed = {this.props.state.revealed} visible = {this.props.state.visible} handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[13]}  />
            <GameCard key =  {14} id = {14}revealed = {this.props.state.revealed} visible = {this.props.state.visible} handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[14]}  />
            <GameCard key =  {15} id = {15}revealed = {this.props.state.revealed} visible = {this.props.state.visible} handleTouch = {this.handleTouch} color = {this.props.state.cardsColor[15]}  />
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