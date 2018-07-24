import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

import { connect } from 'react-redux';
import img_ble from 'I:/REACT/BLE5_PROTEC/eProtect/components/images/bluetooth.png';

import DialogInput from 'react-native-dialog-input';



class Device extends Component {

  constructor(props){
  super(props);
    this.state = {
      isDialogVisible: false,
    }
  }
  showDialog(isShow){
    this.setState({isDialogVisible: isShow});
  }
  render() {
    const { name, mac } = this.props.myBLE;
    return(
      <View>
          <TouchableOpacity
            style = {styles.btnStyle}
            onPress={()=>{this.showDialog(true)}}
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
          <DialogInput isDialogVisible={this.state.isDialogVisible}
              title={"Login control"}
              message={"Access device with password"}
              textInputProps = {{secureTextEntry: true}}
              hintInput ={"password"}
              submitInput={ (inputText) => {this.showDialog(false)}}
              closeDialog={ () => {this.showDialog(false)}}>
          </DialogInput>
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
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black'
  }
});
