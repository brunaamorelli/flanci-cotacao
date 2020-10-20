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
        name: 'flanci-cotacao-logger'
    },
    auth0: {
        auth0Domain: process.env.AUTH0_DOMAIN || 'flanci-hml-cotacoes.us.auth0.com',
        auth0Audience: process.env.AUTH0_AUDIENCE || 'https://flanci-hml-cotacoes.us.auth0.com/api/v2/',
        test: {
            token: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InQxM0tpUjFsQllMOXpoNzh0N0lGdSJ9.eyJpc3MiOiJodHRwczovL2ZsYW5jaS1obWwtY290YWNvZXMudXMuYXV0aDAuY29tLyIsInN1YiI6InZRd1ptUmFhN2x1Y052emVFOXV2ZDRTaW54bU9yU1lqQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2ZsYW5jaS1obWwtY290YWNvZXMudXMuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE2MDMxOTkwODIsImV4cCI6MTYwMzI4NTQ4MiwiYXpwIjoidlF3Wm1SYWE3bHVjTnZ6ZUU5dXZkNFNpbnhtT3JTWWoiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.o6qwSwhllYX_W5Bx5Cxn5sixF7lNpwC9SrO72uMsUmE_ESU4n-jnoPp-omvFIbZP0TQFoaVGnAsdmkcaFQ9wgZyyFiWQ73hOqdJizHIwpSkMApUxhJ8X8BzLaTf03B7UKmJnXxpOkNVdES7sYBN8mA2VGJeUYxenC_woyLSX6gu7HPy3wM7NRNztj2-daq0sTb5BhRpOUNUWLWyPbcjWZrED4M7X5ojBo4Zv_BcwTuIwo7aEBj_dlzwpD1SD8gFZoVQnwarVmXugg4BgmZouv1uJy9bpblMIxA1iRSybF1N0NUlGzcuSgBgKGx1XQ9Rvt_tvMnMEa5H8wgktnCbtQQ'
        }
    }
}