const fs = require('fs');
const path = require('path');

class Json2csv {
  #data = [];
  #obj = '';

  constructor(massive) {
    this.massive = massive;
    this.filePath = path.join(__dirname + '/data/comments.json');
    this.filePathToCsv = path.join(__dirname + '/data/comments.csv');
  }

  async setData() {
    await this.#readFile(this.filePath)
      .then(data => {
        this.#data = JSON.parse(data.toString());
        this.#data.forEach((value, index, array) => {
          for (const valueKey in value) {
            if (this.massive.includes(valueKey)) {
              if (valueKey === 'body') {
                let result = value[valueKey].replace(/\n/g, ' ');
                this.#obj += result;
              } else {
                this.#obj += `${value[valueKey]},`;
              }
            }
          }
          this.#obj += '\n';
        });
        console.log('read file');
      })
      .catch(msg => {
        console.log(msg);
      });
    let headers = '';
    this.massive.forEach((value, index, array) => {
      if (index === array.length - 1) {
        headers += `${value}`;
      } else {
        headers += `${value},`;
      }
    });
    headers += '\n';
    console.log(headers);
    await this.#writeHeader(this.filePathToCsv, headers).catch(msg => {
      console.log(msg);
    });
    await this.#appendDataToCsv(this.filePathToCsv, this.#obj).catch(msg => {
      console.log(msg);
    });
  }

  #readFile(file) {
    return new Promise((resolve, reject) => {
      fs.readFile(file, (error, data) => {
        if (error) throw reject(error);
        resolve(data);
      });
    });
  }

  #writeHeader(file, str) {
    return new Promise((resolve, reject) => {
      fs.writeFile(file, str, err => {
        if (err) throw reject(err);
        resolve(str);
      });
    });
  }

  #appendDataToCsv(file, obj) {
    return new Promise((resolve, reject) => {
      fs.appendFile(file, obj, err => {
        if (err) throw reject(err);
        resolve(obj);
      });
    });
  }
}

module.exports = Json2csv;
