import React, { Component } from 'react';


import HomeScan from './ScanScreen/HomeScan';
import HomeDevices from './ListDevices/HomeDevices';
import HomeControl from './ControlDevice/HomeControl';
import HomeSetting from './Setting/HomeSetting';

import Second from './BLEFunction/scanBLE';

import TabNavigator from 'react-native-tab-navigator';

import { connect } from 'react-redux';

class Main extends Component {

  setTabCurrent(tabCurrent) {
    this.props.dispatch({ type: tabCurrent});
  }
  scanPeripheral() {
    console.log("scanPeripheral-------------------");
  }
  connectPeripheral(mac_id) {
    console.log('connectPeripheral-------------------',mac_id);
  }
  render() {
    return(
      <TabNavigator
        tabBarStyle={{ height: 40, overflow: 'hidden' }}
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
          <HomeControl />
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
    mytabCurrent: state.tabCurrent
  }
}
export default connect(mapStatetoProps)(Main)
