const { Transform } = require('stream');

class Logger extends Transform {
  constructor(db, options) {
    super(options);
    this.db = db;
  }

  _transform(chunk, encode, done) {
    const { meta, payload } = chunk;
    const obj = {
      source: meta,
      payload: payload,
      created: new Date(),
    };
    this.db.emit('logger', obj);
    this.push(chunk);
    done();
  }
}

module.exports = Logger;
