import React from 'react';
import { StyleSheet, FlatList, Text, AsyncStorage, View } from 'react-native';

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
        {
          rank: this.state.score.findIndex(v => v === item.score) + 1,
          name: item.name,
          score: item.score
        }
      )
    })
    return (
      <FlatList 
        contentContainerStyle={{flexGrow: 1, justifyContent:'center', alignItems:'center', }}
        data={renderScore}
        keyExtractor = {(item, key) => (key)}
        renderItem={
          ({ item }) => {
            return (

                <Text>{item.score}{item.name}</Text>

            )
          }
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fafafa'
  },
  row: {
    flexDirection: 'row',
    flex: 1, 
    justifyContent:'space-around', 
    alignItems: 'space-around', 
    alignItems: 'flex-start',
    
  }
});