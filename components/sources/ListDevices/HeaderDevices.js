import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import img_home from '../images/home_icon.png';

const window = Dimensions.get('window');


class HeaderDevices extends Component {
  addingBLE() {
    this.props.dispatch({
      type: 'ADD_BLE_TO_ARR',
      name: 'BLE_PROTECTED',
      mac: '0123456789',
    })
  }
  render() {
      return(
        <View style = { styles.container}>
            <TouchableOpacity
              onPress = { () => this.props.dispatch({ type: 'HOME_TAB'})}
            >
              <Image
                  style={ styles.imgStyle }
                  source = {img_home}
              />
            </TouchableOpacity>
            <Text style = { styles.txtContentStyle }> LIST OF DEVICES </Text>
            <TouchableOpacity
              onPress = { () => this.addingBLE()}
            >
              <Text > ADD </Text>
            </TouchableOpacity>
        </View>
      );
    }
}



export default connect()(HeaderDevices);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#33adff',
    height: window.height * 0.075,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  txtContentStyle: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center',
    flex: 1
  },
  imgStyle: {
    width: 30,
    height: 30,
    marginLeft: 10,
    alignItems: 'center',
  },
});
