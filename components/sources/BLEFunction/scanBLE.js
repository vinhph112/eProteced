import React, { Component } from 'react';

import { Alert } from 'react-native';

class Second extends Component {

  SecondClassFunction=()=>{

    Alert.alert("Second Class Function Without Argument Called");

  }

  SecondClassFunctionWithArgument=(Value)=>{

    Alert.alert(Value);

  }

}
 
