import log4javascript from "log4javascript"

class nanonetsLogger{

    initialize(){
        var myLogger = log4javascript.getLogger();

        var url = 'https://hooks.slack.com/services/xyz';
        var jsonAppender = new JsonAppender(url);
        myLogger.addAppender(jsonAppender);

        myLogger.error("Test error log");

        window.onerror = function(message, url, lineNumber) {
        var errorMsg = "Console error- "+url+" : "+lineNumber + ": "+message
        myLogger.error(errorMsg);
        return true;
        };
    }
  
}

class JsonAppender extends log4javascript.Appender{

    constructor(url){
        super()
        this.url = url
        this.isSupported = true;
        this.successCallback = function(data, textStatus, jqXHR) { return; };
        if (!this.url) {
            this.isSupported = false;
        }
    }

    setSuccessCallback = function(successCallbackParam) {
        this.successCallback = successCallbackParam;
    };
    append = function (loggingEvent) {
        if (!this.isSupported) {
            return;
        }
        fetch(this.url, {
            method: 'POST',
            body: JSON.stringify({
              text : JSON.stringify({
                  'logger': loggingEvent.logger.name,
                  'timestamp': loggingEvent.timeStampInMilliseconds,
                  'level': loggingEvent.level.name,
                  'url': window.location.href,
                  'message': loggingEvent.getCombinedMessages(),
                  'exception': loggingEvent.getThrowableStrRep()
              })
            })
        }).then(response => {
            this.successCallback(null, response)
        })
    };
}

const logger = new nanonetsLogger();
export default logger;

