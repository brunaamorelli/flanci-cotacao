//Restify
import * as restify from 'restify';
import { NotFoundError } from 'restify-errors';

export abstract class Router {
    abstract applyRoutes(application: restify.Server)

    envelope(document: any): any{
        return document
    }

    envelopeAll(documents: any[], options): any{
        return documents
    }

    render(response: restify.Response, next: restify.Next){
        return (document => {
            if(document){
                response.json(this.envelope(document))
            }else{
                throw new NotFoundError('Document not found')
            }
            return next()
        })
    }

    renderAll(response: restify.Response, next: restify.Next, options: any = {}){
        return (documents: any[]) => {
            if(documents){
                documents.forEach((document, index, array) => {
                    array[index] = this.envelope(document)
                })
                response.json(this.envelopeAll(documents, options))
            }else{
                response.json(this.envelopeAll([], options))
            }
            return next()
        }
    }
}