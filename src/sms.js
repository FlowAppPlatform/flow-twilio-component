/**
 *
 * This class constructs an sms message and creates it with the create() method
 * The class uses Twilio to send sms
 * 
 *
 */

const twilio = require('twilio');

class SMS {

  constructor(ACCOUNT_SID, AUTH_TOKEN, from, to, body) {
    this.from = from;
    this.to = to;
    this.body = body;
    
    this.ACCOUNT_SID = ACCOUNT_SID;
    this.AUTH_TOKEN = AUTH_TOKEN;

    this.twilio = twilio(this.ACCOUNT_SID, this.AUTH_TOKEN);
  }

  create() {
    if (!this.smsValid()) return new Error('SMS error, please check \'SMS\' contructor');
    return (
      this.twilio
        .messages
        .create({
          from: this.from,
          body: this.body,
          to: this.to,
        })
    );
  }

  smsValid() {
    return (
      Boolean(this.ACCOUNT_SID) &&
      Boolean(this.AUTH_TOKEN) &&
      Boolean(this.twilio) &&
      Boolean(this.from) &&
      Boolean(this.to) &&
      Boolean(this.body)
    );
  }

}

module.exports = SMS;