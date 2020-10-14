//Jest CLI
import * as jestCli from 'jest-cli';
//Arquivos a serem modificados no método beforeAll para utilizarem o ambiente de teste
import { Server } from './server/server';
import { environment } from './common/environment';
import { cotacoesRouter } from './cotacao/cotacao.router';
import { Cotacao } from './cotacao/cotacoes.model';

let server: Server

const beforeAllTests = () => {
    environment.db.url = process.env.DB_URL || 'mongodb+srv://flanci-cotacao:HSbrqkugMYpiRRfMsoe@licitacao.iwaja.mongodb.net/aeronautica-test-db?retryWrites=true&w=majority'
    environment.server.port = process.env.SERVER_PORT || 3001
    environment.security.enableHTTPS = process.env.ENABLE_HTTPS || false
    server = new Server()
    return server.bootstrap([cotacoesRouter])
        .then(() => Cotacao.deleteMany({}).exec())
        .catch(console.error)
}

const afterAllTests = () => {
    return server.shutDown()
}

beforeAllTests()
    .then(() => jestCli.run())
    .then(() => afterAllTests())
    .catch(console.error)