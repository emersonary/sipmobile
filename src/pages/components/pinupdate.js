import React, {Component} from 'react';
import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {Encrypt, Decrypt} from '../../services/encdec';

import login from '../../assets/login.png';
import cancel from '../../assets/cancel.png';
import axios from 'axios';

export default class PinUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code1: '',
      code2: '',
      iddevice: this.props.iddevice,
      errormsg: '',
    };
    console.log(['props', this.props]);
    console.log(['create', this.state]);
  }

  handleTextChangecode1 = event => {
    this.state.code1 = event;
    this.setState(this.state);

    if (this.state.code1.length == 4) {
      this.secondpincode.focus();
    }
  };

  updatePINCODE = async code => {
    console.log({
      id: this.state.iddevice,
      pincode: code,
    });

    await axios
      .post(
        'http://ws-1.polishop.com/msgbroker/wk/appcomvc/pincodeupdate',
        {
          id: this.state.iddevice,
          pincode: code,
        },
        {timeout: 2000},
      )
      .then(response => {
        if (!response.data.sucess) {
          this.state.errormsg = 'Erro atualização de PINCODE !';
        } else {
          this.state.errormsg = '';
          this.setState(this.state);
        }
      })
      .catch(err => {
        this.state.errormsg = 'Erro de Conexão. Tente Novamente !';
        this.setState(this.state);
      });
  };

  handleTextChangecode2 = event => {
    this.state.code2 = event;
    this.setState(this.state);

    const {code1, code2} = this.state;

    if (code1.length == code2.length) {
      if (code1 != code2) {
        Alert.alert('PIN Codes não conferem', '', [{text: 'OK'}], {
          cancelable: false,
        });

        this.state.code1 = '';
        this.state.code2 = '';
        this.setState(this.state);
        this.firstpincode.focus();
      } else {
        this.updatePINCODE(Encrypt(code1));
      }
    }
  };

  render() {
    const {code1, code2} = this.state;

    return (
      <View style={styles.loginwrap}>
        <View style={styles.pinwraptop}>
          <Text style={styles.msgTitle}>Cadastrando seu PIN Code</Text>
        </View>
        <View style={styles.pinwrap}>
          <Text style={styles.msgFirst}>
            Este é seu primeiro acesso. Você precisa cadastrar um PIN de 4
            dígitos para este dispositivo. Ele será necessário na confirmação de
            transações diversas:
          </Text>
          <Text style={styles.msgText}>Digite seu PIN</Text>
          <SmoothPinCodeInput
            password
            mask="*"
            autoFocus
            cellSize={36}
            codeLength={4}
            value={code1}
            onTextChange={this.handleTextChangecode1}
            ref={input => {
              this.firstpincode = input;
            }}
          />
          <Text style={styles.msgText}>Confirme seu PIN</Text>
          <SmoothPinCodeInput
            password
            mask="*"
            cellSize={36}
            codeLength={4}
            value={code2}
            onTextChange={this.handleTextChangecode2}
            ref={input => {
              this.secondpincode = input;
            }}
          />
        </View>
        {!!this.state.code1 && this.state.code1 == this.state.code2 && (
          <TouchableOpacity
            style={styles.buttonConfirma}
            onPress={this.props.onPress}>
            <Image source={login} style={styles.imageStyle} />
            <Text style={styles.buttonText}> Confirmar</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.buttonCancela}
          onPress={this.props.onPress}>
          <Image source={cancel} style={styles.imageStyle} />
          <Text style={styles.buttonText}> Cancelar</Text>
        </TouchableOpacity>

        {this.state.errormsg.length > 0 && (
          <Text style={styles.errorText}>Confirme seu PIN</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonConfirma: {
    flexDirection: 'row',
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#496DDB',
    borderRadius: 4,
    margin: 10,
    marginTop: 20,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  pinwraptop: {
    height: 40,
    alignSelf: 'stretch',
    marginBottom: 0,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#496DDB',
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    paddingTop: 6,
    marginBottom: 0,
  },
  pinwrap: {
    height: 'auto',
    alignSelf: 'stretch',
    margin: 10,
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDD',
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    padding: 10,
    marginBottom: 0,
  },
  buttonCancela: {
    flexDirection: 'row',
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#F00',
    borderRadius: 4,
    margin: 10,

    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    marginTop: 10,
    color: '#F00',
    fontWeight: 'bold',
    fontSize: 16,
  },
  msgText: {
    marginTop: 10,
    color: '#496DDB',
    alignSelf: 'center',
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderTopStartRadius: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  msgFirst: {
    marginTop: 0,
    color: '#496DDB',
    alignSelf: 'center',
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderTopStartRadius: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  msgTitle: {
    color: '#FFF',
    height: 40,
    alignSelf: 'stretch',
    textAlign: 'center',

    margin: 0,

    alignContent: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  loginwrap: {
    width: 'auto',
    height: 'auto',
    backgroundColor: '#717EC380',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 8,
    marginBottom: 40,
  },
});
