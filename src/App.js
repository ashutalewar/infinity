import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import logger from './logger'

@inject('BirdStore')
@observer
class App extends Component {

  componentDidMount() {
    console.log('App component mounted');
    logger.initialize()
  }

  render() {

    const {BirdStore} = this.props;
    return (
      <div className="App">
        <h2>You have {BirdStore.birdCount} birds.</h2>
      </div>
    );
  }
}

export default App;
