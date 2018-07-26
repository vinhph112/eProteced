import React, { Component } from 'react';

import {
  NativeEventEmitter,
  NativeModules,
  Alert
} from 'react-native';

import HomeScan from './ScanScreen/HomeScan';
import HomeDevices from './ListDevices/HomeDevices';
import HomeControl from './ControlDevice/HomeControl';
import HomeSetting from './Setting/HomeSetting';

import Second from './BLEFunction/scanBLE';

import TabNavigator from 'react-native-tab-navigator';

import { connect } from 'react-redux';
//import module ble manager
import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
//---------------
class Main extends Component {

  constructor() {
    super()
    this.state = {
      message: '',
      peripherals: new Map(),

    }
    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
    this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);

  }
  componentDidMount() {
    BleManager.start({showAlert: false});
    this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );
    this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan );
    this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral );
    this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic );
  }
  componentWillUnmount() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
  }
  setTabCurrent(tabCurrent) {
    this.props.dispatch({ type: tabCurrent});
  }
  //-------------------------
  handleStopScan() {
    console.log('Scan is stopped');
    this.props.dispatch({ type: 'DEVICE_TAB'})
  }
  //----------------
  handleDiscoverPeripheral(peripheral) {
    console.log('[handleDiscoverPeripheral]--Got ble peripheral', peripheral, peripheral.id);
    var peripherals = this.state.peripherals;
    if (!peripherals.has(peripheral.id)){
      console.log('Adding ble peripheral', peripheral);
      this.props.dispatch({
        type: 'ADD_BLE_TO_ARR',
        name: peripheral.name,
        mac: peripheral.id,
      })
      peripherals.set(peripheral.id, peripheral);
      this.setState({ peripherals })
    }
  }
  //----------
  handleDisconnectedPeripheral(data) {
    console.log('Disconnected from ' + data.peripheral);
    this.props.dispatch({ type: 'HOME_TAB'})
    this.setState({ peripherals: new Map() })
  }
  //----------
  handleUpdateValueForCharacteristic(data) {
    console.log('Received data from ' + data.peripheral + ' - characteristic ' + data.characteristic + ' - value: '+ data.value);

    if (data.value[3] === 254 ) {
      if (data.value[4] === 2) {
            this.setState({message: 'Finde deveice successfully'})
      }
      if (data.value[4] === 3) {
          if (data.value[5] === 1) {
            this.setState({message: 'Lock deveice successfully'})
          }
          if (data.value[5] === 2) {
            this.setState({message: 'Unlock deveice successfully'})
          }
      }
    }
    Alert.alert(
      'Notification',
      this.state.message,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }
  //----------
  scanPeripheral() {
    console.log("scanPeripheral-------------------");
    BleManager.scan([], 3, true).then((results) => {
      console.log('Scanning...');
    });
  }
  //
  writeFindPheripheral(data) {
    console.log('Write data 1-----------',data);
    const data_send = this.hexStringToByte(data);
    console.log('Write data 2-----------',this.props.mymac,data_send);
    BleManager.writeWithoutResponse(this.props.mymac, 'fff0', 'fff5',data_send)
    .then(() => {
      console.log('--writeFindPheripheral successfully: ',data_send);
    })
    .catch((error) => {
      console.log('--writeFindPheripheral failed ',error);
    });
  }
  writeLockPheripheral(data) {
    console.log('Write lock data 1-----------',data);
    const data_send = this.hexStringToByte(data);
    console.log('Write lock data 2-----------',this.props.mymac,data_send);
    BleManager.writeWithoutResponse(this.props.mymac, 'fff0', 'fff5',data_send)
    .then(() => {
      console.log('--writeLockPheripheral successfully: ',data_send);
    })
    .catch((error) => {
      console.log('--writeLockPheripheral failed ',error);
    });
  }
  writeUnLockPheripheral(data) {
    console.log('Write unlock data 1-----------',data);
    const data_send = this.hexStringToByte(data);
    console.log('Write unlock data 2-----------',this.props.mymac,data_send);
    BleManager.writeWithoutResponse(this.props.mymac, 'fff0', 'fff5',data_send)
    .then(() => {
      console.log('--writeUnLockPheripheral successfully: ',data_send);
    })
    .catch((error) => {
      console.log('--writeUnLockPheripheral failed ',error);
    });
  }
  connectPeripheral(mac,name) {
    console.log('connectPeripheral-------------------',mac,name);
    BleManager.connect(mac)
    .then(() => {
      console.log('Connected to ' + mac,name);
      setTimeout(() => {
          BleManager.retrieveServices(mac).then((peripheralInfo) => {
            console.log('Peripheral info:',peripheralInfo);
            console.log('Peripheral characteristics:',peripheralInfo.id, peripheralInfo.name);
            var service = 'fff0';
            setTimeout(() => {
                BleManager.startNotification(mac, service, 'fff4')
                .then(() => {
                  console.log('Started notification on 4 ' +mac,peripheralInfo.id);
                  this.props.dispatch({
                    type: 'CONNECTED_BLE',
                    mac: peripheralInfo.id,
                    name: peripheralInfo.name,
                  })
                  this.props.dispatch({type: 'CONTROL_TAB'})
                }).catch((error) => {
                  console.log('Notification error 4', error);
                });
            },200);
        });
      }, 900);
    })
    .catch((error) => {
      console.log('Connection error', error);
    });
  }
  disconnectPeripheral() {
    console.log('disconnectPeripheral-------------------',this.props.mymac);
    BleManager.disconnect(this.props.mymac);
  }
  //----------------------
  hexStringToByte(str) {
    if (!str) {
      return new Uint8Array();
    }
    var a = [];
    for (var i = 0, len = str.length; i < len; i+=2) {
      a.push(parseInt(str.substr(i,2),16));
    }
    return a;
  }
  //--------------
  render() {
    return(
      <TabNavigator
        tabBarStyle={{ height: 0, overflow: 'hidden' }}
        sceneStyle={{ paddingBottom: 0 }}
      >
        <TabNavigator.Item
          selected={ this.props.mytabCurrent  === 'home'}
          title="Home"
          onPress={() => this.setTabCurrent('HOME_TAB')}>
          <HomeScan onScan = { this.scanPeripheral.bind(this)}/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={ this.props.mytabCurrent === 'devices'}
          title="Devices"
          onPress={() => this.setTabCurrent('DEVICE_TAB')}>
          <HomeDevices onConnect = { this.connectPeripheral.bind(this)}/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={ this.props.mytabCurrent === 'control'}
          title="Control"
          onPress={() => this.setTabCurrent('CONTROL_TAB')}>
          <HomeControl
            onDisconnect = { this.disconnectPeripheral.bind(this)}
            onWriteDataFind = { this.writeFindPheripheral.bind(this)}
            onWriteDataLock = { this.writeLockPheripheral.bind(this)}
            onWriteDataUnLock = { this.writeUnLockPheripheral.bind(this)}

          />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={ this.props.mytabCurrent === 'setting'}
          title="Setting"
          onPress={() => this.setTabCurrent('SETTING_TAB')}>
          <HomeSetting />
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

function mapStatetoProps(state) {
  return {
    mytabCurrent: state.tabCurrent,
    mymac: state.mac,
    myname: state.name
  }
}
export default connect(mapStatetoProps)(Main)
