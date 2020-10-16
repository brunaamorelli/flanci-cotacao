//Restify Server
import { Server } from 'restify';
//FileSystem
import * as fs from 'fs';
//Router
import { ModelRouter } from '../common/model-router';
//Custom Model
import { Cotacao } from '../cotacao/cotacoes.model';
import { logger } from '../common/logger';

class CotacoesRouter extends ModelRouter<Cotacao> {

    constructor() {
        super(Cotacao);
    }

    findByUuid = (req, res, next) => {

        Cotacao.findByUuid(req.params.uuid)
            .then(cotacao => cotacao ? cotacao : false)
            .then(this.render(res, next))
            .catch(next)
    }

    save = (req, res, next) => {
        
        let cotacao = new Cotacao(req.body)

        if(req.files){
            cotacao.contrato = fs.readFileSync(req.files.contrato.path)
        }

        cotacao.save()
            .then(this.render(res, next))
            .catch(next)
    }

    applyRoutes(application: Server) {

        application.get(`/${this.basePath}`, this.findAll)
        application.get(`/${this.basePath}/:uuid`, [this.validateUuid, this.findByUuid])
        application.post(`/${this.basePath}`, this.save)
    }
}

export const cotacoesRouter = new CotacoesRouter()