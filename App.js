
import React, { Component } from 'react';
import {
  Platform,
} from 'react-native';
import Main from './components/sources/Main';

import { createStore } from 'redux';
import { Provider } from 'react-redux';


export default class App extends Component {

  render() {
    return (
      <Provider store = { store }>
          <Main />
      </Provider>
    );
  }
}

//defaultState
const defaultState = {
    arrBLEs: [
    ],
  isConnected: false,
  tabCurrent: 'home',
  isTaptoScan: false,
  name: '',
  mac: '',
  isShowDialogControl: false,
};
const reducer = ( state = defaultState, action) => {
  switch (action.type) {
    case 'HOME_TAB':
      return {...state, tabCurrent: 'home', isTaptoScan: false};
    case 'DEVICE_TAB':
      return {...state, tabCurrent: 'devices'};
    case 'CONTROL_TAB':
      return {...state, tabCurrent: 'control'};
    case 'SETTING_TAB':
      return {...state, tabCurrent: 'setting'};
    case 'PRESS_SCAN_TRUE':
      return {...state, isTaptoScan: true, arrBLEs: []};
    case 'PRESS_SCAN_FALSE':
      return {...state, isTaptoScan: false};
    case 'CONNECTED_BLE':
      return {
        ...state,
        isConnected: true,
        name: action.name,
        mac: action.mac
      }
    case 'DISCONNECTED_BLE':
      return {
        ...state,
        isConnected: false,
        name: '',
        mac: ''
      };
    case 'SHOW_DIALOG_CONTROL':
      return {...state, isShowDialogControl: true};
    case 'CLOSE_DIALOG_CONTROL':
      return {...state, isShowDialogControl: false};
    case 'ADD_BLE_TO_ARR':
      return {
        ...state,
        arrBLEs: state.arrBLEs.concat({
          id: state.arrBLEs.length + 1,
          mac: action.mac,
          name: action.name,
        })
      };
    default:
      break;
  }
  return state;
};
//
const store = createStore(reducer);
