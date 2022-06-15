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

function PropsFromNode(canais, level, id) {
  let result = 'INDEFINIDO';
  canais.items.map(canal => {
    if (canal.id == id && level == 1) {
      result = {
        tiponode: 'canal',
        descr: canal.descr,
        fatur: canal.fatur,
        meta: canal.meta,
        qtdesegge: canal.qtdesegge,
        elegsegge: canal.elegsegge,
        qtdesegpf: canal.qtdesegpf,
        elegsegpf: canal.elegsegpf,
        qtdeitem: canal.qtdeitem,
      };
    } else {
      canal.regionais.items.map(regional => {
        if (regional.id == id && level == 2) {
          result = {
            tiponode: 'regional',
            descr: regional.descr,
            fatur: regional.fatur,
            meta: regional.meta,
            qtdesegge: regional.qtdesegge,
            elegsegge: regional.elegsegge,
            qtdesegpf: regional.qtdesegpf,
            elegsegpf: regional.elegsegpf,
            qtdeitem: regional.qtdeitem,
          };
        } else {
          regional.grupoestabs.items.map(grupoestab => {
            if (grupoestab.id == id && level == 3) {
              result = {
                tiponode: 'grupoestab',
                descr: grupoestab.descr,
                fatur: grupoestab.fatur,
                meta: grupoestab.meta,
                qtdesegge: grupoestab.qtdesegge,
                elegsegge: grupoestab.elegsegge,
                qtdesegpf: grupoestab.qtdesegpf,
                elegsegpf: grupoestab.elegsegpf,
                qtdeitem: grupoestab.qtdeitem,
              };
            } else {
              grupoestab.estabs.items.map(estab => {
                if (estab.id == id && level == 4) {
                  result = {
                    tiponode: 'estab',
                    descr: estab.descr,
                    fatur: estab.fatur,
                    meta: estab.meta,
                    qtdesegge: estab.qtdesegge,
                    elegsegge: estab.elegsegge,
                    qtdesegpf: estab.qtdesegpf,
                    elegsegpf: estab.elegsegpf,
                    qtdeitem: estab.qtdeitem,
                  };
                }
              });
            }
          });
        }
      });
    }
  });
  return result;
}

export default class Panel6 extends Component {
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

    let {items, diabase, canais} = this.props.dashboard.dashs;
    let {selectednode} = this.props;

    let dashDescontosSumData = items.find(dash => {
      return (
        dash.id === 24 &&
        dash.de === diabase &&
        dash.ate === diabase &&
        dash.idnode == selectednode.id &&
        dash.nodetype == cnodetype[selectednode.level]
      );
    });

    let dashDescontosData = items.find(dash => {
      return (
        dash.id === 23 &&
        dash.de === diabase &&
        dash.ate === diabase &&
        dash.idnode == selectednode.id &&
        dash.nodetype == cnodetype[selectednode.level]
      );
    });

    return (
      <View style={styles.MainWrap}>
        <View style={styles.HeaderPlus2}>
          {dashDescontosSumData && (
            <View style={styles.HeaderPanel}>
              <View style={styles.PanelTable}>
                <Pie
                  data={dashDescontosSumData}
                  size={60}
                  hideTitulo
                  hidePie={this.props.hidePie}
                />
              </View>
            </View>
          )}
        </View>
        <View style={styles.Client}>
          {dashDescontosData && (
            <View style={styles.ClientRow}>
              <View style={styles.ClientPanel}>
                <View style={styles.Visor}>
                  <Table data={dashDescontosData} size={110} />
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}
