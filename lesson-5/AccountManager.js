const { Writable } = require('stream');
const crypto = require('crypto');

class AccountManager extends Writable {
  constructor() {
    super({
      objectMode: true,
    });
    this.data = [];
    this.algoritm = 'aes-192-cbc';
    this.password = '1234';
    this.sertificate =
      '-----BEGIN CERTIFICATE-----\n' +
      'MIICVjCCAb8CFH/wbUNVruA2dVLRzncNHlhDRaz7MA0GCSqGSIb3DQEBCwUAMGox\n' +
      'CzAJBgNVBAYTAlVLMQ0wCwYDVQQIDARLaWV2MQ0wCwYDVQQHDARLaWV2MQ0wCwYD\n' +
      'VQQKDARLaWV2MQ0wCwYDVQQLDARLaWV2MQ0wCwYDVQQDDARLaWV2MRAwDgYJKoZI\n' +
      'hvcNAQkBFgFhMB4XDTIxMTIyOTEyNTQ0M1oXDTIyMDEyODEyNTQ0M1owajELMAkG\n' +
      'A1UEBhMCVUsxDTALBgNVBAgMBEtpZXYxDTALBgNVBAcMBEtpZXYxDTALBgNVBAoM\n' +
      'BEtpZXYxDTALBgNVBAsMBEtpZXYxDTALBgNVBAMMBEtpZXYxEDAOBgkqhkiG9w0B\n' +
      'CQEWAWEwgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBAN30HMLS2UC4nsDkEK80\n' +
      '8yvmM8/pCM02wLChTvmxBcloLhJegkiDXhfDT/D56x5eBg3A7Xc9mLWrahcCsUyB\n' +
      'fKYymITFsVW9HSNybmhpLhlKl36IcJdlUeSPUxLB9QyFtY1KZLhI5vNIMANSqif/\n' +
      '3dyQKPOruLc++YIoB5f+gCevAgMBAAEwDQYJKoZIhvcNAQELBQADgYEAlXQSVES9\n' +
      '5c9Fa2ok8EWxiN5W5Ll+Bw6bi5pO1PwuwsSxfSU86O0GrwGqrtDBklx1Pv7YuAmQ\n' +
      'MaMXAhXO13gAz9IeD9Q5QSUSdxG4HRiMGorMk6Gsj9XxV1xjEO/MiJL0wC57DHqR\n' +
      '2EFYt2tk2J/YY0221fRne2WeDI52u0yb4zg=\n' +
      '-----END CERTIFICATE-----';
  }

  _write(chunk, encode, done) {
    const verify = crypto.createVerify('SHA256');
    console.log(chunk.meta.signature);
    verify.write(JSON.stringify(chunk.payload));
    verify.end();
    console.log(verify.verify(this.sertificate, chunk.meta.signature, 'hex'));

    const newObj = {
      meta: chunk.meta,
      payload: {
        name: chunk.payload.name,
        email: this.#decode(chunk.payload.email, chunk.iv),
        password: this.#decode(chunk.payload.password, chunk.iv),
      },
    };
    this.data.push(newObj);
    done();
  }

  #decode(name, iv) {
    const key = crypto.scryptSync(this.password, 'salt', 24);
    const decipher = crypto.createDecipheriv(this.algoritm, key, iv);
    let decrypted = decipher.update(name, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}

module.exports = AccountManager;
