import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class AskName extends React.Component {
    static navigationOptions = {
        headerLeft: (<View></View>)
    };
    constructor(props){
        super(props);
        this.state = {
            name: '',
        }
    }
  render() {
    const score = this.props.navigation.getParam('score', '-999');
    return (
      <View style={ styles.container }>
          <Text>You scored {score} </Text>
          <TextInput
          autoFocus = {true}
          style = {{borderColor: 'gray', borderWidth: 1}}
          placeholder = "Enter you name here"
          onChangeText = {(text) => this.setState({name: text})}
          value = {this.state.name}
        />
          <Button
          title = "Submit"
          onPress = {() =>
            this.props.navigation.navigate('Main')
          }
        />
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