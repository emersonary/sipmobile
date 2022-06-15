import React, {Component} from 'react';

import {ScrollView, Image, Text, View, StyleSheet} from 'react-native';

import {PieChart} from 'react-native-svg-charts';

import Table from './table';

export default class Pie extends Component {
  Colors = [
    '#0000ff',
    '#ff00ff',
    '#006400',
    '#ff0000',
    '#8b4513',
    '#bdb76b',
    '#00fa9a',
    '#da70d6',
    '#00008b',
    '#48d1cc',
    '#2f4f4f',
    '#ffa500',
    '#ffb6c1',
    '#aaaaaa',
    '#00ff00',
    '#1e90ff',
  ];

  constructor(props) {
    super(props);
  }

  pieDataFromData = () => {
    let numbers = [];

    const {columnindex} = this.props.data.piechart;

    this.props.data.data.items.map((row, rowindex) => {
      numbers.push(row.row[columnindex]);
    });

    return numbers;
  };

  render() {
    let data = this.pieDataFromData();

    let pieData = data.map((value, index) => ({
      value,
      svg: {
        fill: this.Colors[index],
        onPress: () => console.log('press', index),
      },
      key: `pie-${index}`,
    }));

    return (
      <View style={styles.Parent}>
        {!this.props.hidePie && (
          <View style={styles.UmTerco}>
            <PieChart
              style={{height: this.props.size}}
              data={pieData}
              innerRadius="60%"
            />
          </View>
        )}
        {!this.props.hideTable && (
          <View style={styles.DoisTercos}>
            <Table
              data={this.props.data}
              colors={this.Colors}
              hideTitulo={this.props.hideTitulo}
              fullNumbers={this.props.hidePie}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Parent: {
    flexDirection: 'row',
    flex: 1,
  },
  UmTerco: {
    justifyContent: 'center',
    marginLeft: 5,
    flex: 1,
    height: '100%',
  },
  DoisTercos: {
    flex: 2,
    height: '100%',
  },
});
