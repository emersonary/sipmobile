import React, {Component} from 'react';

import {View, Text} from 'react-native';

import Pie from '../../components/pie';
import Gauge from '../../components/gauge';
import {ButtonGroup} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
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
        qtdeped: canal.qtdeped,
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
            qtdeped: regional.qtdeped,
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
                qtdeped: grupoestab.qtdeped,
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
                    qtdeped: estab.qtdeped,
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

function BuildHeader(dashData) {
  return (
    <View style={styles.Header}>
      <View style={styles.HeaderPanel}>
        <View style={styles.Visor}>
          <Gauge
            total={dashData.data.items[0].row[1]}
            meta={dashData.data.items[0].row[2]}
          />
        </View>
      </View>

      <View style={styles.HeaderPanel2}>
        <View style={styles.PanelTable}>
          <Table data={dashData} hideTitulo />
        </View>
      </View>
    </View>
  );
}
export default class Panel1 extends Component {
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

    let dashData = null;

    if (selectednode.level == 0) {
      dashData = items.find(dash => {
        return (
          dash.id === 5 &&
          dash.de === diabase &&
          dash.ate === diabase &&
          dash.idnode === -1
        );
      });
    } else {
      let props = PropsFromNode(canais, selectednode.level, selectednode.id);

      if (props) {
        dashData = {
          titulo: 'Árvore de Estabelecimentos',
          columns: {
            items: [
              {caption: '', flex: 0.8, format: 'S'},
              {caption: 'Valor', flex: 1, format: 'K'},
              {caption: 'Meta', flex: 1, format: 'K'},
              {caption: 'Atg', flex: 1, format: 'N%'},
            ],
          },
          data: {
            items: [
              {
                row: [
                  'Fatur:',
                  props.fatur,
                  props.meta,
                  props.meta != 0 ? (props.fatur / props.meta) * 100 : 0,
                ],
                style: {bold: true, fontsize: 12, color: ''},
              },
              {
                row: [
                  'GE:',
                  props.qtdesegge,
                  props.elegsegge,
                  props.elegsegge != 0
                    ? (props.qtdesegge / props.elegsegge) * 100
                    : 0,
                ],
                format: ['S', 'I', 'I', 'N%'],
              },
              {
                row: [
                  'PF:',
                  props.qtdesegpf,
                  props.elegsegpf,
                  props.elegsegpf != 0
                    ? (props.qtdesegpf / props.elegsegpf) * 100
                    : 0,
                ],
                format: ['S', 'I', 'I', 'N%'],
              },
              {
                row: [
                  'TM/PA:',
                  props.qtdeitem != 0 ? props.fatur / props.qtdeitem : 0,
                  props.qtdeped != 0
                    ? Math.round(props.qtdeped / props.qtdeitem, 2)
                    : 0,
                  '',
                ],
                format: ['S', 'N2', 'S', 'S'],
              },
            ],
          },
        };
      }
    }

    let CanalVendaData = null;

    CanalVendaData = items.find(dash => {
      return (
        dash.id === 1 &&
        dash.de === diabase &&
        dash.ate === diabase &&
        dash.idnode == selectednode.id &&
        dash.nodetype == cnodetype[selectednode.level]
      );
    });

    if (!CanalVendaData) {
      CanalVendaData = items.find(dash => {
        return (
          dash.id === 22 &&
          dash.de === diabase &&
          dash.ate === diabase &&
          dash.idnode == selectednode.id &&
          dash.nodetype == cnodetype[selectednode.level]
        );
      });
    }

    let FmpgtoData = items.find(dash => {
      return (
        dash.id === 2 &&
        dash.de === diabase &&
        dash.ate === diabase &&
        dash.idnode == selectednode.id &&
        dash.nodetype == cnodetype[selectednode.level]
      );
    });

    let CategoriaData = items.find(dash => {
      return (
        dash.id === 3 &&
        dash.de === diabase &&
        dash.ate === diabase &&
        dash.idnode == selectednode.id &&
        dash.nodetype == cnodetype[selectednode.level]
      );
    });

    const lshowheader =
      dashData &&
      dashData.data.items[0].row[1] &&
      dashData.data.items[0].row[2] &&
      dashData.data.items[0].row[2] != 0;

    return (
      <View style={styles.MainWrap}>
        {!!lshowheader && BuildHeader(dashData)}
        <View style={styles.Client}>
          {CanalVendaData || FmpgtoData || CategoriaData ? (
            <View>
              {CanalVendaData && (
                <View style={[styles.ClientRowBigger]}>
                  <View style={styles.ClientPanel}>
                    <View style={styles.Visor}>
                      <Pie
                        data={CanalVendaData}
                        size={110}
                        // hidePie={this.props.hidePie}
                        hidePie={true}
                      />
                    </View>
                  </View>
                </View>
              )}
              {FmpgtoData && (
                <View style={styles.ClientRowSmaller}>
                  <View style={styles.ClientPanel}>
                    <View style={styles.Visor}>
                      <Pie
                        data={FmpgtoData}
                        size={110}
                        hidePie={this.props.hidePie}
                      />
                    </View>
                  </View>
                </View>
              )}
              {CategoriaData && (
                <View style={styles.ClientRow}>
                  <View style={styles.ClientPanel}>
                    <View style={styles.Visor}>
                      <Pie
                        data={CategoriaData}
                        size={110}
                        hidePie={this.props.hidePie}
                      />
                    </View>
                  </View>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.DadosInexistentes}>
              <Icon name="frown-o" size={40} color="#FFAA5A" />
              <Text style={styles.DadosInexistentesText}>
                Lojas sem dados atualizados
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}
