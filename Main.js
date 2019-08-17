import React, { Component } from 'react';
import { StyleSheet, Image, View, Button } from 'react-native';
import Game from './components/Game/Game';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  title: state.score,
});

class Logo extends React.Component {
  render() {
    return (
      <Image style={styles.icon} source={require('./assets/AppIcon.png')} />
    );
  }
}

class HighScore extends React.Component {
  render() {
    return (
      <Button
        style={styles.highscore}
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

class Main extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <Logo />,
      headerRightContainerStyle: { paddingRight: 10, paddingLeft: 10 },
      headerRight: (
        <HighScore nav={navigation} />
      ),
      title: 'score: '+navigation.getParam('title', '0'),
      headerTitleStyle: { textAlign: 'center', alignSelf: 'center', flex: 1 },
    }
  };

  componentWillMount() {
    this.props.navigation.setParams({ 'title': this.props.title.toString() });
  }

  componentDidUpdate() {
    if (this.props.navigation.getParam('title', '0') != this.props.title.toString()) {
      this.props.navigation.setParams({ 'title': this.props.title.toString() });
    }
  }

  render() {
    return (
      <View style={styles.app}>
        <Game nav={this.props.navigation} />
        {/* <Button title='End game' onPress={() => this.props.navigation.navigate('AskName', { score: this.props.title })}></Button> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
  icon: {
    marginLeft: 10,
    width: 50,
    height: 50,
  },
  highscore: {
    marginRight: 10,
  }
});

export default connect(mapStateToProps)(Main);