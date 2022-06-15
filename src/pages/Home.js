import React, {Component} from 'react';

import {Text, SafeAreaView, StyleSheet} from 'react-native';

export default class Home extends Component {
  constructor(props) {
    super(props);

    const iddevice = props.navigation.getParam('iddevice');
    const pincode = props.navigation.getParam('pincode');
    const iduser = props.navigation.getParam('iduser');
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.infotext}>texto</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
  },
  infotext: {
    color: '#DDD',
  },
});
