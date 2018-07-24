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

class HomeDevices extends Component {
  render() {
    return(
      <View style = {styles.container}>
        <HeaderDevices />
        <FlatList
          data = { this.props.myBLEs}
          renderItem = {({item}) => <Device myBLE = {item} />}
          keyExtractor = { item => item.id}
        />
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
    backgroundColor: '#F5FCFF',
  },
});
