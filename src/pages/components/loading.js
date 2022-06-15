import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

export default class Loading extends Component {
  render() {
    return (
      <View>
        <ActivityIndicator />
        <Text style={Styles.text}>Carregando...</Text>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  text: {fontSize: 16, color: '#FFF', marginTop: 5},
});
