import React, { Component } from 'react';
import PulseAnimate from './ScanScreen/PulseAnimate';

export default class Home extends Component {
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
