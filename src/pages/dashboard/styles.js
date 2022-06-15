import {StyleSheet} from 'react-native';

const Colors = {
  bg: 'rgba(22, 32, 43, 1)',
  vs: 'rgba(13, 17, 25, 1)',
  icon: {enabled: '#55F', disabled: '#7779'},
};

const styles = StyleSheet.create({
  TituloStatusBar: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  MainWrap: {
    flex: 1,
  },
  SearchBarIcon: {margin: 5},
  SearchBarText: {marginLeft: 5, flex: 1, fontWeight: 'bold', color: '#888'},
  SearchBar: {
    flex: 10,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    height: '70%',
    margin: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 3,
  },
  DadosInexistentes: {
    alignItems: 'center',
    margin: 10,
  },
  DadosInexistentesText: {
    color: '#FFAA5A',
    fontWeight: 'normal',
    fontSize: 20,
    margin: 10,
  },
  Screen: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bg,
    flex: 1,
  },
  HeaderContent: {
    flex: 2,
  },
  Visor: {
    margin: 5,
    backgroundColor: Colors.vs,
    borderRadius: 3,
    flex: 1,
  },
  StatusBar: {
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bg,
    height: 40,
    width: '100%',
    flexDirection: 'row',
  },

  Header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '19%',
    width: '100%',
    flexDirection: 'row',
  },
  HeaderPlus: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '17%',
    width: '100%',
    flexDirection: 'row',
  },
  HeaderPlus2: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '30%',
    width: '100%',
    flexDirection: 'row',
  },
  Client: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    // height: '84%',
    width: '100%',
    flexDirection: 'column',
  },
  IconSession: {
    flexDirection: 'row',
  },
  ClientRow: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
  },
  ClientRowSmaller: {
    flex: 0.8,
    width: '100%',
    flexDirection: 'row',
  },
  ClientRowBigger: {
    flex: 1.2,
    width: '100%',
    flexDirection: 'row',
  },
  ClientPanel: {
    flex: 1,
    height: '100%',
  },
  ClientPanel2: {
    flex: 2,
    height: '100%',
  },

  PanelSwitch: {
    flex: 1,
    height: '100%',
    paddingTop: 3,
    paddingBottom: 12,
  },

  PanelTable: {
    flex: 3,
    height: '100%',
  },

  HeaderPanel: {
    flex: 1,
    height: '100%',
  },
  HeaderPanel2: {
    flex: 2,
    height: '100%',
    flexDirection: 'row',
  },
  Footer: {
    paddingTop: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: '15%',
    width: '100%',
    flexDirection: 'column',
  },
  FooterIcons: {
    marginLeft: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  FooterText: {
    color: '#FFF',
    fontWeight: 'normal',
    fontSize: 12,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bg,
    flex: 1,
    width: '100%',
  },
  infotext: {
    color: '#DDD',
  },
});

export default styles;

export {Colors};
