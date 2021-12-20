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

const personFirstId = bank.register({ name: 'Pitter', balance: 100 });
const personSecondId = bank.register({ name: 'Oliver', balance: 700 });
const personSecondId3 = 3;

bank.on('error', error => {
  if (error) {
    console.error(error);
  }
});

bank.on('send', (personFirstId, personSecondId, sum) => {
  if (sum <= 0) throw new Error('Sum <= 0');
  const mass = [personFirstId, personSecondId];
  mass.forEach((value, index) => {
    if (index === personFirstId || index === personSecondId) {
    } else {
      throw new Error('Error');
    }
  });
  bank.persons[personFirstId].balance -= sum;
  bank.persons[personSecondId].balance += sum;
});

bank.on('add', (personId, sum) => {
  if (sum <= 0) throw new Error('Sum <= 0');
  bank.persons[personId].balance += sum;
  console.log(bank.persons[personId]);
});

bank.on('get', (personId, cb) => {
  cb(bank.persons[personId].balance);
});

function cb(balance) {
  return balance;
}

bank.on('withdraw', (personId, sum) => {
  if (sum > bank.persons[personId].balance)
    throw new Error('You try to withdraw more sum then you have');
  bank.persons[personId].balance -= sum;
  console.log(bank.persons[personId]);
});

try {
  bank.emit('get', personFirstId, balance => {
    console.log(`I have ${balance}`);
  });

  bank.emit('get', personSecondId, balance => {
    console.log(`I have ${balance}`);
  });

  bank.emit('send', personFirstId, personSecondId3, 50);

  bank.emit('get', personFirstId, balance => {
    console.log(`I have ${balance}`);
  });

  bank.emit('get', personSecondId, balance => {
    console.log(`I have ${balance}`);
  });
} catch (e) {
  bank.emit('error', 'Error with my contragent');
}
