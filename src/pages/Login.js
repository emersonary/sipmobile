import React, { Component } from 'react';

import {
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  View,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';

import bgimage from '../assets/background.jpg';
import username from '../assets/username.png';
import password from '../assets/password.png';
import login from '../assets/login.png';
import LoginError from './components/loginerror';
import PinUpdate from './components/pinupdate';
import { Decrypt } from '../services/encdec';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from './components/loading';

import DeviceInfo from 'react-native-device-info';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounting: true,
      username: null,
      password: null,
      formErrors: {
        username: '',
        password: '',
      },
      response: {
        auth: false,
        iduser: -1,
        iddevice: -1,
        mobileenabled: false,
        deviceenabled: false,
        otheruser: false,
        msg: '',
        pincode: '',
      },
      connectionerror: false,
    };
  }

  UNSAFE_componentWillMount = async () => {
    const pck = JSON.parse(await AsyncStorage.getItem('userdata2'));

    if (pck) {
      const data = await api('mobilelogin', pck);
      this.handleLoginResult(data, pck);
    } else {
      this.setState({ mounting: false });
    }
  };

  formValid = () => {
    let valid = true;
    const { formErrors } = this.state;
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });

    return valid;
  };

  handleusernameChange = event => {
    const state = this.state;
    state.username = event;
    this.setState(state);
  };

  handlepasswordChange = event => {
    const state = this.state;
    state.password = event;
    this.setState(state);
  };

  handleValidate = () => {
    const state = this.state;

    state.formErrors.username =
      state.username == null || state.username.length < 3
        ? 'Usuário deve ter no mínimo 3 caracteres'
        : '';

    state.formErrors.password =
      state.password == null || state.password.length < 1
        ? 'Senha não pode estar em branco'
        : '';

    this.setState(state);
  };

  handleResset = () => {
    this.state.response.auth = false;
    this.state.password = null;
    this.state.username = null;
    this.setState(this.state);
  };

  handleLoginResult = async (data, pck) => {
    if (data) {
      this.state.response = data;
      this.state.connectionerror = false;
      this.state.mounting = false;

      if (!data.pincode || !data.auth || data.otheruser) {
        this.setState(this.state);
      } else {
        let lmostragrafico =
          (await AsyncStorage.getItem('mostragrafico')) == 'true';
        const userdata = {
          iduser: data.iduser,
          username: data.username,
          iddevice: data.iddevice,
          rootinfo: data.rootinfo,
          pincode: Decrypt(data.pincode),
          dashboard: data.dashboard,
          mostragrafico: lmostragrafico,
        };

        if (pck) {
          await AsyncStorage.setItem('userdata2', JSON.stringify(pck));
        }
        this.props.navigation.navigate('DashBoard', userdata);
      }
    } else {
      this.setState({ connectionerror: true });
    }
  };
  handleSubmit = async () => {
    this.handleValidate();

    if (this.formValid()) {
      const pck = {
        deviceid: DeviceInfo.getUniqueId(),
        descr: DeviceInfo.getDeviceId(),
        applicationname: DeviceInfo.getApplicationName(),
        brand: DeviceInfo.getBrand(),
        bundleid: DeviceInfo.getBundleId(),
        username: this.state.username,
        devicetype: DeviceInfo.getDeviceType(),
        password: this.state.password,
      };

      const data = await api('mobilelogin', pck);

      this.handleLoginResult(data, pck);
    }
  };

  render() {
    const { formErrors } = this.state;

    return (
      //   <SafeAreaView style={styles.container}>
      <ImageBackground
        source={bgimage}
        style={styles.container}
        resizeMode="cover"
        imageStyle="styles.istyle">
        {this.state.response.auth ? (
          this.state.response.mobileenabled ? (
            this.state.response.deviceenabled ? (
              this.state.response.otheruser ? (
                <LoginError
                  msg="Dispositivo pertence a outro usuário do SIP"
                  onPress={this.handleResset}
                />
              ) : (
                <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : null}
                  enabled
                  keyboardVerticalOffset="100">
                  <PinUpdate
                    onPress={this.handleResset}
                    iduser={this.state.response.iduser}
                    iddevice={this.state.response.iddevice}
                  />
                </KeyboardAvoidingView>
              )
            ) : (
              <LoginError
                msg="Dispositivo sem permissão de acesso"
                onPress={this.handleResset}
              />
            )
          ) : (
            <LoginError
              msg="Usuário sem permissão de uso de Celular"
              onPress={this.handleResset}
            />
          )
        ) : !this.state.mounting ? (
          <KeyboardAvoidingView
            style={styles.loginwrap}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            enabled
            keyboardVerticalOffset="100">
            <View style={styles.SectionStyle}>
              <Image source={username} style={styles.imageStyle} />
              <TextInput
                style={{ flex: 1 }}
                placeholder="Digite seu usuário aqui"
                autoCorrect={false}
                autoCapitalize="characters"
                underlineColorAndroid="transparent"
                onChangeText={this.handleusernameChange}
              />
            </View>
            {this.state.formErrors.username.length > 0 && (
              <Text style={styles.errorMsg}>
                {this.state.formErrors.username}
              </Text>
            )}
            <View style={styles.SectionStyle}>
              <Image source={password} style={styles.imageStyle} />
              <TextInput
                style={{ flex: 1 }}
                secureTextEntry
                autoCorrect={false}
                placeholder="Digite sua senha aqui"
                underlineColorAndroid="transparent"
                onChangeText={this.handlepasswordChange}
              />
            </View>
            {this.state.formErrors.password.length > 0 && (
              <Text style={styles.errorMsg}>
                {this.state.formErrors.password}
              </Text>
            )}
            {this.state.connectionerror && (
              <Text style={styles.errorMsg}>Erro de Conexão</Text>
            )}
            {this.state.response.msg.length > 0 && (
              <Text style={styles.errorMsg}>{this.state.response.msg}</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
              <Image source={login} style={styles.imageStyle} />
              <Text style={styles.buttonText}> Login</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        ) : (
          <View style={styles.loginwrap}>
            <Loading style={styles.loginwrap} />
          </View>
        )}
      </ImageBackground>
      //  </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 'auto',
    height: 'auto',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',

    //backgroundColor: '#000',
  },
  errorMsg: {
    color: '#FF0000',
    alignSelf: 'flex-start',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#496DDB',
    borderRadius: 4,
    margin: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  msgText: {
    marginTop: 10,
    color: '#F00',
    fontWeight: 'bold',
    fontSize: 16,
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
    minHeight: 100,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5,
    paddingLeft: 5,
    margin: 10,
    marginBottom: 5,
    opacity: 1,
  },

  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    margin: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    height: 40,
    backgroundColor: '#fff',
    color: '#424242',
  },
});
