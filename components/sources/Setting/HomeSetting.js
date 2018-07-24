import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import HeaderSetting from './HeaderSetting';

class HomeSetting extends Component {
  render() {
    return(
      <View style = {styles.container} >
        <HeaderSetting />
      </View>
    );
  }
}
export default connect()(HomeSetting);


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
