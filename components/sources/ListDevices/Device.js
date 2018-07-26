import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

import { connect } from 'react-redux';
import img_ble from '../images/bluetooth.png';

class Device extends Component {



  render() {
    const { name, mac } = this.props.myBLE;
    return(
      <View>
          <TouchableOpacity
            style = {styles.btnStyle}
            onPress={()=> {
              this.props.onStartConnect(mac,name)
              console.log('->'+mac);
            }}
          >
            <Image
                style={ styles.imgStyle }
                source = {img_ble}
            />
            <View style = { styles.container}>
              <Text style = { styles.txtNameStyle}> {name} </Text>
              <Text> {'MAC: '+mac} </Text>
            </View>
          </TouchableOpacity>
      </View>
    );
  }
}

export default connect()(Device);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 5,
    margin: 5,
  },
  imgStyle: {
    width: 40,
    height: 40,
    margin: 10
  },
  btnStyle: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    margin: 5,
    flexDirection:'row',
  },
  txtNameStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  }
});
