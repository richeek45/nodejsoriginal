/**
 * Create and export configuration variables
 * 
 */

// Containers for all the environments
const environments = {}

// Staging environments (default)
environments.staging = {
  'PORT': 3000,
  'ENV_NAME': 'staging'
}

// Production environment
environments.production = {
  'PORT': 5000,
  'ENV_NAME': 'production'
}

const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : ''

const envToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging

module.exports = envToExport