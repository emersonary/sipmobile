import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';

import login from '../../assets/login.png';

export default class LoginError extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.loginwrap}>
        <Text style={styles.msgText}>{this.props.msg}</Text>
        <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
          <Image source={login} style={styles.imageStyle} />
          <Text style={styles.buttonText}> Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#496DDB',
    borderRadius: 4,
    margin: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  msgText: {
    marginTop: 10,
    color: '#F00',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginwrap: {
    width: 'auto',
    height: 'auto',
    backgroundColor: '#717EC380',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 8,
    marginBottom: 40,
  },
});
