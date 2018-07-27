import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import HeaderControl from './HeaderControl';
import FindDevice from './FindDevice';
import LockDevice from './LockDevice';
import DialogSetting from './DialogSetting';

class HomeControl extends Component {

  callDisconnectPeripheral() {
    this.props.onDisconnect();
    console.log('-->onDisconnect');
  }
  callWriteFind(data) {
    console.log('-->onCallWritePeripheral',data);
    this.props.onWriteDataFind(data)
  }
  callWriteLock(data) {
    console.log('-->onCallLockPeripheral',data);
    this.props.onWriteDataLock(data)
  }
  callWriteUnLock(data) {
    console.log('-->onCallUnlockPeripheral',data);
    this.props.onWriteDataUnLock(data)
  }
  callWriteLoginSetting(data) {
    this.props.onWriteLoginSetting(data)
  }
  render() {
    return(
      <View style = {styles.container} >
        <HeaderControl onStartDisconnect = { this.callDisconnectPeripheral.bind(this)}/>
        <FindDevice onWriteFind = { this.callWriteFind.bind(this)}/>
        <LockDevice
            onWriteLock = { this.callWriteLock.bind(this)}
            onWriteUnLock = { this.callWriteUnLock.bind(this)}
        />
        <DialogSetting onLoginSetting = { this.callWriteLoginSetting.bind(this)}/>
      </View>
    );
  }
}
export default connect()(HomeControl);


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  container: {
    flex: 1,
  }
});
