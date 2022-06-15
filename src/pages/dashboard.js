import React, { Component } from 'react';

import { Text, View, SafeAreaView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';

import Selector from './components/selector';
import Config from './dashboard/config';

import redled from '../assets/redled.png';
import greenled from '../assets/greenled.png';
import yellowled from '../assets/yellowled.png';

import styles, { Colors } from './dashboard/styles';
import Panel1 from './dashboard/panels/panel1';
import Panel2 from './dashboard/panels/panel2';
import Panel4 from './dashboard/panels/panel4';
import Panel6 from './dashboard/panels/panel6';
import Panel5 from './dashboard/panels/panel5';

Icon.loadFont();

function levelfrom(msg, rootinfo) {
  if (!rootinfo) {
    return parseInt(msg.substr(0, 1));
  } else if (rootinfo.nodetype == 'ntregional') {
    return parseInt(msg.substr(0, 1), 10) + 1;
  } else if (rootinfo.nodetype == 'ntgrupoestab') {
    return parseInt(msg.substr(0, 1), 10) + 3;
  }
}

function idfrom(msg) {
  return msg.substr(2, msg.length - 2);
}

function DescrFromNode(canais, level, id) {
  let result = 'INDEFINIDO';
  canais.items.map(canal => {
    if (canal.id == id && level == 1) {
      result = canal.descr;
    } else {
      canal.regionais.items.map(regional => {
        if (regional.id == id && level == 2) {
          result = regional.descr;
        } else {
          regional.grupoestabs.items.map(grupoestab => {
            if (grupoestab.id == id && level == 3) {
              result = grupoestab.descr;
            } else {
              grupoestab.estabs.items.map(estab => {
                if (estab.id == id && level == 4) {
                  result = estab.descr;
                }
              });
              {
              }
            }
          });
        }
      });
    }
  });
  return result;
}

function levelfromrf(rootinfo) {
  if (!rootinfo) {
    return 0;
  } else if (rootinfo.nodetype == 'ntregional') {
    return 2;
  }
  if (rootinfo.nodetype == 'ntgrupoestab') {
    return 3;
  }
}

function idfromrf(rootinfo) {
  if (!rootinfo) {
    return -1;
  } else {
    return rootinfo.nodeid;
  }
}

export default class DashBoard extends Component {
  constructor(props) {
    super(props);

    const rf = this.props.navigation.getParam('rootinfo');

    this.state = {
      username: this.props.navigation.getParam('username'),
      dashboard: this.props.navigation.getParam('dashboard'),
      rootinfo: rf,
      dialogVisible: false,
      configVisible: false,
      selectednode: { level: levelfromrf(rf), id: idfromrf(rf) },
      hidePie: !this.props.navigation.getParam('mostragrafico'),
      panelIndex: 0,
    };

    const iddevice = props.navigation.getParam('iddevice');
    const pincode = props.navigation.getParam('pincode');
    const iduser = props.navigation.getParam('iduser');

    this.refresh = this.refresh.bind(this);
  }

  async refresh() {
    setTimeout(this.refresh, 60000);
    const dashboard = await api('dashboard', { username: this.state.username });

    if (dashboard) {
      this.setState({
        dashboard: dashboard,
      });
    }
  }

  componentDidMount() {
    setTimeout(this.refresh, 60000);
  }

  CaptionNode() {
    const { canais } = this.state.dashboard.dashs;
    const { selectednode } = this.state;

    if (selectednode.level == 0) {
      return 'GERAL';
    } else {
      return DescrFromNode(canais, selectednode.level, selectednode.id);
    }
  }
  render() {
    return (
      <SafeAreaView emulateUnlessSupported style={styles.Screen}>
        {this.state.dialogVisible && (
          <Selector
            data={this.state.dashboard.dashs}
            rootinfo={this.state.rootinfo}
            onPress={(msg, rootinfo) => {
              if (msg == 'cancel') {
                this.setState({ dialogVisible: false });
              } else {
                this.setState({
                  dialogVisible: false,
                  selectednode: {
                    level: levelfrom(msg, rootinfo),
                    id: idfrom(msg),
                  },
                });
              }
            }}
          />
        )}

        {this.state.configVisible && (
          <Config
            mostraGrafico={!this.state.hidePie}
            onPress={async msg => {
              if (msg == 'cancel') {
                this.setState({ configVisible: false });
              } else {
                await AsyncStorage.setItem(
                  'mostragrafico',
                  msg ? 'true' : 'false',
                );
                this.setState({
                  hidePie: !msg,
                  configVisible: false,
                });
              }
            }}
          />
        )}

        <View style={styles.StatusBar}>
          {/* <Text style={styles.TituloStatusBar}>
            Faturamento Polixtreme:{' R$ '}
            {this.state.dashboard.dashs.items
              .find(dash => {
                return (
                  dash.id === 19 &&
                  dash.de === this.state.dashboard.dashs.diabase &&
                  dash.ate === this.state.dashboard.dashs.diabase &&
                  dash.idnode === -1
                );
              })
              .data.items.reduce((a, b) => a + b.row[2], 0)
              .toFixed(2)}
          </Text> */}
          <Icon
            name="bars"
            size={25}
            color="#FFF"
            onPress={() => {
              alert('Menu não disponível nesta versão');
            }}
          />

          <View
            style={styles.SearchBar}
            onPress={() => {
              if (this.CaptionNode() != 'INDEFINIDO') {
                this.setState({ dialogVisible: true });
              }
            }}>
            <Icon
              style={styles.SearchBarIcon}
              name="search"
              size={12}
              color="#000"
              onPress={() => {
                if (this.CaptionNode() != 'INDEFINIDO') {
                  this.setState({ dialogVisible: true });
                }
              }}
            />
            <Text
              onPress={() => {
                if (this.CaptionNode() != 'INDEFINIDO') {
                  this.setState({ dialogVisible: true });
                }
              }}
              style={styles.SearchBarText}>
              {this.CaptionNode()}
            </Text>
          </View>
          <Icon
            name="gear"
            size={25}
            color="#FFF"
            onPress={() => {
              this.setState({ configVisible: true });
            }}
          />
        </View>
        <View style={styles.container}>
          {this.state.panelIndex == 0 && (
            <Panel1
              selectednode={this.state.selectednode}
              dashboard={this.state.dashboard}
              hidePie={this.state.hidePie}
            />
          )}
          {this.state.panelIndex == 1 && (
            <Panel2
              selectednode={this.state.selectednode}
              dashboard={this.state.dashboard}
              hidePie={this.state.hidePie}
            />
          )}
          {this.state.panelIndex == 2 && (
            <Panel4
              selectednode={this.state.selectednode}
              dashboard={this.state.dashboard}
              hidePie={this.state.hidePie}
            />
          )}
          {this.state.panelIndex == 3 && (
            <Panel6
              selectednode={this.state.selectednode}
              dashboard={this.state.dashboard}
              hidePie={this.state.hidePie}
            />
          )}
          {this.state.panelIndex == 4 && (
            <Panel5
              selectednode={this.state.selectednode}
              dashboard={this.state.dashboard}
              hidePie={this.state.hidePie}
            />
          )}

          <View style={styles.Footer}>
            <View style={styles.IconSession}>
              <View style={styles.FooterIcons}>
                <Icon
                  name="dashboard"
                  size={40}
                  color={
                    this.state.panelIndex == 0
                      ? Colors.icon.enabled
                      : Colors.icon.disabled
                  }
                  onPress={() => {
                    this.setState({ panelIndex: 0 });
                  }}
                />
                <Text
                  style={[
                    styles.FooterText,
                    {
                      color:
                        this.state.panelIndex == 0
                          ? Colors.icon.enabled
                          : Colors.icon.disabled,
                    },
                  ]}
                  onPress={() => {
                    this.setState({ panelIndex: 0 });
                  }}>
                  DashBoard
                </Text>
              </View>
              <View style={styles.FooterIcons}>
                <Icon
                  name="percent"
                  size={40}
                  color={
                    this.state.panelIndex == 3
                      ? Colors.icon.enabled
                      : Colors.icon.disabled
                  }
                  onPress={() => {
                    this.setState({ panelIndex: 3 });
                  }}
                />
                <Text
                  style={[
                    styles.FooterText,
                    {
                      color:
                        this.state.panelIndex == 3
                          ? Colors.icon.enabled
                          : Colors.icon.disabled,
                    },
                  ]}
                  onPress={() => {
                    this.setState({ panelIndex: 3 });
                  }}>
                  Descontos
                </Text>
              </View>
              <View style={styles.FooterIcons}>
                <Icon
                  name="bar-chart"
                  size={40}
                  color={
                    this.state.panelIndex == 2
                      ? Colors.icon.enabled
                      : Colors.icon.disabled
                  }
                  onPress={() => {
                    this.setState({ panelIndex: 2 });
                  }}
                />
                <Text
                  onPress={() => {
                    this.setState({ panelIndex: 2 });
                  }}
                  style={[
                    styles.FooterText,
                    {
                      color:
                        this.state.panelIndex == 2
                          ? Colors.icon.enabled
                          : Colors.icon.disabled,
                    },
                  ]}>
                  Curva ABC
                </Text>
              </View>
              {this.state.selectednode.level == 0 && (
                <View style={styles.FooterIcons}>
                  <Icon
                    name="list-alt"
                    size={40}
                    color={
                      this.state.panelIndex == 1
                        ? Colors.icon.enabled
                        : Colors.icon.disabled
                    }
                    onPress={() => {
                      this.setState({ panelIndex: 1 });
                    }}
                  />
                  <Text
                    onPress={() => {
                      this.setState({ panelIndex: 1 });
                    }}
                    style={[
                      styles.FooterText,
                      {
                        color:
                          this.state.panelIndex == 1
                            ? Colors.icon.enabled
                            : Colors.icon.disabled,
                      },
                    ]}>
                    Pendências
                  </Text>
                </View>
              )}

              {/* {this.state.selectednode.level == 0 && (
                <View style={styles.FooterIcons}>
                  <Icon
                    name="toggle-right"
                    size={40}
                    color={
                      this.state.panelIndex == 4
                        ? Colors.icon.enabled
                        : Colors.icon.disabled
                    }
                    onPress={() => {
                      this.setState({ panelIndex: 4 });
                    }}
                  />
                  <Text
                    onPress={() => {
                      this.setState({ panelIndex: 4 });
                    }}
                    style={[
                      styles.FooterText,
                      {
                        color:
                          this.state.panelIndex == 4
                            ? Colors.icon.enabled
                            : Colors.icon.disabled,
                      },
                    ]}>
                    Innovation
                  </Text>
                </View>
              )} */}
            </View>
            <View>
              <View>{/* <Text>{this.state.username}</Text> */}</View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
