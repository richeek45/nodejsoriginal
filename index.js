const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

const server = http.createServer(function(req, res) {
  // Send the URL and parse it
  const parsedUrl = url.parse(req.url, true);
  //  Get the path
  const path = parsedUrl.pathname
  const trimmedPath = path.replace(/^\/+|\/+$/g,'')
  
  // Get the query string as an object
  const queryStringObject = parsedUrl.query;
  
  // get the HTTP method
  const method = req.method.toLowerCase()

  // Get the headers as an object
  const header = req.headers;

  // Get the payload, if any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', function(data) {
    buffer += decoder.write(data);
  })
  req.on('end', function() {
    buffer += decoder.end();

    // Choose the handler the request should go to. If one is not found use the not found handler
    const choosenHandler = typeof(router[trimmedPath]) !== undefined && router[trimmedPath] ? router[trimmedPath] : handlers.notFound
    console.log(choosenHandler, trimmedPath)
    // Construct the data object to send to the handler
    const data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'header': header,
      'payload': buffer
    }

    console.log(buffer)
    // Route the request to the handler specified in the router
    choosenHandler(data, function(statusCode, payload) {
      // Use the statusCode called back by the handler, or default to 200   
      statusCode = typeof(statusCode) === "number" ? statusCode : 200

      // Use the payload called back by the handler, default to an empty object
      payload = typeof(payload) === 'object' ? payload : {}

      // Convert the payload  to string   
      const payloadString = JSON.stringify(payload)

      // Return the response
      res.setHeader('Content-type', 'application/json')
      res.writeHead(statusCode);
      res.end(payloadString)

      // Log the request path
      console.log('Return the response : ', statusCode, payloadString)
    })
  })

})

server.listen(3000, function() {
  console.log('The server is listening on port 3000')
})

// Define the handlers
const handlers = {}

// Sample handler
handlers.sample = function(data, callback) {
  // Callback a http status code, and a payload object
  callback(406, {'name': "sample handler"}) 
}

// NotFound handler
handlers.notFound = function(data, callback) {
  callback(404)
}

// Define a request handler
const router = {
  'sample': handlers.sample
}

