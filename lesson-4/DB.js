const EventEmitter = require('events').EventEmitter;

class DB extends EventEmitter {
  constructor() {
    super();
    this.data = [];
    this.init();
  }

  init() {
    this.on('logger', data => {
      this.data.push(data);
    });
  }
  getLoggerData() {
    this.data.forEach(value => {
      console.log(
        `From: ${value.source}, payload:{ name:${value.payload.name}, email:${value.payload.email}, password:${value.payload.email}}, created: ${value.created}`,
      );
    });
  }
}

module.exports = DB;
