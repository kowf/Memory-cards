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
            error: false
        }
    }

    handleTouch(){
        this.props.navigation.navigate('Main');
    }

  render() {
    const score = this.props.navigation.getParam('score');
    return (
      <View style={ styles.container }>
          <Text>You scored {score} </Text>
          <TextInput
          autoFocus = {true}
          textContentType = 'name'
          style = {{height: 40, borderColor: 'gray', borderBottomWidth: 1}}
          placeholder = "Enter you name here"
          onChangeText = {(text) => {
              if (/[^a-z|\s]/i.test(text) || /^\s/.test(text)){
                this.setState({error: true});
              } else this.setState({error: false});
              this.setState({name: text});
            }}
          value = {this.state.name}
        />
        {this.state.error && <Text style = {styles.error}>error</Text>}
          <Button
          title = "Submit"
          onPress = {this.state.error? null : () => this.handleTouch()}
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
  },
  error: {
    color: 'red'
  }
});