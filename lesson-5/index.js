const Ui = require('./Ui');
const Guardian = require('./Guardian');
const AccountManager = require('./AccountManager');
const crypto = require('crypto');

const customers = [
  {
    name: 'Pitter',
    email: 'pblack@email.com',
    password: 'pblack_123',
  },
  {
    name: 'Oliver',
    email: 'owhite@email.com',
    password: 'owhite_456',
  },
];
const ui = new Ui(customers);
const guardian = new Guardian();
const manager = new AccountManager();

ui.pipe(guardian).pipe(manager);
