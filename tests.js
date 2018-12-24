var SMS = require('./src/sms');
var SendSMSComponent = require('./send-sms');

/*
 * 
 * To run tests successfully,
 * 
 * replace account_sid, authentication_token with your own
 * 
 */

let account_sid = '';
let authentication_token = '';

const Graph = require('flow-platform-sdk').Graph;

describe(`Component Tests
`, function () {
  it('Component should execute without errors', function (done) {
    try {
      
      const component = new SendSMSComponent();

      component.getProperty('ACCOUNT_SID').data = account_sid;
      component.getProperty('AUTH_TOKEN').data = authentication_token;
      component.getProperty('From').data = 'Twilio Sender Number';
      component.getProperty('To').data = '+15149950278';
      component.getProperty('Body').data = 'Test message, Ignore this.';

      component.getPort('Sent').onEmit(function(){
        done();
      });
      component.getPort('Error').onEmit(function(){
        done(component.getPort('Error').getProperty('Data').data);
      });

      new Graph("graph-1").addComponent(component);
      component.execute();

    } catch(e) { done(new Error('Component missing required properties')); }
  })
})