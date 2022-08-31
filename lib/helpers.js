/**
 * Helpers for various tasks
 * 
 */

// Dependencies
const crypto = require('crypto');
const config = require('../config');

// Container for all the helpers 
const helpers = {}

// Create a SHA256 hash
helpers.hash = function (str) {
  if (typeof(str) === 'string' && str.length > 0) {
    const hash = crypto.createHmac('sha256', config.HASHING_SECRET).update(str).digest('hex');
    return hash
  } else {
    return false
  }
}


// Export the module
module.exports = helpers
