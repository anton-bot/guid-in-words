'use strict'

/**
 * @fileOverview Generates a random GUID and converts it into words. Also
 * converts any hex string into words, or words to hex string.
 */

const guid = require('node-uuid');
const words = require('./words.json');

class GuidToWords {
  constructor() { }

  /**
   * Generates a random GUID, converts it to words, and returns both.
   * @returns {object} An object containing a `guid` and `words`
   */
  static generate() {
    let random = guid().replace(/-/g, '');
    return {
      guid: random,
      words: GuidToWords.toWords(random),
    };
  }

  /**
   * 
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
      throw new Error('The string must not contain any other ')
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
      console.log(chunk + words.data[chunk]);
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

  }
}

module.exports = GuidToWords;