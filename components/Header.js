import React, {Component} from 'react';
import {StyleSheet, Image, Text, View, Button} from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  state: state,
});

class Header extends React.Component {
  render(){
    return (
      <View style={styles.header}>
          <Image style={styles.icon} source={require('./../assets/AppIcon.png')}/>
          <Text style = {styles.score}>{this.props.state.score}</Text>
          <View style = {styles.highscore}>
            <Button 
            title="High score" 
            color="navy"
            onPress={() =>
              this.props.nav.navigate('Score')
            } 
            acccessibilityLabel="See the high score list"/>
          </View>  
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: '#1685f4',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
  icon:{
    flex:1,
    width: 100,
    maxHeight: 70,
  },
  score:{
    flex:1,
    textAlign: 'center',
    color: 'white'
  },
  highscore: {
    flex:1
  },
});

export default connect(mapStateToProps)(Header);