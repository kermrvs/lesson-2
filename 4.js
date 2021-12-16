class TimersManager{
    constructor() {
        this.timers = [];
        this.timersId=[];
        this.logs = [];
        this.timeStop = 0;
    }
    add(t,...args){
        if(t.name !== '' && typeof t.name === 'string' &&  typeof t.name !== 'undefined' && typeof t.delay !== 'undefined'
            && typeof t.delay === 'number' && t.delay>0 && t.delay<5000 && typeof t.interval !== 'undefined' && typeof t.interval === 'boolean'
            && typeof t.job !== 'undefined' && typeof t.job === 'function'){
            if(this.timers.length === 0){
                if(this.timeStop< t.delay){
                    this.timeStop = t.delay;
                }
                this.timers.push(t);
            }
            else{
                for (const timer of this.timers) {
                    if(timer.name !== t.name){
                        if(this.timeStop< t.delay){
                            this.timeStop = t.delay;
                        }
                        this.timers.push(t);
                        break;
                    }else {
                        console.log(new Error("You try to add element with same name"));
                        break;
                    }
                }
            }
        }
        else{
            console.log(new Error("Check your obj what you try to add"));
        }
    }

    start(){
        this.timeStop +=10;
        setTimeout(()=>{
            this.timersId.forEach(((value, index) => {
                if(value.interval === false){
                    clearTimeout(value)
                }
                else {
                    clearInterval(value)
                }
            }))
        },this.timeStop);
        if(this.timers.length === 0){
            console.log(new Error("Timers is empty"));
        }else {
            this.timers.forEach(((value, index) => {
                if(value.interval === true){
                    this.timersId[index] = setInterval(value.job, value.delay,3,3);
                    this._log(value,value.job(3,3),3,3);
                }
                else {
                    this.timersId[index] = setTimeout(()=>{
                        try{
                            value.job(3,3)
                            this._log(value,value.job(3,3),3,3,'','','');
                        }catch (e) {
                            this._log(value,undefined,3,3,e.name,e.message,e.stack);
                        }

                    }, value.delay);
                }
            }))
        }
    }
    remove(t){
        this.timers.splice(t,1);
        console.log(this.timers);
        if(t.interval === false){
            clearTimeout(this.timersId[this.timers.indexOf(t)])
        }
        else {
            clearInterval(this.timersId[this.timers.indexOf(t)])
        }
    }
    stop(){
        this.timersId.forEach(((value, index) => {
            if(value.interval === false){
                clearTimeout(value)
            }
            else {
                clearInterval(value)
            }
        }))
    }
    pause(t){
        if(t.interval === false){
            clearTimeout(this.timersId[this.timers.indexOf(t)]);
        }
        else {
            clearInterval(this.timersId[this.timers.indexOf(t)]);
        }
    }
    resume(t){
        if(t.interval === false){
            setTimeout(t.job,t.delay,3,3);
        }
        else {
            setInterval(t.job,t.delay,3,3);
        }
    }
    _log(t,result,...args){
        let log = {
            name:t.name,
            in:[args[0],args[1]],
            out:result,
            created: new Date(),
            error:{
                name:args[2],
                message:args[3],
                stack:args[4]
            }
        }
        let cloneLog={}
        if(log.error.name === ''){
            for (const logKey in log) {
                if(logKey !== 'error'){
                    cloneLog[logKey] = log[logKey];
                }
            }
            this.logs.push(cloneLog);
        }
        else {
            this.logs.push(log);
        }


    }
    print(){
        return this.logs;
    }
}
const manager = new TimersManager();

const t1 = {
    name: 't1',
    delay: 3000,
    interval: false,
    job: () => { console.log('t1') }
};
const t2 = {
    name: 't2',
    delay: 2000,
    interval: false,
    job: () => {
        throw new Error('We have a problem!')
    }
};
const t3 = {
    name:'t3',
    delay: 5000,
    interval: false,
    job: (a, b) => {
        return a + b;
    }
};

manager.add(t1);
manager.add(t2,3,3);
manager.add(t3,3,3);
manager.start();
setTimeout(()=>{
    console.log(manager.print());
},2000);

