import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';

import img_locked from 'I:/REACT/BLE5_PROTEC/eProtect/components/images/locked_icon.png';
import img_unlocked from 'I:/REACT/BLE5_PROTEC/eProtect/components/images/unlocked_icon.png';

class LockDevice extends Component {
    render() {
      return(
        <View style = { styles.container}>
            <Text style = { styles.txtContentStyle }> Lock device </Text>
            <View style = { styles.container_chil}>
              <TouchableOpacity
                style = { styles.btnFind}
              >
                <Image
                    style={ styles.imgStyleLock }
                    source = {img_locked}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style = { styles.btnFind}
              >
                <Image
                    style={ styles.imgStyleUnlock }
                    source = {img_unlocked}
                />
              </TouchableOpacity>
            </View>
        </View>
      );
    }
}

function mapStatetoProps(state) {
  return {
    mynameConnected: state.nameConnected,
    mymacConnected: state.macConnected
  }
}
export default connect(mapStatetoProps)(LockDevice);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  container_chil: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    margin: 20
  },
  btnFind: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  imgStyleLock: {
    width: 80,
    height: 80,
    margin: 20

  },
  imgStyleUnlock: {
    width: 80,
    height: 80,
    margin: 20
  },
  txtContentStyle: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 20
  },
});
