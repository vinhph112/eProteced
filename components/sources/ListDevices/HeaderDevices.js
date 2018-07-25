import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import img_home from '../images/home_icon.png';

class HeaderDevices extends Component {
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
              onPress = { () => this.props.dispatch({ type: 'SHOW_DIALOG_CONTROL'})}
            >
              <Text > OPEN </Text>
            </TouchableOpacity>
        </View>
      );
    }
}



export default connect()(HeaderDevices);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4AB6FF',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  txtContentStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
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
