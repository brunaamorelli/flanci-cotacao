//Restify Server
import { Server } from './server/server';
//Custom Routers
import { indexRouter } from './index-router';
import { cotacoesRouter } from './cotacao/cotacao.router';

const server = new Server()

server.bootstrap([indexRouter, cotacoesRouter])
    .then(server => console.log('Server is listening :', server.application.address()))
    .catch(error => {
        console.log('Server failed to start')
        console.error(error)
        process.exit(1)
    })





