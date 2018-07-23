import React, { Component } from 'react';
import Pulse from 'react-native-pulse';

export default class PulseAnimate extends Component {
  render() {
    return(
      <Pulse
        color='#4AB6FF'
        numPulses={5}
        diameter={400}
        speed={20}
        duration={2000}
      />
    );
  }
}
