const jwt = require('../lib/restify-jwt');
const jwksRsa = require('jwks-rsa');
const environment = require('../common/environment')

const tokenGuard = jwt({
  // Fetch the signing key based on the KID in the header and
  // the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksUri: `https://flanci-hml-cotacoes.us.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'https://flanci-hml-cotacoes.us.auth0.com/api/v2/',
  issuer: `https://flanci-hml-cotacoes.us.auth0.com/`,
  algorithms: ['RS256']
});

module.exports = function () {
  return function mid(req, res, next) {
    tokenGuard(req, res, (err) => {
      err ? res.status(500).send(err) : next();
    });
  }
};