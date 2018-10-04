var SMS = require('./src/sms');
var SendSMSComponent = require('./send-sms');

describe(`SMS Tests
`, function () {
  it(`SMS instance "new SMS()" should not be valid`, function (done) {
    try {
      new SMS();
      done(new Error('Invalid sms instance read valid'));
    } catch(e) { done() }
  })
  it(`SMS instance "new SMS(
    'ACe4e429f0aeb107130daabe39bffb98de','171eea1f076c27d6ed5bcd48d803abf4',
    '+18646574367','+15107750208','Body')" should not be valid`, function (done) {
    const sms = new SMS(
      'ACe4e429f0aeb107130daabe39bffb98de', '171eea1f076c27d6ed5bcd48d803abf4',
      '', 'to@sample.com', 'Body');
    done(!sms.isSmsValid() ? null : new Error('Invalid sms instance read valid'));
  })
  it(`SMS instance "new SMS(
    'ACe4e429f0aeb107130daabe39bffb98de','',
    '+18646574367','+15107750208','Body')" should not be valid`, function (done) {
    try {
      const sms = new SMS(
        'ACe4e429f0aeb107130daabe39bffb98de', '',
        '+18646574367','+15107750208','Body'
      );
      done(!sms.isSmsValid() ? null : new Error('Invalid sms instance read valid'));
    } catch(e) { done(); }
  })
  it(`SMS instance "new SMS(
    'ACe4e429f0aeb107130daabe39bffb98de','171eea1f076c27d6ed5bcd48d803abf4',
    '+18646574367','+15107750208','Body')" should be valid`, function (done) {
    const sms = new SMS(
      'ACe4e429f0aeb107130daabe39bffb98de', '171eea1f076c27d6ed5bcd48d803abf4',
      '+18646574367','+15107750208','Body'
    );
    done(sms.isSmsValid() ? null : new Error('Valid sms instance read invalid'));
  })
})

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