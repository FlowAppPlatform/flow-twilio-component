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

describe(`Component Tests
`, function () {
  it('Component should have all required properties', function (done) {
    try {
      const component = new SendSMSComponent();
      component.getProperty('ACCOUNT_SID');
      component.getProperty('AUTH_TOKEN');
      component.getProperty('From');
      component.getProperty('To');
      component.getProperty('Body');
      done();
    } catch(e) { done(new Error('Component missing required properties')); }
  })
  it('Component should have all required ports', function (done) {
    try {
      const component = new SendSMSComponent();
      component.getPort('Sent');
      component.getPort('Error');
      done();
    } catch(e) { done(new Error('Component missing required ports')); }
  })
})

if (!(account_sid && authentication_token)) return;

describe(`SMS Tests
`, function () {
  it(`SMS instance "new SMS()" should not be valid`, function (done) {
    try {
      new SMS();
      done(new Error('Invalid sms instance read valid'));
    } catch(e) { done() }
  })
  it(`SMS instance "new SMS(
    account_sid,authentication_token,
    '+18646574367','+15107750208','Body')" should not be valid`, function (done) {
    const sms = new SMS(
      account_sid, authentication_token,
      '', 'to@sample.com', 'Body');
    done(!sms.isSmsValid() ? null : new Error('Invalid sms instance read valid'));
  })
  it(`SMS instance "new SMS(
    account_sid,'',
    '+18646574367','+15107750208','Body')" should not be valid`, function (done) {
    try {
      const sms = new SMS(
        account_sid, '',
        '+18646574367','+15107750208','Body'
      );
      done(!sms.isSmsValid() ? null : new Error('Invalid sms instance read valid'));
    } catch(e) { done(); }
  })
  it(`SMS instance "new SMS(
    account_sid,authentication_token,
    '+18646574367','+15107750208','Body')" should be valid`, function (done) {
    const sms = new SMS(
      account_sid, authentication_token,
      '+18646574367','+15107750208','Body'
    );
    done(sms.isSmsValid() ? null : new Error('Valid sms instance read invalid'));
  })
})