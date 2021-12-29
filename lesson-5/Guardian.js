const { Transform } = require('stream');
const crypto = require('crypto');

class Guardian extends Transform {
  constructor() {
    super({
      objectMode: true,
    });
    this.algoritm = 'aes-192-cbc';
    this.password = '1234';
    this.private_key =
      '-----BEGIN RSA PRIVATE KEY-----\n' +
      'MIICXQIBAAKBgQDd9BzC0tlAuJ7A5BCvNPMr5jPP6QjNNsCwoU75sQXJaC4SXoJI\n' +
      'g14Xw0/w+eseXgYNwO13PZi1q2oXArFMgXymMpiExbFVvR0jcm5oaS4ZSpd+iHCX\n' +
      'ZVHkj1MSwfUMhbWNSmS4SObzSDADUqon/93ckCjzq7i3PvmCKAeX/oAnrwIDAQAB\n' +
      'AoGBAIF+VvljwtT74cNwTDusjONj337B2xy/gRSMSGNtYI7tdVPKSAC+hDsg/Jb/\n' +
      'eKmy+Z00nlcfXOVBKRhbvc2BDpNicxpnt82RP3FJgs/xCxLGwprkWhbUNkr4QKue\n' +
      'JwWRJd2ny/480Z0mQjeiykODkJk+PpoBnZVwOJlJwEpCm+4hAkEA752lZSimzeN+\n' +
      'SzJU7vSwodlYyNiLTVdHj9R0gIotOjk5/wwJFv1OgmEtCijktkW+lRsyD3n75yt2\n' +
      'yUzFc+xqSwJBAO0hTDJErXsz81j3ZlbF0rMmvj8lPg07dKYTOiEMXSNKhUiM1xfh\n' +
      '6uLleyrYeSigQM3EnZafr35h+Qk77wsxGa0CQQC6q6XeWP0aCNCq5FsmjZnNfPWe\n' +
      'ApUDe6tUcb8RJJR3d32nJEkwj8ZJ7EqaT6FeHpeKsdUeGXoVbdbsm9J3rQZhAkBR\n' +
      'uNoDsPuArES/cnPIj+CvcTi7lmAuO0FWQuYToakvkm0gtbkjN+61R5UNDRGkWKY8\n' +
      'w/fzgxD+I1GqRwd4+fD5AkB8XXBuYXoUzcBV51m68ogtyOAPgR2nhpY5SdyxQ+dj\n' +
      'wz1E/X9dWuWstmiDwAfdZkaXtBjifBbIj43i7TsGYhVU\n' +
      '-----END RSA PRIVATE KEY-----\n';
    this.init();
  }
  init() {
    this.on('data', chunk => {
      console.log(chunk);
    });
  }

  _transform(chunk, encode, done) {
    const buf = Buffer.alloc(16, 0);
    const iv = crypto.randomFillSync(buf);
    const sign = crypto.createSign('SHA256');
    const obj = {
      meta: {
        source: 'ui',
      },
      payload: {
        name: chunk.name,
        email: this.#getEncode(chunk.email, iv),
        password: this.#getEncode(chunk.password, iv),
      },
      iv: iv,
    };
    sign.write(JSON.stringify(obj.payload));
    sign.end();
    obj.meta.signature = sign.sign(this.private_key, 'hex');
    this.push(obj);
    done();
  }

  #getEncode(name, iv) {
    const key = crypto.scryptSync(this.password, 'salt', 24);
    const cipher = crypto.createCipheriv(this.algoritm, key, iv);
    let encrypt = cipher.update(name, 'utf8', 'hex');
    encrypt += cipher.final('hex');
    return encrypt;
  }
}

module.exports = Guardian;
