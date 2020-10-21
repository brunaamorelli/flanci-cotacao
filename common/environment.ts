export const environment = {
    server: { port: process.env.SERVER_PORT || 3000},
    db: {
        url: process.env.DB_URL || '<MONGODB_URL>'
    },
    security: {
        enableHTTPS: process.env.ENABLE_HTTPS || true,
        certificate: process.env.CERT_FILE || './security/keys/cert.pem',
        key: process.env.CERT_KEY_FILE || './security/keys/key.pem'
    },
    log: {
        name: 'flanci-cotacao-logger'
    },
    auth0: {
        auth0Domain: process.env.AUTH0_DOMAIN || '<AUTH0_DOMAIN>',
        auth0Audience: process.env.AUTH0_AUDIENCE || '<AUTH0_AUDIENCE>',
        test: {
            token: '<AUTH0_TOKEN_TEST>'
        }
    }
}