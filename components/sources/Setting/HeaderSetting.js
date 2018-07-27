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

import img_back from '../images/back_icon.png';
import img_refresh from '..//images/refresh_icon.png';

const window = Dimensions.get('window');

class HeaderSetting extends Component {
    render() {
      return(
        <View style = { styles.container}>
            <TouchableOpacity
              onPress = { () => this.props.dispatch({ type: 'CONTROL_TAB'})}
            >
              <Image
                  style={ styles.imgStyleDis }
                  source = {img_back}
              />
            </TouchableOpacity>
            <Text style = { styles.txtContentStyle }> SETTING </Text>
            <TouchableOpacity>
              <Image
                  style={ styles.imgStyleSet}
                  source = {img_refresh}
              />
            </TouchableOpacity>
        </View>
      );
    }
}

function mapStatetoProps(state) {
  return {
    mynameConnected: state.nameConnected
  }
}
export default connect(mapStatetoProps)(HeaderSetting);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4AB6FF',
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
  imgStyleDis: {
    width: 30,
    height: 30,
    alignItems: 'center',
    marginLeft: 10
  },
  imgStyleSet: {
    width: 30,
    height: 30,
    alignItems: 'center',
    marginRight: 10
  },
});
