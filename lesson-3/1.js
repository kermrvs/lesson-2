const EventEmitter = require('events').EventEmitter;

class Bank extends EventEmitter {
  constructor() {
    super();
    this.persons = [];
  }

  register(person) {
    if (person.balance <= 0) throw new Error('Error');

    this.persons.forEach(value => {
      if (value.name === person.name) throw new Error('Error');
    });
    this.persons.push(person);
    return this.persons.indexOf(person);
  }
}

const bank = new Bank();

const personId = bank.register({ name: 'Pitter', balance: 50 });

bank.on('error', error => {
  if (error) {
    console.error(error);
  }
  return;
});

bank.on('add', (personId, sum) => {
  if (sum <= 0) throw new Error('Sum <= 0');
  bank.persons[personId].balance += sum;
  console.log(bank.persons[personId]);
});

bank.on('get', (personId, cb) => {
  cb(bank.persons[personId].balance);
});

bank.on('withdraw', (personId, sum) => {
  if (sum > bank.persons[personId].balance)
    throw new Error('You try to withdraw more sum then you have');
  bank.persons[personId].balance -= sum;
  console.log(bank.persons[personId]);
});

try {
  bank.emit('add', personId, 10);

  bank.emit('get', personId, balance => {
    console.log(`I have ${balance}`);
  });
  bank.emit('withdraw', personId, 10);
} catch (e) {
  bank.emit('error', 'Error with my contragent');
}
