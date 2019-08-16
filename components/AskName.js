import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
export default class AskName extends React.Component {

  // static navigationOptions = {
  //     header: null
  // };

  constructor(props) {
    super(props);
    this.state = {
      list: null,
      name: '',
      rank: 0,
      error: false,
      errorMsg: '',
      score: this.props.navigation.getParam('score')
    }
  }
  componentWillMount() {
    this.getRank()
    }
    
    getRank = async () => {
      try {
        const list = await AsyncStorage.getItem('HIGHSCORE');
        let parsed = JSON.parse(list)
        if (parsed === null) {
          parsed = [];
        }
        this.setState({ list: parsed });
        const newScore = parsed.map(item => item.score)
        newScore.push(this.state.score);
        const distinctScore = [...new Set(newScore)];
        distinctScore.sort((a, b) => b - a);
        const rank = distinctScore.findIndex(item => item === this.state.score);
        this.setState({ rank: rank + 1 });        
    } catch (e) {
      console.error('Failed to fetch list.')
    }
  }

  save = async () => {
    try {
      const toStore = this.state.list;
      toStore.push({name: this.state.name, score: this.state.score });
      toStore.sort((a,b) => b.score - a.score);
      await AsyncStorage.setItem('HIGHSCORE', JSON.stringify(toStore));
    } catch (e) {
      console.error('Failed to save name.')
    }
  }

  onChangeText = (text) => {
    if (/[^a-z|\s]/i.test(text)) {
      this.setState({ error: true });
      this.setState({errorMsg: '50rry, @lphabets only'})
    } else if (/^\s/.test(text)) {
      this.setState({ error: true });
      this.setState({errorMsg: "Don't start your name with space"})
    }
    else this.setState({ error: false });
    this.setState({ name: text });
  }

  handleSubmit() {
    if (this.state.error) {
      return
    }
    if (this.state.name === '') {
      this.setState({ name: 'unnamed' });
    }
    this.save();
    this.props.navigation.navigate('Main');
  }
  render() {
    const score = this.props.navigation.getParam('score')
    return (
      <View style={styles.container}>
        <Text style={styles.score} >You scored {score} </Text>
        <Text style={styles.rank}>Rank {this.state.rank}</Text>
        <TextInput
          textContentType='name'
          style={styles.input}
          placeholder="Enter you name here"
          onChangeText={(e) => this.onChangeText(e)}
          onSubmitEditing={() => this.handleSubmit()}
          value={this.state.name}
        />
        {this.state.error && <Text style={styles.error}>{this.state.errorMsg}</Text>}
        <View style={styles.submit}>
          <Button
            title="Submit"
            color={this.state.error && '#c9c9c9'}
            onPress={() => this.handleSubmit()}
          />
        </View>
        <Button
          title="clear mem"
          onPress={() => {AsyncStorage.clear(); this.setState({list: [], rank: 0})}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  score: {
    fontSize: 20,
    paddingTop: 50
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
  },
  submit: {
    margin: 10
  },
  error: {
    color: 'red',
  }
});