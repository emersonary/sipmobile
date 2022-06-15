import React from 'react';
import SimpleCrypto from 'simple-crypto-js';

export function Encrypt(str) {
  var simpleCrypto2 = new SimpleCrypto('polishopencryption');

  return simpleCrypto2.encrypt(str);
}

export function Decrypt(str) {
  var simpleCrypto2 = new SimpleCrypto('polishopencryption');

  return simpleCrypto2.decrypt(str);
}
