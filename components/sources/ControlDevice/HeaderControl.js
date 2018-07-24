import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';

import img_ble_dis from 'I:/REACT/BLE5_PROTEC/eProtect/components/images/ble_disconnect_icon.png';
import img_setting from 'I:/REACT/BLE5_PROTEC/eProtect/components/images/setting_icon.png';


class HeaderControl extends Component {
    render() {
      return(
        <View style = { styles.container}>
            <TouchableOpacity
              onPress = { () => this.props.dispatch({ type: 'HOME_TAB'})}
            >
              <Image
                  style={ styles.imgStyleDis }
                  source = {img_ble_dis}
              />
            </TouchableOpacity>
            <Text style = { styles.txtContentStyle }> {this.props.mynameConnected} </Text>
            <TouchableOpacity
              onPress = { () => this.props.dispatch({ type: 'SETTING_TAB'})}
            >
              <Image
                  style={ styles.imgStyleSet}
                  source = {img_setting}
              />
            </TouchableOpacity>
        </View>
      );
    }
}

function mapStatetoProps(state) {
  return {
    mynameConnected: state.nameConnected
  }
}
export default connect(mapStatetoProps)(HeaderControl);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4AB6FF',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  txtContentStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    flex: 1
  },
  imgStyleDis: {
    width: 30,
    height: 30,
    alignItems: 'center',
    marginLeft: 10
  },
  imgStyleSet: {
    width: 30,
    height: 30,
    alignItems: 'center',
    marginRight: 10
  },
});
