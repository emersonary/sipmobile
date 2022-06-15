import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  backGround: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundColor: '#000C',
  },
  Table: {
    flexDirection: 'row',
    flex: 1,
  },
  Switch: {height: 50, marginRight: 5},
  SwitchText: {color: '#DDD', fontSize: 16, fontWeight: 'bold'},
  SwitchView: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    marginLeft: 15,
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
    marginTop: 200,
    marginBottom: 200,
    marginLeft: 34,
    marginRight: 34,
    backgroundColor: 'rgba(22, 32, 43, 1)',
    borderRadius: 10,
  },
});

export default styles;
