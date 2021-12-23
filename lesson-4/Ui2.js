const { Readable } = require('stream');

class Ui2 extends Readable {
  constructor(data, options) {
    super(options);
    this.data = data;
    this.init();
  }

  init() {
    this.on('error', error => {
      console.log(error);
    });
  }

  _read() {
    const data = this.data.shift();
    if (!data) {
      this.push(null);
    } else {
      this.#checkStructure(data);
    }
  }

  #checkStructure(data) {
    if (data.hasOwnProperty('payload') && data.hasOwnProperty('meta')) {
      if (
        data.payload.name !== '' &&
        data.payload.email !== '' &&
        data.payload.password !== '' &&
        data.meta.algorithm !== '' &&
        typeof data.payload.name === 'string' &&
        typeof data.payload.email === 'string' &&
        typeof data.payload.password === 'string' &&
        typeof data.meta.algorithm === 'string'
      ) {
        if (
          Object.keys(data.payload).length === 3 &&
          Object.keys(data.meta).length === 1
        ) {
          this.push(data);
        } else {
          this.emit('error', 'Structure3 is wrong');
        }
      } else {
        this.emit('error', 'Structure2 is wrong');
      }
    } else {
      this.emit('error', 'Structure1 is wrong');
    }
  }
}

module.exports = Ui2;
