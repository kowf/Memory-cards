import React, { Component } from 'react';
import { FlatList, View, Dimensions } from 'react-native';
import GameCard from './GameCard';
import { actionCreators } from './../../redux/actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  state: state,
});

var inProgress = false;

class Game extends React.Component {

  constructor (props) {
    let {width, height} = Dimensions.get('window')
    super(props)
    this.state = {dimensions: {width, height}}
  }

  onLayout = event => {
    let {width, height} = Dimensions.get('window')
    this.setState({dimensions: {width, height}})
    console.log("width "+width+" height "+height);
  }

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
          this.props.dispatch(actionCreators.reveal(this.props.state.lastCard.id, false));
          this.props.dispatch(actionCreators.reveal(id, false));
          inProgress = false;
        }, 1000);
      } else {
        //scores: hide both cards
        inProgress = true;
        setTimeout(() => {
          this.props.dispatch(actionCreators.score(5));
          this.props.dispatch(actionCreators.hide(this.props.state.lastCard.id));
          this.props.dispatch(actionCreators.hide(id));
          this.props.dispatch(actionCreators.removePair(1));
          if (this.props.state.pairCount === 0) {
            //win
            this.props.nav.navigate('AskName', { score: this.props.state.score });
            this.props.dispatch(actionCreators.resetGame());
            this.props.dispatch(actionCreators.setColor(this.initColor()));
            this.render();
          }
          inProgress = false;
        }, 1000);

        this.render();
      }
    }
    else {
      this.props.dispatch(actionCreators.setLastCard(id, color));
    }

  }



  initColor() {
    const colorList = [];
    let currentColor = 0;
    for (let i = 0; i < 16; i++) {
      colorList[i] = ++currentColor;
      if (currentColor === 8) {
        currentColor = 0;
      }
    }
    colorList.sort(() => { return 0.5 - Math.random() });
    return colorList;
  }

  componentWillMount() {
    this.props.dispatch(actionCreators.setColor(this.initColor()));
  }
  render() {
    const cardList = this.props.state.cardsColor.map((color, i) => { return { key: i, value: color } });
    return (
      <View 
        onLayout={(e)=> this.onLayout(e)}
        style={{flex:1, justifyContent:'center', alignItems:'center', }}
      >
        <FlatList
          contentContainerStyle={{flexGrow: 1, justifyContent:'center', alignItems:'center', }}
          data={cardList}
          numColumns={4}
          renderItem={
            ({ item }) => {
              return (
                <GameCard
                  key={item.key}
                  id={item.key}
                  revealed={this.props.state.revealed[item.key]}
                  visible={this.props.state.visible[item.key]}
                  handleTouch={this.handleTouch}
                  color={item.value}
                  size={this.state.dimensions}
                />
              )
            }
          }
        />
        </View>
    );
  }
}

export default connect(mapStateToProps)(Game);