const jwt = require('../lib/restify-jwt');
const jwksRsa = require('jwks-rsa');
const env = require('../common/environment')

const tokenGuard = jwt({
  // Fetch the signing key based on the KID in the header and
  // the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true, 
    jwksUri: `https://${env.environment.auth0.auth0Domain}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: env.environment.auth0.auth0Audience,
  issuer: `https://${env.environment.auth0.auth0Domain}/`,
  algorithms: ['RS256']
});

module.exports = function () {
  return function mid(req, res, next) {
    tokenGuard(req, res, (err) => {
      err ? res.status(500).send(err) : next();
    });
  }
};