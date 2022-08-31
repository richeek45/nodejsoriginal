/**
 * Create and export configuration variables
 * 
 */

// Containers for all the environments
const environments = {}

// Staging environments (default)
environments.staging = {
  'HTTP_PORT': 3000,
  'HTTPS_PORT': 3001,
  'ENV_NAME': 'staging',
  'HASHING_SECRET': 'thisIsASecret'
}

// Production environment
environments.production = {
  'HTTP_PORT': 5000,
  'HTTPS_PORT': 5001,
  'ENV_NAME': 'production',
  'HASHING_SECRET': 'thisIsAlsoASecret'
}

const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : ''

const envToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging

module.exports = envToExport