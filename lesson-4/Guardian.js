const { Transform } = require('stream');

class Guardian extends Transform {
  constructor(
    options = {
      objectMode: true,
    },
  ) {
    super(options);
  }

  _transform(chunk, encoding, done) {
    const { name, email, password } = chunk;
    const obj = {
      meta: 'ui',
      payload: {
        name: name,
        email: Buffer.from(email).toString('hex'),
        password: Buffer.from(password).toString('hex'),
      },
    };
    this.push(obj);
    done();
  }
}

module.exports = Guardian;
