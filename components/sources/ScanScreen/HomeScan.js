import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

import PulseAnimate from './PulseAnimate';
import * as Animatable from 'react-native-animatable';


import img_ble from '../images/ble_icon.png';

import { connect } from 'react-redux';


class HomeScan extends Component {

  setTabCurrent(tabCurrent) {
    this.props.dispatch({ type: tabCurrent});
  }

  getPulseRun() {
    const { myisTaptoScan } = this.props;
    if (myisTaptoScan) {
      return <PulseAnimate />
    }
    return null;
  }

  render() {
      let txtTap = this.props.myisTaptoScan ? '' : 'TAP TO SCAN';
      return(
        <View style={{flex: 1}}>
          <View style={styles.container}>
            <View>
              { this.getPulseRun() }
              <TouchableOpacity
                style = {styles.btnBleStyle}
                onPress = { () =>   this.props.dispatch({ type: 'PRESS_SCAN_TRUE'})}
              >
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
            {txtTap}
            </Animatable.Text>
        </View>
        <TouchableOpacity
          style = {styles.btnBleStyle}
          onPress = { () =>   this.props.dispatch({ type: 'DEVICE_TAB'})}
        >
        </TouchableOpacity>
        <Animatable.Text
          animation="pulse"
          iterationCount= "infinite"
          direction="alternate-reverse"
          style={styles.txtScaningStyle}
        >
        Scanning for devices
        </Animatable.Text>
      </View>
      );
    }
}

function mapStatetoProps(state) {
  return {
    myisTaptoScan: state.isTaptoScan
  }
}

export default  connect(mapStatetoProps)(HomeScan);

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
});
