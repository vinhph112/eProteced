/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

import Pulse from 'react-native-pulse';
import * as Animatable from 'react-native-animatable';
//import image
import img_ble from './components/images/ble_icon.png'


export default class App extends Component {
  constructor() {
    super()
    this.state = {
      isPressedScan: false
    }
  }
  startScan() {
    this.setState({isPressed: ! this.state.isPressed})
  }
  showPulse() {
    if (this.state.isPressed) {
      return (
        <Pulse
          color='#4AB6FF'
          numPulses={5}
          diameter={400}
          speed={20}
          duration={2000}
        />
      );
    }
    else {
      return null;
    }
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <View>
            {this.showPulse()}
            <TouchableOpacity
              style = {styles.btnBleStyle}
              onPress = {this.startScan.bind(this)}>
              <Image
                  style={{width: 50, height: 50}}
                  source = {img_ble}
              />
            </TouchableOpacity>
          </View>
          <Animatable.Text
            animation="pulse"
            iterationCount= "infinite"
            direction="alternate"
            style={ styles.txtTapStyle}
          >
          {this.state.isPressed ? '' : 'TAP ICON TO SCAN' }
          </Animatable.Text>
      </View>
      <Animatable.Text
        animation="pulse"
        iterationCount= "infinite"
        direction="alternate-reverse"
        style={styles.txtScaningStyle}
      >
      {this.state.isPressed ? 'Scanning for devices' : 'Scan done' }
      </Animatable.Text>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  btnBleStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4AB6FF',
    width: 80,
    height: 80,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  txtTapStyle: {
    textAlign: 'center',
    margin: 10
  },
  txtScaningStyle: {
    alignItems: 'flex-end',
    textAlign: 'center',
    marginBottom: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
