const { Writable } = require('stream');

class AccountManager extends Writable {
  constructor(
    options = {
      objectMode: true,
    },
  ) {
    super(options);
  }

  _write(chunk, encoding, done) {
    console.log(chunk);
    done();
  }
}

module.exports = AccountManager;
