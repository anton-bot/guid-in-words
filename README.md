# Convert a hash or GUID to human-readable words #

## Quick example ##

```js
const HexToWords = require('guid-in-words');

// Outputs:
// "same clear voice happen security sign feel option finger debate almost popular young party public easy"
HexToWords.toWords('159c1abd31af380fa31733f06eed89b8');

// Outputs "159c1abd31af380fa31733f06eed89b8":
HexToWords.toHexString('same clear voice happen security sign feel option finger debate almost popular young party public easy');
```

## Idea ##

Hashes, GUIDs or other long hex strings are difficult to read and copy for humans.

Instead, you can present a hash, GUID, password or recovery phrase as a sequence
of human-readable words.

This module is using a small dictionary of 256 common words that do not have
strongly negative connotations (such as "death" or "catastrophe"). Since the
dictionary is small, you can easily review it in the source code. On the other
hand, this has a disadvantage of having too many words: one GUID or
MD5 hash is reprented by 16 words.

## Methods ##

All methods in the class are static.

### Converters ###

- `toWords(hexString)` - converts a hex string to words. The string can be 
uppercase hex ('48D7A7') or lowercase hex ('48d7a7'). Empty string is returned
if the input is null, undefined, empty string or not a string. An exception is
thrown if the string contains illegal characters (anythng except 0-9a-f).
- `toHexString(words)` - converts a sequence of words into a lowercase hex
string. `words` can be an array of strings or a string containing space-separated
words. Throws an exception if the input is not an array or string, or if a
word that is not in the dictionary.

### GUID and hashes ###

- `randomGuid()` - generates a random GUID (lowercase, no dashes), converts it
to words and returns both as an object containing `guid` and `words` as a string.
- `md5(string), sha256(string)` - generates a hash of the given string, and
returns both as an object containing `hash` and `words`.

```js
const HexToWords = require('guid-in-words');

HexToWords.md5('test');
/* Returns:
{ hash: '098f6bcd4621d373cade4e832627b4f6',
  words: 'represent commercial watch product necessary provide final mind trade identify idea occur mother nature leader agreement' }
*/

HexToWords.randomGuid();
/* Returns:
{ guid: 'e17b0f7f102c4c16b0dbe1e79e2912b6',
  words: 'key fill option economy year rule sport newspaper future enjoy key strong describe plant beat especially' }
*/

```

## Feedback ##

Reports, suggestions and pull requests are welcome on Github.