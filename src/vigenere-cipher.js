const CustomError = require("../extensions/custom-error");

class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
    this.alphaDict = this.buildAlphaDict();
    // Object.keys(this.alphaDict).map((key) => console.log(`${key} : ${this.alphaDict[key]}`));
  }

  // this method builds an alphabet dictionary (e.g. 0: A, 1: B)
  buildAlphaDict() {
    const dict = {};
    // There are 26 letter is English alphabet
    // Position of character A in UTF-16 table is 65
    for (let i = 0; i <= 25; i += 1) {
      dict[i] = String.fromCharCode(65 + i);
    }
    return dict;
  }

  // the method builds the Key array of proper length
  buildKeyArr(key, message) {
    const alphabet = Object.values(this.alphaDict);
    // e.g. of messageArr = [A, T, T, A, C, K, A, T, D, A, W, N]
    const messageArr = message.toUpperCase().split('').filter((char) => alphabet.includes(char));
    const rawKey = key.toUpperCase().split('');
    const rawKeyArr = [];
    let counter = 0;
    // key arr must be the same length as message arr
    while (rawKeyArr.length < messageArr.length) {
      if (!rawKey[counter]) counter = 0;
      rawKeyArr.push(rawKey[counter]);
      counter += 1;
    }
    return rawKeyArr;
  }

  // The main method that encrypts or decrypts the given message based on the alphabet dictionary
  crypto(message, key, action = 'encode') {
    // get a key array with a proper length
    const rawKeyArr = this.buildKeyArr(key, message);
    const dict = this.alphaDict;
    // this method gets the key of a letter in the alphabet dict
    // or returns -1 if the key was not found (i.e. it's not a letter!)
    const findKey = (obj, value) => {
      const result = Object.keys(obj).find((key) => obj[key] === value);
      return result ? Number(result) : -1;
    };
    let index = 0;
    const output = message.toUpperCase().split('').map((char) => {
      const key1 = findKey(dict, char);
      if (key1 === -1) return char;
      const key2 = findKey(dict, rawKeyArr[index]);
      // choose the formula based on encoding / decoding
      const outputKey = action === 'encode' ? (key1 + key2) % 26 : (key1 - key2 + 26) % 26;
      const letter = dict[outputKey];
      index += 1;
      return letter;
    });
    return output.join('');
  }

  encrypt(message, key) {
    if (!message || !key) throw new Error('An argument is missing!');
    const encrypted = this.crypto(message, key, 'encode');
    return this.isDirect ? encrypted : encrypted.split('').reverse().join('');
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) throw new Error('An argument is missing!');
    const decrypted = this.crypto(encryptedMessage, key, 'decode');
    return this.isDirect ? decrypted : decrypted.split('').reverse().join('');
  }
}

module.exports = VigenereCipheringMachine;
