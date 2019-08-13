import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Score extends React.Component {
    static navigationOptions = {
        headerLeft: (<View></View>)
    };
  render() {
    return (
      <View style={ styles.container }>
          <Text>hello</Text>
          <Button
          title="Submit"
          onPress={() =>
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