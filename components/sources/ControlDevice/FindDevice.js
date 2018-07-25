import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';

import img_find from '../images/find_icon.png';

class FindDevice extends Component {
    render() {
      return(
        <View style = { styles.container}>
            <Text style = { styles.txtContentStyle }> Find device </Text>
            <TouchableOpacity
              style = { styles.btnFind}
            >
              <Image
                  style={ styles.imgStyleFind }
                  source = {img_find}
              />
            </TouchableOpacity>
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
export default connect(mapStatetoProps)(FindDevice);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  txtContentStyle: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20
  },
  btnFind: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  imgStyleFind: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,

  },
});
