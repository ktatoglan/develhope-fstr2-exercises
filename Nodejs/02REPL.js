const crypto = require('crypto');
function generateRandomId(length) {
  return crypto.randomBytes(length).toString('hex');
}
const randomId = generateRandomId(3);
console.log('Random ID:', randomId);