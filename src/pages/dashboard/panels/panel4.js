import React, {Component} from 'react';

import {View} from 'react-native';

import Pie from '../../components/pie';
import Gauge from '../../components/gauge';
import {ButtonGroup} from 'react-native-elements';
import Table from '../../components/table';

import styles from '../styles';

// hoje = () => {
//   var today = new Date();
//   var dd = String(today.getDate()).padStart(2, '0');
//   var mm = String(today.getMonth() + 1).padStart(2, '0');
//   var yyyy = today.getFullYear();

//   return dd + '/' + mm + '/' + yyyy;
// };

const cnodetype = ['ntall', 'ntcanal', 'ntregional', 'ntgrupoestab', 'ntestab'];

const Colors = [
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

export default class Panel4 extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedIndex: 0};

    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({selectedIndex});
  }

  render() {
    const {selectedIndex} = this.state;

    let {items, diabase} = this.props.dashboard.dashs;
    let {selectednode} = this.props;

    let ProdutoData = items.find(dash => {
      return (
        dash.id === 4 &&
        dash.de === diabase &&
        dash.ate === diabase &&
        dash.idnode == selectednode.id &&
        dash.nodetype == cnodetype[selectednode.level]
      );
    });

    return (
      <View style={styles.MainWrap}>
        <View style={styles.Client}>
          {ProdutoData && (
            <View style={styles.ClientRow}>
              <View style={styles.ClientPanel}>
                <View style={styles.Visor}>
                  <Table
                    data={ProdutoData}
                    size={110}
                    colors={Colors}
                    fullNumbers={this.props.hidePie}
                  />
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}
