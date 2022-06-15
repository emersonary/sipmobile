import React, { Component } from 'react';

import { View, StyleSheet, Text } from 'react-native';

import RNSpeedometer from 'react-native-speedometer';

const circleradius = 160;
const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#111',
    marginTop: 2,
    height: 100,
  },
  textLegend: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  Legend: {
    paddingLeft: 7,
    paddingRight: 9,
    flex: 1,
    backgroundColor: '#111',
    flexDirection: 'row',
  },
  Perc: {
    flex: 3,
  },
  Valor: {
    flex: 3,
    alignItems: 'flex-end',
  },
});

export default class Gauge extends Component {
  constructor(props) {
    super(props);
  }

  perc = () => {
    const { total, meta } = this.props;
    return (total / meta) * 100;
  };

  formatedTotal = () => {
    const { total } = this.props;

    if (total < 1000) {
      return total;
    } else {
      if (total < 1000000) {
        return (total / 1000).toFixed(1).replace('.', 'K');
      } else {
        return (total / 1000000).toFixed(1).replace('.', 'M');
      }
    }
  };

  render() {
    return (
      <View style={styles.Container}>
        <RNSpeedometer
          size={circleradius * 0.7}
          innerCircleStyle={{
            backgroundColor: '#111',
            width: circleradius * 0.6,
            height: (circleradius / 2) * 0.6,
            borderTopLeftRadius: circleradius / 2 - 10,
            borderTopRightRadius: circleradius / 2 - 10,
          }}
          value={this.props.total}
          maxValue={this.props.meta}
          labelStyle={{
            display: 'none',
          }}
          labelNoteStyle={{
            display: 'none',
          }}
          labels={[
            {
              name: 'Pathetically weak',
              labelColor: '#FE0002',
              activeBarColor: '#FE0002',
            },
            {
              name: 'Very weak',
              labelColor: '#D80027',
              activeBarColor: '#D80027',
            },
            {
              name: 'So-so',
              labelColor: '#A1015D',
              activeBarColor: '#A1015D',
            },
            {
              name: 'Fair',
              labelColor: '#63009E',
              activeBarColor: '#63009E',
            },
            {
              name: 'Strong',
              labelColor: '#2A00D5',
              activeBarColor: '#2A00D5',
            },
            {
              name: 'Unbelievably strong',
              labelColor: '#0302FC',
              activeBarColor: '#0302FC',
            },
          ]}
        />
        <View style={styles.Legend}>
          <View style={styles.Perc}>
            <Text style={styles.textLegend}>({this.perc().toFixed(0)}%)</Text>
          </View>
          <View style={styles.Valor}>
            <Text style={styles.textLegend}>{this.formatedTotal()}</Text>
          </View>
        </View>
      </View>
    );
  }
}

