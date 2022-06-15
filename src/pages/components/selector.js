import React, {Component} from 'react';

import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

import Table from './table';

function Filiais(estabs) {
  let litems = [];

  estabs.items.map(estab => {
    litems.push({
      id: estab.id,
      row: [
        estab.descr
          .replace('SHOPPING ', '')
          .replace('OFFICE COM.VC - ', '')
          .replace('OFFICE COM.VC-', ''),
        estab.fatur,
        estab.meta,
      ],
      style: {bold: false, color: '#FCDEBE'},
    });
  });

  return litems;
}

function GruposFilial(gruposfilial, rootinfo) {
  let litems = [];

  gruposfilial.items.map(grupofilial => {
    if (
      !rootinfo ||
      rootinfo.nodetype == 'ntregional' ||
      (rootinfo.nodetype == 'ntgrupoestab' && rootinfo.nodeid == grupofilial.id)
    ) {
      litems.push({
        id: grupofilial.id,
        row: [
          grupofilial.descr
            .replace('OFFICE COM.VC - ', '')
            .replace('OFFICE COM.VC-', ''),
          grupofilial.fatur,
          grupofilial.meta,
        ],
        style: {bold: true, color: '#928779'},
        listarow: {items: Filiais(grupofilial.estabs)},
      });
    }
  });

  return litems;
}

function Regioes(regionais, rootinfo) {
  let litems = [];

  regionais.items.map(regional => {
    if (
      !rootinfo ||
      rootinfo.nodetype == 'ntgrupoestab' ||
      rootinfo.nodetype == 'ntregional' /*&& rootinfo.nodeid == regional.id*/
    ) {
      litems.push({
        id: regional.id,
        row: [
          regional.descr.replace('REGIONAL ', ''),
          regional.fatur,
          regional.meta,
        ],
        style: {bold: true, color: '#D4D2A5'},
        listarow: {items: GruposFilial(regional.grupoestabs, rootinfo)},
      });
    }
  });

  return litems;
}

function RegionalFromEstab(data, nodeid) {
  const {listarow} = data.items[0].listarow.items.find(
    rw => rw.row[0] == 'LOJA',
  );

  let regional = '';
  let result = null;

  listarow.items.map(it => {
    regional = it.row[0];

    it.listarow.items.map(lj => {
      if (lj.id == nodeid) {
        result = regional;
      }
    });
  });

  return result;
}

// function SelectRoot(data, rootinfo) {
//   if (!rootinfo) {
//     return data;
//   } else if (rootinfo.nodetype == 'ntregional') {
//     return data.items[0].listarow.items.find(rw => rw.row[0] == 'LOJA')
//       .listarow;
//   } else if (rootinfo.nodetype == 'ntgrupoestab') {
//     let lregional = RegionalFromEstab(data, rootinfo.nodeid);
//     return data.items[0].listarow.items
//       .find(rw => rw.row[0] == 'LOJA')
//       .listarow.items.find(rw => rw.row[0] == lregional).listarow;
//   }
// }

function SelectRoot(data, rootinfo) {
  if (!rootinfo) {
    return data;
  } else if (rootinfo.nodetype == 'ntregional') {
    return data.items[0].listarow;
  } else if (rootinfo.nodetype == 'ntgrupoestab') {
    let lregional = RegionalFromEstab(data, rootinfo.nodeid);
    return data.items[0].listarow.items
      .find(rw => rw.row[0] == 'LOJA')
      .listarow.items.find(rw => rw.row[0] == lregional).listarow;
  }
}

function SelectorData(canais, rootinfo) {
  let litems = [];

  canais.items.map(canal => {
    if (
      !rootinfo ||
      (rootinfo.nodetype != 'ntregional' || canal.descr == 'LOJA')
    ) {
      litems.push({
        id: canal.id,
        row: [canal.descr, canal.fatur, canal.meta],
        style: {bold: true, color: '#E2C044'},
        listarow: {items: Regioes(canal.regionais, rootinfo)},
      });
    }
  });

  const ldata = {
    items: [
      {
        id: -1,
        row: [
          'GERAL',
          canais.items.reduce((a, b) => {
            return a + b.fatur;
          }, 0),
          canais.items.reduce((a, b) => {
            return a + b.meta;
          }, 0),
        ],
        style: {bold: true, color: '#FFF'},
        listarow: {items: litems},
      },
    ],
  };

  return {
    titulo: 'Árvore de Estabelecimentos',
    font: {size: 16},
    columns: {
      items: [
        {caption: 'Canal / Região / Micro / Estab', flex: 3, format: 'S'},
        {caption: 'Fatur', flex: 0.8, format: 'K'},
        {caption: 'Meta', flex: 0.8, format: 'K'},
      ],
    },
    data: SelectRoot(ldata, rootinfo),
  };
}

export default class Selector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canais: props.data.canais,
      rootinfo: props.rootinfo,
      selected: '',
    };
  }

  render() {
    return (
      <View style={styles.backGround}>
        <View style={styles.Dialog}>
          <View style={styles.Table}>
            <Table
              data={SelectorData(this.state.canais, this.state.rootinfo)}
              selected
              hideTitulo
              onPress={selected => {
                this.setState({selected});
              }}
            />
          </View>
          <View style={styles.Buttons}>
            {!!this.state.selected && (
              <TouchableOpacity
                onPress={() => {
                  console.log('selected', this.state.selected);
                  console.log('rootinfo', this.state.rootinfo);
                  this.props.onPress(this.state.selected, this.state.rootinfo);
                }}
                style={[styles.Button, {backgroundColor: '#090'}]}>
                <Text style={styles.ButtonText}>Confirmar</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                this.props.onPress('cancel', null);
              }}
              style={[styles.Button, {backgroundColor: '#F00'}]}>
              <Text style={styles.ButtonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backGround: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundColor: '#000C',
  },
  Table: {
    flex: 1,
  },
  Buttons: {
    height: 60,
    flexDirection: 'row',
  },
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 5,

    flex: 1,
  },
  ButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  Dialog: {
    flex: 1,
    marginTop: 36,
    marginBottom: 20,
    marginLeft: 34,
    marginRight: 34,
    backgroundColor: 'rgba(22, 32, 43, 1)',
    borderRadius: 5,
  },
});
