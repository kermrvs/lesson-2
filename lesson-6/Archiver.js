const fs = require('fs');
const zlib = require('zlib');

class Archiver {
  constructor(options) {
    this.options = options;
  }

  async createZip() {
    console.log(Object.keys(this.options).length);
    if (
      Object.keys(this.options).length === 1 &&
      this.options.algorithm &&
      this.options.algorithm !== '' &&
      typeof this.options.algorithm === 'string'
    ) {
      if (this.options.algorithm === 'deflate') {
        console.log('deflate');
        const deflate = zlib.createDeflate();
        const read = await fs.createReadStream('./data/comments.csv');
        const write = await fs.createWriteStream('./data/comments.csv.zip');
        read.pipe(deflate).pipe(write);
      } else if (this.options.algorithm === 'gzip') {
        console.log('gzip');
        const gzip = zlib.createGzip();
        const read = await fs.createReadStream('./data/comments.csv');
        const write = await fs.createWriteStream('./data/comments.csv.zip');
        read.pipe(gzip).pipe(write);
      }
    } else {
      throw new Error('Options have more properties or dont have algorithm');
    }
  }

  async createAnZip() {
    const deflate = zlib.createUnzip();
    const read = await fs.createReadStream('./data/comments.csv.zip');
    const write = await fs.createWriteStream('./data/comments.csv');
    read.pipe(deflate).pipe(write);
  }
}

module.exports = Archiver;
