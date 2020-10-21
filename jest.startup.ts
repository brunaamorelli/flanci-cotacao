//Jest CLI
import * as jestCli from 'jest-cli';
//Environment
import { environment } from './common/environment';
//Server
import { Server } from './server/server';
//Cotacao
import { cotacoesRouter } from './cotacao/cotacao.router';
import { Cotacao } from './cotacao/cotacoes.model';

let server: Server

const beforeAllTests = () => {
    environment.db.url = process.env.DB_URL || environment.db.url
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