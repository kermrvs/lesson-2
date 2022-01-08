const net = require('net');
const path = require('path');
const fs = require('fs');
const { pipeline } = require('stream');
const zlib = require('zlib');

const server = net.createServer();

const pathToFile = path.join(__dirname, '/data/users.json');
const pathToCsv = path.join(__dirname, '/data/users.csv');
const pathToZip = path.join(__dirname, '/data/users.csv.zip');
const pathToJson = path.join(__dirname, '/data/users2.json');

let dataOfFile = [];
const arrayWithDataToClient = [];
let body = '';
let fullBody = '';

server.on('connection', socket => {
  socket.on('data', async msg => {
    const obj = JSON.parse(msg.toString());

    const {
      filter,
      meta: { format, archive },
    } = obj;

    const newObj = {};

    for await (const value of dataOfFile) {
      for (const key in filter) {
        if (value.hasOwnProperty(key)) {
          if (
            typeof filter[key] === 'object' &&
            (key === 'name' || key === 'address')
          ) {
            const name = {};
            for (const objKey in filter[key]) {
              if (value[key].hasOwnProperty(objKey)) {
                name[objKey] = value[key][objKey];
                body += `${name[objKey]},`;
              }
            }
            newObj[key] = name;
          } else if (typeof filter[key] === 'string') {
            newObj[key] = value[key];
            body += `${newObj[key]},`;
          } else {
            throw new Error('Filter dont have a type what needed');
          }
        }
      }

      body = body.slice(0, body.length - 1) + '\n';

      arrayWithDataToClient.push(newObj);
    }

    let headers = '';

    for (const key in filter) {
      if (typeof filter[key] === 'object') {
        for (const keyObj in filter[key]) {
          headers += `${keyObj},`;
        }
      } else {
        headers += `${key},`;
      }
    }

    if (format === 'csv' && !archive) {
      fullBody = headers.slice(0, headers.length - 1) + '\n' + body;
      socket.write(fullBody);
    }
    if (archive && format !== 'csv') {
      await fs.writeFile(
        pathToJson,
        JSON.stringify(arrayWithDataToClient),
        error => {
          if (error) throw error;
        },
      );
      const read = fs.createReadStream(pathToJson);
      const zip = zlib.createGzip();
      read.pipe(zip).pipe(socket);
    }
    if (archive && format === 'csv') {
      fullBody = headers.slice(0, headers.length - 1) + '\n' + body;
      await fs.writeFile(pathToCsv, fullBody, error => {
        if (error) throw error;
      });
      const read = fs.createReadStream(pathToCsv);
      const zip = zlib.createGzip();
      read.pipe(zip).pipe(socket);
    }
  });
});

server.on('listening', async () => {
  console.log('Server started');
  const data = await fs.promises.readFile(pathToFile);

  dataOfFile = JSON.parse(data.toString());
});

server.listen(8081);
