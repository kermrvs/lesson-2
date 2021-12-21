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

const personFirstId = bank.register({
  name: 'Pitter',
  balance: 700,
  limit: amount => amount < 10,
});

bank.on('error', error => {
  if (error) {
    console.error(error);
  }
});

bank.on('send', (personFirstId, personSecondId, amount) => {
  if (sum <= 0) throw new Error('Sum <= 0');
  bank.persons.forEach((value, index) => {
    if (index === personFirstId || index === personSecondId) {
    } else {
      throw new Error('Error');
    }
  });
  const currentBalance = () => {
    return bank.persons[personFirstId].balance;
  };
  const updateBalance = () => {
    return (bank.persons[personFirstId].balance -= amount);
  };

  if (
    bank.persons[personFirstId].limit(amount, currentBalance(), updateBalance())
  ) {
    bank.persons[personFirstId].balance -= amount;
    bank.persons[personSecondId].balance += amount;
  } else {
    throw new Error('Error money');
  }
});

bank.on('add', (personId, sum) => {
  if (sum <= 0) throw new Error('Sum <= 0');
  bank.persons[personId].balance += sum;
  console.log(bank.persons[personId]);
});

bank.on('get', (personId, balance) => {
  balance(bank.persons[personId].balance);
});

bank.on('withdraw', (personId, amount) => {
  if (amount > bank.persons[personId].balance)
    throw new Error('You try to withdraw more sum then you have');
  const currentBalance = () => {
    return bank.persons[personFirstId].balance;
  };
  const updateBalance = () => {
    return (bank.persons[personFirstId].balance -= amount);
  };
  if (
    bank.persons[personFirstId].limit(amount, currentBalance(), updateBalance())
  ) {
    bank.persons[personId].balance -= amount;
  } else {
    throw new Error('Error money');
  }
});

bank.on('changeLimit', (personId, cb) => {
  bank.persons[personId].limit = cb;
});

try {
  // bank.emit('withdraw', personFirstId, 5);
  // bank.emit('get', personFirstId, balance => {
  //   console.log(`I have ${balance}`);
  // });
  // bank.emit(
  //   'changeLimit',
  //   personFirstId,
  //   (amount, currentBalance, updatedBalance) => {
  //     return amount < 100 && updatedBalance > 700;
  //   },
  // );
  // bank.emit('withdraw', personFirstId, 5);
  // bank.emit('get', personFirstId, balance => {
  //   console.log(`I have ${balance}`);
  // });

  bank.emit('get', personFirstId, balance => {
    console.log(`I have ${balance}`);
  });
  bank.emit('withdraw', personFirstId, 5);
  bank.emit('get', personFirstId, balance => {
    console.log(`I have ${balance}`);
  });
  // bank.emit(
  //   'changeLimit',
  //   personFirstId,
  //   (amount, currentBalance, updatedBalance) => {
  //     return amount < 100 && updatedBalance > 700;
  //   },
  // );
  // bank.emit(
  //   'changeLimit',
  //   personFirstId,
  //   (amount, currentBalance, updatedBalance) => {
  //     return amount < 100 && updatedBalance > 700 && currentBalance > 800;
  //   },
  // );
  // bank.emit('changeLimit', personFirstId, (amount, currentBalance) => {
  //   return currentBalance > 800;
  // });
  bank.emit(
    'changeLimit',
    personFirstId,
    (amount, currentBalance, updatedBalance) => {
      return updatedBalance > 900;
    },
  );
  bank.emit('withdraw', personFirstId, 50);
  bank.emit('get', personFirstId, balance => {
    console.log(`I have ${balance}`);
  });
} catch (e) {
  bank.emit('error', e);
}
