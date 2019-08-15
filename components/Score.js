import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

export default class Score extends React.Component {
  static navigationOptions = {
    title: 'High Score',
  };

  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }


  componentWillMount() {
    this.load()
  }

  load = async () => {
    try {
      const list = await AsyncStorage.getItem('HIGHSCORE')
      if (list !== null) {
        let parsed = JSON.parse(list)
        this.setState({ list: parsed })

      }
    } catch (e) {
      console.error('Failed to load score list.')
    }
  }

  render() {
    
    for (let i = 0; i < this.state.list.length; i++) {
    }
    const renderScore = this.state.list.map((item, i) =>
      (
        <View key={i} style={styles.row}>
          <Text>{item.rank}</Text>
          <Text>{item.name}</Text>
          <Text>{item.score}</Text>
        </View>
      )
    )
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text>Rank</Text>
          <Text>Name</Text>
          <Text>Score</Text>
        </View>
        {renderScore}
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