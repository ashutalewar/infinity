import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import log4javascript from "log4javascript"

@inject('BirdStore')
@observer
class App extends Component {

  componentDidMount() {
    console.log('App component mounted');
    	//in debug mode replace line 4 with line 3.
      //window.myLogger = log4javascript.getDefaultLogger();
      window.myLogger = log4javascript.getLogger();
      var ajaxAppender = new log4javascript.AjaxAppender('http://localhost:9000/api/logger', false);
      ajaxAppender.setBatchSize(10); // send in batches of 10
      ajaxAppender.setSendAllOnUnload(); // send all remaining messages on window.beforeunload()
      window.myLogger.addAppender(ajaxAppender);

      window.myLogger.error("Test error log");

      //report all user console errors
      window.onerror = function(message, url, lineNumber) {
        var errorMsg = "Console error- "+url+" : "+lineNumber + ": "+message
        window.myLogger.error(errorMsg);
        return true;
      };
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
