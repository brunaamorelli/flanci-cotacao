export const environment = {
    server: { port: process.env.SERVER_PORT || 3000},
    db: {
        url: process.env.DB_URL || 'mongodb+srv://flanci-cotacao:HSbrqkugMYpiRRfMsoe@licitacao.iwaja.mongodb.net/Aeronautica?retryWrites=true&w=majority'
    },
    security: {
        enableHTTPS: process.env.ENABLE_HTTPS || true,
        certificate: process.env.CERT_FILE || './security/keys/cert.pem',
        key: process.env.CERT_KEY_FILE || './security/keys/key.pem'
    },
    log: {
        level: process.env.LOG_LEVEL || 'debug',
        name: 'flanci-cotacao-logger'
    }
}