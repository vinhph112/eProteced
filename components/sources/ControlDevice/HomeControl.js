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

class HomeControl extends Component {
  render() {
    return(
      <View style = {styles.container} >
        <HeaderControl />
        <FindDevice />
        <LockDevice />
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
