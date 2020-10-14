//Bunyan Logger
import * as bunyan from 'bunyan';
//Environment
import { environment } from './environment';


export const logger  = bunyan.createLogger({
    name: environment.log.name,
    level: (<any>bunyan).resolveLevel(environment.log.level)
})