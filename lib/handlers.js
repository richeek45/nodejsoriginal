/*
 * Request handlers 
 * 
 */

// Dependencies
const _data = require('./data')
const helpers = require('./helpers')

// Define the handlers
const handlers = {}

// Users
handlers.users = function(data, callback) {
  const acceptableMethods = ['post', 'get', 'put', 'delete'];
  if (acceptableMethods.indexOf(data.method) !== -1) {
    handlers._users[data.method](data, callback);
  } else {
    callback(405);
  }
}

// Containers for the users submethods
handlers._users = {}

// Users -> POST
// Required data -> firstName, lastName, phone, password, tosAgreement
// Optional data: none
handlers._users.post = function (data, callback) {
  // Check that all the required fields are filled out
  const firstName = typeof(data.payload.firstName) === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false
  const lastName = typeof(data.payload.lastName) === 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false
  const phone = typeof(data.payload.phone) === 'string' && data.payload.phone.trim().length === 0 ? data.payload.phone.trim() : false
  const password = typeof(data.payload.password) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false
  const tosAgreement = typeof(data.payload.tosAgreement) === 'boolean' && data.payload.tosAgreement === true ? true : false

  if (firstName && lastName && phone && password  && tosAgreement) {
    // Make sure that the user doesn't already exist
    _data.read('users', phone, function (err, data) {
      if (err) {
        // hash the password
        const hashedPassword = helpers.hash(password)

        // Create the user object


      } else {
        callback(400, {'Error' : 'A user with that number already exists!'})
      }
    })
  } else {
    callback(404, {'Error': 'Missing required fields'})
  }

};

// Users -> GET
handlers._users.get = function (data, callback) {

};
// Users -> PUT
handlers._users.put = function (data, callback) {

};
// Users -> DELETE
handlers._users.delete = function (data, callback) {

};




handlers.ping = function (data, callback) {
  callback(200)
}

// NotFound handler
handlers.notFound = function(data, callback) {
  callback(404)
}

module.exports = handlers