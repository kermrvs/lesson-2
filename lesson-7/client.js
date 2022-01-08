const { Socket } = require('net');

const client = new Socket();

const filter = {
  filter: {
    name: {
      first: 'on',
      last: 'd',
    },
    phone: '56',
    address: {
      zip: '1234',
      city: 'Kyiv',
      country: 'ukr',
      street: 'so',
    },
  },
  meta: {
    format: 'csv',
    archive: true,
  },
};

client.connect(8081, () => {
  console.log('Connected!');
  client.write(JSON.stringify(filter));
});

client.on('data', data => {
  console.log(data);
  client.end();
});
