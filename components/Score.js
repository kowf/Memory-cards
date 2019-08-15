import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

export default class Score extends React.Component {
  static navigationOptions = {
    title: 'High Score',
  };

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      score: []
    }
  }


  componentDidMount() {
    this.load();
  }

  load = async () => {
    try {
      const list = await AsyncStorage.getItem('HIGHSCORE')
      if (list !== null) {
        let parsed = JSON.parse(list);
        this.setState({ list: parsed });
        const score = parsed.map(item => item.score)
        const distinctScore = [...new Set(score)];
        distinctScore.sort((a, b) => b - a)
        this.setState({ score: distinctScore });
        this.render();
      }
    } catch (e) {
      console.error('Failed to load score list.')
    }
  }

  render() {
    const renderScore = this.state.list.map((item, i) => {
      if (i > 10) { 
        return null; 
      }
      return (
        <View key={i} style={styles.row}>
          <Text>{this.state.score.findIndex(v => v === item.score) + 1}</Text>
          <Text>{item.name}</Text>
          <Text>{item.score}</Text>
        </View>
      )
  })
  return(
      <View style = { styles.container } >
      <View style={styles.row}>
        <Text>Rank</Text>
        <Text>Name</Text>
        <Text>Score</Text>
      </View>
        { renderScore }
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  }
});