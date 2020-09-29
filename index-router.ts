//Restify Server
import { Server } from 'restify';
//Router
import { Router } from './common/router';

class IndexRouter extends Router {

    indexRoutes = {
        cotacoes: `/cotacoes`
    }

    applyRoutes(application: Server) {
        application.get('/', (req, res, next) => {
            res.json(this.indexRoutes)
            return next()
        })
    }
}

export const indexRouter = new IndexRouter();