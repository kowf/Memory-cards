import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

export default class Score extends React.Component {
    static navigationOptions = {
        title: 'High Score',
    };

    constructor(props){
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
          this.setState({list: parsed})

        }        
      } catch (e) {
        console.error('Failed to load score list.')
      }
    }
  
  render() {
    let scoreList = this.state.list
    scoreList.sort((a,b)=>(a.score < b.score ? 1 : -1));
    for (let i = 0; i < scoreList.length; i++){
    }
    const renderScore = scoreList.map((item,i) => 
       (
        <View key = {i} style = {{flexDirection: 'row'}}>
          <Text>{i + 1}</Text>
          <Text>{item.name}</Text>
          <Text>{item.score}</Text>
        </View>
      )
    )
    return (
      <View style={styles.container}>
        <View style = {{flexDirection: 'row', justifyContent: 'space-around',
    alignItems: 'center',}}>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});