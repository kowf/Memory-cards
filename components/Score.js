import React from 'react';
import { StyleSheet, FlatList, Text, AsyncStorage, View, Dimensions } from 'react-native';
var { width } = Dimensions.get('window');
var entriesWidth = width / 3 ;
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
      return (
        { 
          index: i,
          rank: (this.state.score.findIndex(v => v === item.score) + 1).toString(),
          name: item.name,
          score: item.score.toString()
        }
      )
    })
    return (
      <FlatList 
        ListHeaderComponent={() => { return (
                      <View style={styles.headerRow}>
                        <Text style={styles.header}>Rank</Text> 
                        <Text style={styles.header}>Name</Text> 
                        <Text style={styles.header}>Score</Text>
                      </View>)}}
        keyExtractor={(item) => item.index.toString()}
        data={renderScore}
        renderItem={({item}) => 
        <View style={styles.row}>
          <Text style={styles.entries}>{item.rank}</Text>
          <Text style={styles.entries}>{item.name}</Text>
          <Text style={styles.entries}>{item.score}</Text>
        </View>}
      />
    );
  }
}

const styles = StyleSheet.create({
  headerRow: {
    backgroundColor: '#fafafa',
    paddingVertical: 10,
    flexDirection: 'row',
    flex: 1, 
    justifyContent:'space-around', 
    alignItems: 'baseline',
  },
  header: {
    width: entriesWidth,
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: entriesWidth / 3,
  },
  row: {
    flexDirection: 'row',
    flex: 1, 
    justifyContent:'space-around', 
    alignItems: 'baseline',
  },
  entries: {
    paddingLeft: entriesWidth / 3 + 5,
    paddingTop: 5,
    width: entriesWidth,
  }
});