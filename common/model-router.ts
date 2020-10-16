//Restify
import { NotFoundError } from 'restify-errors';
//Mongoose
import * as mongoose from 'mongoose';
//UUID
import { validate as uuidValidate } from 'uuid';
//Router
import { Router } from './router';

export abstract class ModelRouter<D extends mongoose.Document> extends Router {

    basePath: string


    constructor(protected model: mongoose.Model<D>) {
        super()
        this.basePath = this.model.collection.name
    }

    envelope(document: any): any {
        let resource = Object.assign({ _links: {} }, document.toJSON())

        resource._links.self = `/${this.basePath}/${resource.uuid}`
        return resource
    }

    envelopeAll(documents: any[], options: any): any {
        const resource: any = {
            _links: {
                self: `${options.url}`
            },
            _info:{},
            items: documents
        }

        if (options.page && options.count && options.pageSize) {

            resource._info.totalItems = options.count
            resource._info.page = options.page
            resource._info.itemsPerPage = options.pageSize

            if (options.page > 1) {
                resource._links.prev = `/${this.basePath}?_page=${options.page - 1}&_pageSize=${options.pageSize}`
            }

            const remaining = options.count - ((options.page) * options.pageSize)

            if( remaining > 0){
                resource._links.next = `/${this.basePath}?_page=${options.page + 1}&_pageSize=${options.pageSize}`
            }
            
        } 
        return resource
    }

    validateUuid = (req, res, next) => {
        
        if (!uuidValidate(req.params.uuid)) {
            req.log.error({req: req}, 'Invalid uuid: %s', req.params.uuid)
            next(new NotFoundError('Document not found'))
        } else {
            next()
        }
    }

    findAll = (req, res, next) => {

        let page = parseInt(req.query._page || 1)
        let pageSize = parseInt(req.query._pageSize || 4)

        page = page > 0 ? page : 1

        const skip = (page - 1) * pageSize

        this.model.countDocuments({}).exec()
            .then(count => {
                this.model.find()
                    .skip(skip)
                    .limit(pageSize)
                    .then(this.renderAll(res, next, { page, count, pageSize, url: req.url }))
            })
            .catch(next)
    }

    save = (req, res, next) => {
        let document = new this.model(req.body)

        document.save()
            .then(this.render(res, next))
            .catch(err => {
                req.log.error({req: req}, 'Failed to save cotacao.')
                next(err)
            })
    }
}