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

    if (process.env.NODE_ENV === 'testing') return;
    this.twilio = twilio(this.ACCOUNT_SID, this.AUTH_TOKEN);
  }

  create() {
    /* Support tests to this point */
    if (process.env.NODE_ENV === 'testing') return new Promise(
      resolve => resolve(JSON.stringify({}))
    );
    if (!this.isSmsValid()) return new Error('SMS error, please check \'SMS\' contructor');
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

  isSmsValid() {
    return (
      Boolean(this.ACCOUNT_SID) &&
      Boolean(this.AUTH_TOKEN) &&
      Boolean(this.twilio) &&
      Boolean(this.from) &&
      Boolean(this.to)
    );
  }

}

module.exports = SMS;