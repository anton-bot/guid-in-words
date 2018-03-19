'use strict';

/**
 * @fileOverview Generates a random GUID and converts it into words. Also
 * converts any hex string into words, or words to hex string.
 */

const guid = require('node-uuid');
const md5 = require('md5');
const sha256 = require('s256');

const words = require('./words.json');
const reverseWords = require('./reverse.json');

class GuidToWords {
  constructor() { }

  /**
   * Generates a random GUID, converts it to words, and returns both.
   * @returns {object} An object containing a `guid` and `words`
   */
  static randomGuid() {
    let random = guid().replace(/-/g, '');
    return {
      guid: random,
      words: GuidToWords.toWords(random),
    };
  }

  /**
   * Takes a string, hashes it using MD5, and returns the md5 hash and the
   * hash converted to words.
   * @param {string} stringToHash - The string to be hashed.
   * @returns {object} An object containing a `hash` and `words`
   */
  static md5(stringToHash) {
    let hash = md5(stringToHash);
    return {
      hash,
      words: GuidToWords.toWords(hash),
    };
  }

  /**
   * Takes a string, hashes it using SHA256, and returns the hash itself and the
   * hash converted to words.
   * @param {string} stringToHash - The string to be hashed.
   * @returns {object} An object containing a `hash` and `words`
   */
  static sha256(stringToHash) {
    let hash = sha256(stringToHash);
    return {
      hash,
      words: GuidToWords.toWords(hash),
    };
  }

  /**
   * Converts a hex string to words.
   * @param {any} hexString
   * @returns {string} - A string of words, one word for each byte.
   */
  static toWords(hexString) {
    if (hexString === null || hexString === undefined || typeof hexString !== 'string' || hexString === '') {
      return '';
    }

    hexString = hexString.toLowerCase();

    // Should not contain anything except 0-9a-f characters:
    if (hexString.match(/[^0-9a-f]/gi)) {
      throw new Error('The string must not contain any other ');
    }

    // If the hex string has an uneven number of characters, e.g. 15,
    // then add a leading zero:
    if (hexString.length % 2 === 1) {
      hexString = '0' + hexString;
    }

    // Split string into two-character chunks:
    let bytes = hexString.match(/.{2}/g);
    let result = [];
    for (let chunk of bytes) {
      result.push(words.data[chunk]);
    }

    return result.join(' ');
  }

  /**
   * Converts a space-separated list of words or array of words into a lowercase
   * hex string.
   * @param {string[]|string} words - An array of words (strings), or a space-
   * separated string.
   * @returns {string} A lowercase hex representation of the words.
   */
  static toHexString(words) {
    if (typeof words === 'string') {
      words = words
        .split(' ')
        // In case there were double spaces, remove them:
        .map(s => s.trim())
        .filter(s => s);
    }

    if (!Array.isArray(words)) {
      throw new Error('The input of toHexWords() should be an array or string.');
    }

    let hex = '';
    for (let word of words) {
      if (reverseWords.data[word]) {
        hex += reverseWords.data[word];
      } else {
        throw new Error('Wrong word: ' + word);
      }
    }

    return hex;
  }
}

module.exports = GuidToWords;