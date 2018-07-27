import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';

import Device from './Device';
import HeaderDevices from './HeaderDevices';
import DialogControl from './DialogControl';

class HomeDevices extends Component {

  callConnectPeripheral(mac,name) {
    this.props.onConnect(mac,name)
  }
  callLoginControl(data) {
    this.props.onLoginControl(data)
  }
  render() {
    return(
      <View style = {styles.container}>
        <HeaderDevices />
        <FlatList
          data = { this.props.myBLEs}
          renderItem = {({item}) => <Device myBLE = {item} onStartConnect = { this.callConnectPeripheral.bind(this)} />}
          keyExtractor = { (item) => item.id.toString()}
        />
        <DialogControl onStartLoginControl = { this.callLoginControl.bind(this)}/>
      </View>
    );
  }
}

function mapStatetoProps(state) {
  return {
    myBLEs: state.arrBLEs
  }
}

export default connect(mapStatetoProps)(HomeDevices)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4db8ff',
  },
});
