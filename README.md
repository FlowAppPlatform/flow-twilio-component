# Flow Twilio component
The component is an npm package that sends sms using Twilio and is designed to work with Flow SDK

*To use the component, install the package in your NodeJS project*

```
npm install flow-twilio-component --save
```

*Use the component as below*

```javascript
// require the component
const Component = require('flow-twilio-component');

// create instance of the component
const component = new Component();
```

*Provide twilio credentials, account sid and authentication token*

```javascript
component.getProperty('ACCOUNT_SID').data = 'Your_Account_SID';
component.getProperty('AUTHENTICATION_TOKEN').data = 'Your_Authentication_Token';
```

*Provide sms fields*

```javascript
// provide from and to phone numbers
component.getProperty('From').data = '+18646574367';
component.getProperty('To').data = '+17326950328';

// provide the message to send
component.getProperty('Body').data = 'Hello there, this is a test message.';
```

*Listen in for port emit events*
```javascript
component.getPort('Sent').onEmit(function(){
  // sms was sent
  // the server response can be accessed through the 'Data' property of the port
  let response = component.getPort('Sent').getProperty('Data').data;
});

component.getPort('Error').onEmit(function(){
  // an error occured
  // the actual error can be accessed through the 'Data' property of the port
  let err = component.getPort('Error').getProperty('Data').data;
});


// mandatory to execute the component
component.execute();
```

#### Conclusion

And that's it! You've successfully used the Flow Twilio component.

If you are having trouble sending messages, check that you are using the correct [Twilio credentials](https://www.twilio.com/console/) and the right [sender number](https://www.twilio.com/console/phone-numbers/incoming).