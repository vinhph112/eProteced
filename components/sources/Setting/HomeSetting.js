import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';

import HeaderSetting from './HeaderSetting';
import SetPassControl from './SetPassControl';
import SetPassSetting from './SetPassSetting';
import SetNameDevice from './SetNameDevice';
import SetTimeout from './SetTimeout';

class HomeSetting extends Component {

  callSetPassControl(data) {
    this.props.onSetPassControl(data);
    console.log('-->callSetPassControl',data);
  }
  callSetPassSetting(data) {
    console.log('-->callSetPassSetting',data);
    this.props.onSetPassSetting(data)
  }
  onCallSetNameDevice(data) {
    console.log('-->onCallSetNameDevice',data);
    this.props.onSetNameDevice(data)
  }
  callSetTimeOut(data) {
    console.log('-->callSetTimeOut',data);
    this.props.onSetTimeOut(data)
  }

  render() {
    return(
      <View style = {styles.container} >
        <HeaderSetting />
        <SetPassControl onWritePassControl = { this.callSetPassControl.bind(this)}/>
        <SetPassSetting onWritePassSetting = { this.callSetPassSetting.bind(this)}/>
        <SetNameDevice onWriteNameDevice = { this.onCallSetNameDevice.bind(this)}/>
        <SetTimeout onWriteTimeOut = { this.callSetTimeOut.bind(this)}/>
      </View>
    );
  }
}
export default connect()(HomeSetting);


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    marginBottom: 20
  }
});
