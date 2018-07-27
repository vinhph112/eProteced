import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  CheckBox
} from 'react-native';
import { connect } from 'react-redux';
import Modal from "react-native-modal";

class DialogSetting extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      checked: false,
      passSetting: ''
    };
  }
  submitBtnHandle() {
    this.props.onLoginSetting(this.state.passSetting)
  }
  render() {
    return(
      <View style = {styles.container} >
        <Modal
            isVisible={ this.props.myisShowDialogSetting}
            backdropColor={"black"}
            backdropOpacity={0.75}
        >
          <View style ={ styles.modalContent }>
            <Text style = { styles.titleStyle }>Login setting</Text>
            <TextInput
              style = { styles.txtInputStyle}
              placeholder = 'password'
              underlineColorAndroid = "transparent"
              secureTextEntry = {true}
              onChangeText={(text) => this.setState({passSetting: text})}
              value={this.state.passSetting}
            />
            <View style = { styles.rowBtnStyle}>
              <TouchableOpacity
                style = { styles.btnStyle}
                onPress = { () => this.props.dispatch({ type: 'CLOSE_DIALOG_SETTING'})}
              >
                <Text style = { styles.txtStyle }> CLOSE</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style = { styles.btnStyle}
                onPress = { this.submitBtnHandle.bind(this)}
              >
                <Text style = { styles.txtStyle }> SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

function mapStatetoProps(state) {
  return {
    myisShowDialogSetting: state.isShowDialogSetting
  }
}

export default connect(mapStatetoProps)(DialogSetting);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContent: {
    backgroundColor: "white",
    height: 250,
    padding: 20,
    margin: 40,
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: 'space-between'
  },
  btnStyle: {
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtStyle: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    color: '#0099ff',
    fontWeight: 'bold'
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 18
  },
  txtInputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 2,
  },
  rowBtnStyle: {
    flexDirection: 'row',
    bottom: 0,
    right: 0,
    alignSelf: 'flex-end'
  }
});
