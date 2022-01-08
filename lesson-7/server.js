const net = require('net');
const path = require('path');
const fs = require('fs');
const { pipeline } = require('stream');
const zlib = require('zlib');

const server = net.createServer();

const pathToFile = path.join(__dirname, '/data/users.json');
const pathToCsv = path.join(__dirname, '/data/users.csv');
const pathToZip = path.join(__dirname, '/data/users.csv.zip');
let dataOfFile = [];
const arrayWithDataToClient = [];
let body = '';

server.on('connection', socket => {
  socket.on('data', msg => {
    const filter = JSON.parse(msg);
    const {
      name: { first: firstFilter, last: lastFilter },
      phone: phoneFilter,
      address: {
        zip: zipFilter,
        city: cityFilter,
        country: countryFilter,
        street: streetFilter,
      },
    } = filter;

    dataOfFile.forEach(value => {
      const {
        name: { first, last },
        phone,
        address: { zip, city, country, street },
      } = value;
    });
    // for (const key in filter) {
    //   if (value.hasOwnProperty(key)) {
    //     if (
    //       typeof filter[key] === 'object' &&
    //       (key === 'name' || key === 'address')
    //     ) {
    //       const name = {};
    //       for (const objKey in filter[key]) {
    //         if (value[key].hasOwnProperty(objKey)) {
    //           name[objKey] = value[key][objKey];
    //           body += `${name[objKey]},`;
    //         }
    //       }
    //       newObj[key] = name;
    //     } else if (typeof filter[key] === 'string') {
    //       newObj[key] = value[key];
    //       body += `${newObj[key]},`;
    //     } else {
    //       throw new Error('Filter dont have a type what needed');
    //     }
    //   }
    // }
    // body = body.slice(0, body.length - 1) + '\n';
    // arrayWithDataToClient.push(newObj);

    // let headers = '';
    // for (const key in filter) {
    //   if (typeof filter[key] === 'object') {
    //     for (const keyObj in filter[key]) {
    //       headers += `${keyObj},`;
    //     }
    //   } else {
    //     headers += `${key},`;
    //   }
    // }
    // if (format === 'csv' && archive) {
    //   try {
    //     const x = async () => {
    //       await fs.promises.writeFile(
    //         pathToCsv,
    //         headers.slice(0, headers.length - 1) + '\n',
    //       );
    //       await fs.promises.appendFile(pathToCsv, body);
    //       const zip = zlib.createGzip();
    //       const read = fs.createReadStream(pathToCsv);
    //       const write = fs.createWriteStream(pathToZip);
    //       pipeline(read, zip, write, error => {
    //         if (error) throw error;
    //       });
    //       pipeline(read, socket, error => {
    //         if (error) throw error;
    //       });
    //     };
    //     x();
    //   } catch (e) {
    //     console.error(e);
    //   }

    server.close();
  });
});

server.on('listening', () => {
  console.log('Server started');
  fs.promises.readFile(pathToFile).then(data => {
    dataOfFile = JSON.parse(data.toString());
  });
});

server.listen(8081);
