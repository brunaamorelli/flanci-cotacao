//FileSystem
import * as fs from 'fs';
//Restify
import * as restify from 'restify';
//Mongoose
import * as mongoose from 'mongoose';
//Environment
import { environment } from '../common/environment';
//Custom files
import { Router } from '../common/router';
import { handleError } from './error.handler';

export class Server {

    application: restify.Server

    //Método connect retorna uma Promise
    initDB(){
        return mongoose.connect(environment.db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

    initRoutes(routers: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try{

                const options: restify.ServerOptions = {
                    name: 'flanci-cotacao',
                    version: '1.0.0'
                }

                if(environment.security.enableHTTPS){
                    options.certificate = fs.readFileSync(environment.security.certificate),
                    options.key = fs.readFileSync(environment.security.key)
                }

                this.application = restify.createServer(options)

                //Plugins
                this.application.use(restify.plugins.queryParser())
                this.application.use(restify.plugins.bodyParser({
                    mapParams: true,
                    mapFiles: true
                }))

                //routes
                for(let router of routers){
                    router.applyRoutes(this.application)
                }

                this.application.listen(environment.server.port, () => {
                    resolve(this.application)
                })

                //Callback para tratar erros de maneira mais padronizada
                this.application.on('restifyError', handleError)

            }catch(error){
                reject(error)
            }
        })
    }

    

    bootstrap(routers: Router[] = []): Promise<Server>{
        return this.initDB().then(() => 
            this.initRoutes(routers).then(() => this)
        ) 
    }

    shutDown(){
        return mongoose.disconnect().then(() => this.application.close())
    }
}