//Restify Server
import { Server } from 'restify';
//Auth0
import * as auth0 from '../lib/auth0';
//FileSystem
import * as fs from 'fs';
//Router
import { ModelRouter } from '../common/model-router';
//Custom Model
import { Cotacao } from '../cotacao/cotacoes.model';

class CotacoesRouter extends ModelRouter<Cotacao> {

    constructor() {
        super(Cotacao);
    }

    findByUuid = (req, res, next) => {

        Cotacao.findByUuid(req.params.uuid)
            .then(cotacao => cotacao ? cotacao : false)
            .then(this.render(res, next))
            .catch(err => {
                req.log.debug({req: req}, 'Document not found. UUID: %s', req.params.uuid)
                next(err)
            })
    }

    save = (req, res, next) => {
        let cotacao = new Cotacao(req.body)

        cotacao.dataCotacao = new Date()
        if(req.files){
            cotacao.contrato = fs.readFileSync(req.files.contrato.path)
        }

        cotacao.save()
            .then(this.render(res, next))
            .catch(next)
    }

    applyRoutes(application: Server) {

        application.get(`/${this.basePath}`, [auth0(), this.findAll])
        application.get(`/${this.basePath}/:uuid`, [auth0(), this.validateUuid, this.findByUuid])
        application.post(`/${this.basePath}`, [auth0(), this.save])
    }
}

export const cotacoesRouter = new CotacoesRouter()