const { Readable } = require('stream');
class Ui extends Readable {
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
      if (
        data.hasOwnProperty('name') &&
        data.hasOwnProperty('email') &&
        data.hasOwnProperty('password')
      ) {
        if (
          typeof data.name === 'string' &&
          typeof data.email === 'string' &&
          typeof data.password === 'string'
        ) {
          if (Object.keys(data).length === 3) {
            this.push(data);
          } else {
            this.emit('error', 'Object has some shit property');
          }
        } else {
          this.emit('error', 'Object`s properties need to be with string type');
        }
      } else {
        this.emit('error', 'Obj dont have a property what we need');
      }
    }
  }
}

module.exports = Ui;
