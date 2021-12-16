class TimersManager {
  constructor() {
    this.timers = [];
    this.timersId = [];
  }

  add(t, ...args) {
    if (
      t.name !== '' &&
      typeof t.name === 'string' &&
      typeof t.name !== 'undefined' &&
      typeof t.delay !== 'undefined' &&
      typeof t.delay === 'number' &&
      t.delay > 0 &&
      t.delay < 5000 &&
      typeof t.interval !== 'undefined' &&
      typeof t.interval === 'boolean' &&
      typeof t.job !== 'undefined' &&
      typeof t.job === 'function'
    ) {
      t.job(args[0], args[1]);
      if (this.timers.length === 0) {
        this.timers.push(t);
      } else {
        for (const timer of this.timers) {
          if (timer.name !== t.name) {
            this.timers.push(t);
            break;
          } else {
            console.log(new Error('You try to add element with same name'));
            break;
          }
        }
      }
    } else {
      console.log(new Error('Check your obj what you try to add'));
    }
  }

  remove(t) {
    this.timers.splice(t, 1);
    console.log(this.timers);
    clearTimeout(this.timersId[this.timers.indexOf(t)]);
  }

  start() {
    if (this.timers.length === 0) {
      console.log(new Error('Timers is empty'));
    } else {
      this.timers.forEach((value, index) => {
        if (value.interval === true) {
          this.timersId[index] = setInterval(value.job, value.delay, 3, 3);
        } else {
          this.timersId[index] = setTimeout(value.job, value.delay, 3, 3);
        }
      });
    }
  }

  stop() {
    this.timersId.forEach((value, index) => {
      if (value.interval === false) {
        clearTimeout(value);
      } else {
        clearInterval(value);
      }
    });
  }

  pause(t) {
    if (t.interval === false) {
      clearTimeout(this.timersId[this.timers.indexOf(t)]);
    } else {
      clearInterval(this.timersId[this.timers.indexOf(t)]);
    }
  }

  resume(t) {
    setTimeout(t.job, t.delay, 3, 3);
  }
}

const manager = new TimersManager();
const t1 = {
  name: 't11',
  delay: 1000,
  interval: false,
  job: () => {
    console.log('t1');
  },
};
const t2 = {
  name: 't2',
  delay: 1000,
  interval: false,
  job: (a, b) => {
    console.log(a + b);
    return a + b;
  },
};

manager.add(t1);
manager.add(t2, 3, 3);
manager.start();
//manager.remove(t1);
//manager.pause(t2);
//manager.resume(t2);
