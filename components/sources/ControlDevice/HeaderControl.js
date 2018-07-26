import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';

import img_ble_dis from '../images/ble_disconnect_icon.png';
import img_setting from '../images/setting_icon.png';

const window = Dimensions.get('window');

class HeaderControl extends Component {
    fncDisconnect() {
      console.log('->onStartDisconnect',this.props.mymac);
      // this.props.onStartDisconnect( this.props.mymacConnected)
      // this.props.dispatch({ type: 'HOME_TAB'})
    }
    render() {
      return(
        <View style = { styles.container}>
            <TouchableOpacity
              onPress = { () => {
                console.log('->onStartDisconnect',this.props.mymac,this.props.myname);
                this.props.onStartDisconnect()
              }}
            >
              <Image
                  style={ styles.imgStyleDis }
                  source = {img_ble_dis}
              />
            </TouchableOpacity>
            <Text style = { styles.txtContentStyle }> {this.props.mymac} </Text>
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
    mymac: state.mac,
    myname: state.name
  }
}
export default connect(mapStatetoProps)(HeaderControl);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4AB6FF',
    height: window.height * 0.075,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  txtContentStyle: {
    color: 'white',
    fontSize: 20,
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
