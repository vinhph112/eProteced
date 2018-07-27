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
  //-------------------------receive signal stop scan
  handleStopScan() {
    console.log('Scan is stopped');
    this.props.dispatch({ type: 'DEVICE_TAB'})
  }
  //----------------got ble from discovery
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
  //----------receive signal disconnect from ble
  handleDisconnectedPeripheral(data) {
    console.log('Disconnected from ' + data.peripheral);
    this.props.dispatch({ type: 'HOME_TAB'})
    this.props.dispatch({ type: 'DISCONNECTED_BLE'})

    this.setState({ peripherals: new Map() })
  }
  //----------receive data notification from ble
  handleUpdateValueForCharacteristic(data) {
    console.log('Received data from ' + data.peripheral + ' - characteristic ' + data.characteristic + ' - value: '+ data.value);

    if (data.value[1] === 16 && data.value[3] === 254 ) {
      if (data.value[4] === 1) {
          if (data.value[5] === 1) {
            this.setState({message: 'Login control successfully'})
            this.props.dispatch({ type: 'CLOSE_DIALOG_CONTROL'})
            this.props.dispatch({ type: 'CONTROL_TAB'})
          }
          if (data.value[5] === 2) {
            this.setState({message: 'Login control failed'})
            this.props.dispatch({ type: 'CLOSE_DIALOG_CONTROL'})
          }
      }
      if (data.value[4] === 2) {
            this.setState({message: 'Find deveice successfully'})
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
    if (data.value[1] === 32 && data.value[3] === 254 ) {
      if (data.value[4] === 1) {
          if (data.value[5] === 1) {
            this.setState({message: 'Login setting successfully'})
            this.props.dispatch({ type: 'CLOSE_DIALOG_SETTING'})
            this.props.dispatch({ type: 'SETTING_TAB'})

          }
          if (data.value[5] === 2) {
            this.setState({message: 'Login setting failed'})
            this.props.dispatch({ type: 'CLOSE_DIALOG_SETTING'})

          }
      }
      if (data.value[4] === 2) {
            this.setState({message: 'Set password control successfully'})
      }
      if (data.value[4] === 3) {
            this.setState({message: 'Set password setting successfully'})
      }
      if (data.value[4] === 4) {
            this.setState({message: 'Set timeout connect successfully'})
      }
      if (data.value[4] === 5) {
            this.setState({message: 'Set name device successfully'})
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
  //find device
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
  //lock device
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
  //unlock device
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
  //write password login control
  writeLoginControl(data) {
    var arrData = [17,16,0,1,1,];
    const data_send = this.toUTF8Array(data);
    console.log('writeLoginControl_1',data_send);
    for (var i = 0; i < data_send.length; i++) {
      arrData.push(data_send[i]);
    }
    arrData[2] = arrData.length + 1;
    arrData[arrData.length] = this.calCheckSum(arrData);

    console.log('writeLoginControl_2',arrData, this.byteToHexString(arrData));

    BleManager.writeWithoutResponse(this.props.mymac, 'fff0', 'fff5',arrData)
    .then(() => {
      console.log('--writeLoginControl successfully: ',arrData);
    })
    .catch((error) => {
      console.log('--writeLoginControl failed ',error);
    });
  }
  //set password login setting
  writeLoginSetting(data) {
    var arrData = [17,32,0,1,1,];
    const data_send = this.toUTF8Array(data);
    console.log('writeLoginSetting_1',data_send);
    for (var i =0; i < data_send.length; i++) {
      arrData.push(data_send[i]);
    }
    arrData[2] = arrData.length + 1;
    arrData[arrData.length] = this.calCheckSum(arrData);

    console.log('writeLoginSetting_2',arrData, this.byteToHexString(arrData));

    BleManager.writeWithoutResponse(this.props.mymac, 'fff0', 'fff5',arrData)
    .then(() => {
      console.log('--writeLoginSetting successfully: ',arrData);
    })
    .catch((error) => {
      console.log('--writeLoginSetting failed ',error);
    });
  }
  //set password control
  writeSetPassControl(data) {
    var arrData = [17,32,0,1,2,];
    const data_send = this.toUTF8Array(data);
    console.log('writeSetPassControl_3',data_send);
    for (var i =0; i < data_send.length; i++) {
      arrData.push(data_send[i]);
    }
    arrData[2] = arrData.length + 1;
    arrData[arrData.length] = this.calCheckSum(arrData);

    console.log('writeSetPassControl_4',arrData, this.byteToHexString(arrData));

    BleManager.writeWithoutResponse(this.props.mymac, 'fff0', 'fff5',arrData)
    .then(() => {
      console.log('--writeSetPassControl successfully: ',arrData);
    })
    .catch((error) => {
      console.log('--writeSetPassControl failed ',error);
    });
  }
  //set password setting
  writeSetPassSetting(data) {
    var arrData = [17,32,0,1,3,];
    const data_send = this.toUTF8Array(data);
    console.log('writeSetPassSetting_1',data_send);
    for (var i =0; i < data_send.length; i++) {
      arrData.push(data_send[i]);
    }
    arrData[2] = arrData.length + 1;
    arrData[arrData.length] = this.calCheckSum(arrData);

    console.log('writeSetPassSetting_2',arrData, this.byteToHexString(arrData));

    BleManager.writeWithoutResponse(this.props.mymac, 'fff0', 'fff5',arrData)
    .then(() => {
      console.log('--writeSetPassControl successfully: ',arrData);
    })
    .catch((error) => {
      console.log('--writeSetPassControl failed ',error);
    });
  }
  //set name device
  writeSetNameDevice(data) {
    var arrData = [17,32,0,1,5,];
    const data_send = this.toUTF8Array(data);
    console.log('writeSetNameDevice_1',data_send);
    for (var i =0; i < data_send.length; i++) {
      arrData.push(data_send[i]);
    }
    arrData[2] = arrData.length + 1;
    arrData[arrData.length] = this.calCheckSum(arrData);

    console.log('writeSetNameDevice_2',arrData, this.byteToHexString(arrData));

    BleManager.writeWithoutResponse(this.props.mymac, 'fff0', 'fff5',arrData)
    .then(() => {
      console.log('--writeSetNameDevice successfully: ',arrData);
    })
    .catch((error) => {
      console.log('--writeSetNameDevice failed ',error);
    });
  }
  //set time out login control
  writeSettimeOut(data) {
    var arrData = [17,32,7,1,4,0];

    arrData[5] = parseInt(data);
    arrData[arrData.length] = this.calCheckSum(arrData);

    console.log('writeSetPassSetting_2',arrData, this.byteToHexString(arrData));

    BleManager.writeWithoutResponse(this.props.mymac, 'fff0', 'fff5',arrData)
    .then(() => {
      console.log('--writeSettimeOut successfully: ',arrData);
    })
    .catch((error) => {
      console.log('--writeSettimeOut failed ',error);
    });
  }
  //connect to ble
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
                  this.props.dispatch({type: 'SHOW_DIALOG_CONTROL'})
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
  //disconnect ble
  disconnectPeripheral() {
    console.log('disconnectPeripheral-------------------',this.props.mymac);
    BleManager.disconnect(this.props.mymac);
  }
  //---------------------
  calCheckSum(arr) {
    var cal = 0;
    for ( var j = 1; j < arr.length; j++) {
      cal = cal + arr[j];
    }
    console.log('cal_check_sum',cal, cal.toString(16));
    var hex = cal.toString(16);
    if (hex.length > 2)
    {
        console.log('cal_check_sum_hex',hex.substring(hex.length - 2));
        hex = hex.substring(hex.length - 2)
    }
    return parseInt(hex,16);
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
  byteToHexString(uint8arr) {
    if (!uint8arr) {
      return '';
    }
    var hexStr = '';
    for (var i = 0; i < uint8arr.length; i++) {
      var hex = (uint8arr[i] & 0xff).toString(16);
      hex = (hex.length === 1) ? '0' + hex : hex;
      // if ( i === uint8arr.length - 1) hexStr += hex ;
      // else hexStr += hex + ' ';
      hexStr += hex;
    }

    return hexStr.toUpperCase();
  }
  //--------------
  toUTF8Array(str) {
      var utf8 = [];
      for (var i=0; i < str.length; i++) {
          var charcode = str.charCodeAt(i);
          if (charcode < 0x80) utf8.push(charcode);
          else if (charcode < 0x800) {
              utf8.push(0xc0 | (charcode >> 6),
                        0x80 | (charcode & 0x3f));
          }
          else if (charcode < 0xd800 || charcode >= 0xe000) {
              utf8.push(0xe0 | (charcode >> 12),
                        0x80 | ((charcode>>6) & 0x3f),
                        0x80 | (charcode & 0x3f));
          }
          // surrogate pair
          else {
              i++;
              // UTF-16 encodes 0x10000-0x10FFFF by
              // subtracting 0x10000 and splitting the
              // 20 bits of 0x0-0xFFFFF into two halves
              charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                        | (str.charCodeAt(i) & 0x3ff));
              utf8.push(0xf0 | (charcode >>18),
                        0x80 | ((charcode>>12) & 0x3f),
                        0x80 | ((charcode>>6) & 0x3f),
                        0x80 | (charcode & 0x3f));
          }
      }
      return utf8;
  }
  //----------------------------
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
          <HomeDevices
            onConnect = { this.connectPeripheral.bind(this)}
            onLoginControl = { this.writeLoginControl.bind(this)}
          />
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
            onWriteLoginSetting = { this.writeLoginSetting.bind(this)}
          />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={ this.props.mytabCurrent === 'setting'}
          title="Setting"
          onPress={() => this.setTabCurrent('SETTING_TAB')}>
          <HomeSetting
            onSetPassControl = { this.writeSetPassControl.bind(this)}
            onSetPassSetting = { this.writeSetPassSetting.bind(this)}
            onSetNameDevice = { this.writeSetNameDevice.bind(this)}
            onSetTimeOut = { this.writeSettimeOut.bind(this)}
          />
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
