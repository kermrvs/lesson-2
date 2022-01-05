const json2csv = require('./json2csv');
const archiver = require('./Archiver');
const massive = ['postId', 'name', 'email', 'body'];
// const obj = new json2csv(massive);
// obj.setData();

const obj2 = new archiver({
  algorithm: 'deflate',
});
obj2.createZip();
// obj2.createAnZip();
