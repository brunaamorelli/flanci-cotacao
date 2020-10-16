//Bunyan Logger
import * as bunyan from 'bunyan';
//Environment
import { environment } from './environment';


export const logger  = bunyan.createLogger({
    name: environment.log.name,
    streams: [
        {
            level: 'debug',
            stream: process.stdout
        },
        {
            level: 'trace',
            path: 'flanci-cotacao-trace.log'
        }
    ],
    serializers: {
        req: bunyan.stdSerializers.req
    }
})