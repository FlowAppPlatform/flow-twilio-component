var Flow = require('flow-platform-sdk');
var SMS = require('./src/sms');

/*
*
* This component sends sms
*
* The component has 5 properties - `Account SID`, `Authentication Token`, From`, `To`, and `Body`
* The component has 2 ports respective to the sms statuses `Sent`, `Error`
* The ports each have the `Data` property, the response from Twilio
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

    var response = new Flow.Property('Data', 'object');
    response.required = true;
    sent.addProperty(response);
    
    var generalError = new Flow.Property('Data', 'object');
    generalError.required = true;
    error.addProperty(generalError);
    
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
        const port = this.getPort('Error');
        port.getProperty('Data').data = task;
        port.emit();
        this.taskComplete();
        return;
      }
      task
        .then(response => {
          const port = this.getPort('Sent');
          port.getProperty('Data').data = response;
          port.emit();
          this.taskComplete();
        })
        .catch(err => {
          const port = this.getPort('Error');
          port.getProperty('Data').data = err;
          port.emit();
          this.taskComplete();
        })
        .done();
    });

  }

}

module.exports = SendSMSComponent;