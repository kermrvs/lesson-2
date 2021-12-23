const { Transform } = require('stream');

class Decryptor extends Transform {
  constructor(
    options = {
      objectMode: true,
    },
  ) {
    super(options);
  }

  _transform(chunk, encode, done) {
    const { payload, meta } = chunk;
    const newObj = {
      name: payload.name,
      email: this.#trans(payload.email, meta.algorithm),
      password: this.#trans(payload.password, meta.algorithm),
    };
    this.push(newObj);
    done();
  }

  #trans(name, meta) {
    if (meta === 'hex') {
      return Buffer.from(name, 'hex').toString('ascii');
    }
    if (meta === 'base64') {
      return Buffer.from(name, 'base64').toString('ascii');
    } else {
      throw new Error('Algorithm error');
    }
  }
}

module.exports = Decryptor;
