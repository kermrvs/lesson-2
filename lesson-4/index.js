const Ui = require('./Ui');
const Guardian = require('./Guardian');
const AccountManager = require('./AccountManager');
const Logger = require('./Logger');
const DB = require('./DB');

const customers = [
  {
    name: 'Pitter Black',
    email: 'pblack@email.com',
    password: 'pblack_123',
  },
  {
    name: 'Oliver White',
    email: 'owhite@email.com',
    password: 'owhite_456',
  },
];

const ui = new Ui(customers, {
  objectMode: true,
});

const guardian = new Guardian();

const manager = new AccountManager();

const db = new DB();

const logger = new Logger(db, {
  objectMode: true,
});

ui.pipe(guardian).pipe(logger).pipe(manager);
console.log('----------------------------------');
setTimeout(() => {
  db.getLoggerData();
}, 2000);
