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

class DialogControl extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      checked: false,
      passControl: ''
    };
  }
  submitBtnHandle() {
    if ( this.state.passControl === '0000')
    {
      this.props.dispatch({ type: 'CLOSE_DIALOG_CONTROL'});
      this.setState({passControl: ''})
    }
  }
  render() {
    return(
      <View style = {styles.container} >
        <Modal
            isVisible={ this.props.myisShowDialogControl}
            backdropColor={"black"}
            backdropOpacity={0.75}
        >
          <View style ={ styles.modalContent }>
            <Text style = { styles.titleStyle }>Login control</Text>
            <TextInput
              style = { styles.txtInputStyle}
              placeholder = 'password'
              underlineColorAndroid = "transparent"
              secureTextEntry = {true}
              onChangeText={(text) => this.setState({passControl: text})}
              value={this.state.passControl}
            />
            <View style={{ flexDirection: 'column'}}>
              <View style={{ flexDirection: 'row' }}>
                <CheckBox
                  value={this.state.checked}
                  onValueChange={() => this.setState({ checked: !this.state.checked })}
                />
                <Text style={{marginTop: 5}}> Remember login control</Text>
              </View>
            </View>
            <View style = { styles.rowBtnStyle}>
              <TouchableOpacity
                style = { styles.btnStyle}
                onPress = { () => this.props.dispatch({ type: 'CLOSE_DIALOG_CONTROL'})}
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
    myisShowDialogControl: state.isShowDialogControl
  }
}


export default connect(mapStatetoProps)(DialogControl);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContent: {
    backgroundColor: "white",
    height: 250,
    padding: 22,
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
