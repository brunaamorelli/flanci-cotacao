export const environment = {
    server: { port: process.env.SERVER_PORT || 3000},
    db: {
        url: process.env.DB_URL || 'mongodb+srv://flanci-cotacao:HSbrqkugMYpiRRfMsoe@licitacao.iwaja.mongodb.net/Aeronautica?retryWrites=true&w=majority'
    }
}