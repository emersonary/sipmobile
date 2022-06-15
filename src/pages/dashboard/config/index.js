import React, {Component} from 'react';

import {View, TouchableOpacity, Text, Switch} from 'react-native';

import styles from './styles';

export default class Config extends Component {
  constructor(props) {
    super(props);

    this.state = {mostraGrafico: props.mostraGrafico};
  }

  render() {
    return (
      <View style={styles.backGround}>
        <View style={styles.Dialog}>
          <View style={styles.Table}>
            <View style={styles.SwitchView}>
              <Text style={styles.SwitchText}>Mostra Gráfico</Text>
            </View>
            <Switch
              style={styles.Switch}
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={this.state.mostraGrafico ? '#fff' : '#ddd'}
              ios_backgroundColor="#3e3e3e"
              value={this.state.mostraGrafico}
              onValueChange={() => {
                this.setState({mostraGrafico: !this.state.mostraGrafico});
              }}
            />
          </View>
          <View style={styles.Buttons}>
            <TouchableOpacity
              onPress={() => {
                this.props.onPress(this.state.mostraGrafico);
              }}
              style={[styles.Button, {backgroundColor: '#090'}]}>
              <Text style={styles.ButtonText}>Confirma</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.onPress('cancel');
              }}
              style={[styles.Button, {backgroundColor: '#F00'}]}>
              <Text style={styles.ButtonText}>Cancela</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
