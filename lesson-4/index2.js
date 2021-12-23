const Ui2 = require('./Ui2');
const Decryptor = require('./Decryptor');
const AccountManager = require('./AccountManager');

const customers = [
  {
    payload: {
      name: 'Pitter Black',
      email: '70626c61636b40656d61696c2e636f6d',
      password: '70626c61636b5f313233',
    },
    meta: {
      algorithm: 'hex',
    },
  },
];
const ui2 = new Ui2(customers, {
  objectMode: true,
});
const decryptor = new Decryptor();
const manager = new AccountManager();

ui2.pipe(decryptor).pipe(manager);
