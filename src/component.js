var Flow = require('flow-platform-sdk');
var SMS = require('./sms');

/*
*
* SendSMSComponent sends sms
* The component has 5 properties - `Account SID`, `Authentication Token`, From`, `To`, and `Body` which are all required to send the sms
* The component has 2 ports respective to the sms statuses `Sent`, `Error`
*
*/

class SendSMSComponent extends Flow.Component {
  
  constructor() {

    super();    
    this.name = 'Send SMS';

    var account_sid = new Flow.Property('ACCOUNT_SID', 'text');
    account_sid.required = true;

    var auth_token = new Flow.Property('AUTH_TOKEN', 'text');
    auth_token.required = true;

    var from = new Flow.Property('From', 'text');
    from.required = true;

    var to = new Flow.Property('To', 'text');
    to.required = true;

    var body = new Flow.Property('Body', 'text');
    body.required = true;

    this.addProperty(account_sid);
    this.addProperty(auth_token);
    this.addProperty(from);
    this.addProperty(to);
    this.addProperty(body);

    var sent = new Flow.Port('Sent');
    var error = new Flow.Port('Error');
    
    this.addPort(sent);
    this.addPort(error);

    // send the message here
    this.attachTask(function () {
      let task = 
        new SMS(
          this.getProperty('ACCOUNT_SID').data,
          this.getProperty('AUTH_TOKEN').data,
          this.getProperty('From').data,
          this.getProperty('To').data,
          this.getProperty('Body').data
        ).create();
      
      if (task instanceof Error) {
        this.emitResult(this.getPort('Error'));
      } else
        task
          .then(() => {
            this.emitResult(this.getPort('Sent'));
          })
          .catch(() => {
            this.emitResult(this.getPort('Error'));
          })
          .done();
    });

  }

  emitResult(port) {
    port.emit();
    this.taskComplete();
  }

}

module.exports = SendSMSComponent;