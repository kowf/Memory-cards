import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
export default class AskName extends React.Component {
    
    // static navigationOptions = {
    //     header: null
    // };

    constructor(props){
        super(props);
        this.state = {
            list: null,
            name: '',
            error: false
        }
    }

    save() {
        AsyncStorage.getItem('HIGHSCORE').then((value) => {
            let parsed = JSON.parse(value);
            if (parsed === null) {
                parsed = [];
            }
            const score = this.props.navigation.getParam('score');
            parsed.push({name: this.state.name, score: score});
            AsyncStorage.setItem('HIGHSCORE',JSON.stringify(parsed));
            this.setState({list: JSON.stringify(parsed)});
        })
    }
    onChangeText = (text) => {
        if (/[^a-z|\s]/i.test(text) || /^\s/.test(text)){
          this.setState({error: true});
        } else this.setState({error: false});
        this.setState({name: text});
      }

    handleSubmit(){
        if (this.state.error){
            return
        }
        if (this.state.name ===''){
            this.setState({name: 'unnamed'});
        }
        this.save(this.state.name);
        this.props.navigation.navigate('Main');
    }
  render() {
    const score = this.props.navigation.getParam('score')
    return (
      <View style={ styles.container }>
          <Text style = { styles.score } >You scored {score} </Text>
          <TextInput
            autoFocus = {true}
            textContentType = 'name'
            style = {styles.input}
            placeholder = "Enter you name here"
            onChangeText = {(e) => this.onChangeText(e)}
            onSubmitEditing = {() => this.handleSubmit()}
            value = {this.state.name}
        />
        {this.state.error && <Text style = {styles.error}>error</Text>}
        <View style = {styles.submit}>
          <Button
            title = "Submit"
            onPress = {() => this.handleSubmit()}
            />  
        </View>
        <Button
            title = "clear mem"
            onPress = {() => AsyncStorage.clear()}
        />
        <Text>{this.state.list}</Text>
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
    paddingTop:50
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