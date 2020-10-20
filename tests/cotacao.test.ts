//Jest
import 'jest';
//Supertest
import * as request from 'supertest';
//Objetos de Teste
import { cotacaoTesteSuccess } from './cotacao-testes';
//Environmet variables
import {environment} from '../common/environment';


let address: string = (<any>global).address
let uuid: string


test('GET /cotacoes', () => {
    return request(address)
        .get('/cotacoes')
        .set('Authorization', environment.auth0.test.token)
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body.items).toBeInstanceOf(Array)
            expect(response.body._info).toBeDefined()
        })
        .catch(fail)
})

test('POST /cotaoes', () => {
    return request(address)
        .post('/cotacoes')
        .set('Authorization', environment.auth0.test.token)
        .send(cotacaoTesteSuccess)
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body._id).toBeDefined()
            expect(response.body.uuid).toBeDefined()
            expect(response.body.tomadorCNPJ).toBe(cotacaoTesteSuccess.tomadorCNPJ)
            expect(response.body.tomadorRazaoSocial).toBe(cotacaoTesteSuccess.tomadorRazaoSocial)
            expect(response.body.reclamante.nome).toBe(cotacaoTesteSuccess.reclamante.nome)
            uuid = response.body.uuid
        })
        .catch(fail)
})


test('GET /cotacoes/:uuid - not found', () => {
    return request(address)
        .get(`/cotacoes/${uuid}`)
        .set('Authorization', environment.auth0.test.token)
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body.uuid).toBe(uuid)
            expect(response.body.tomadorCNPJ).toBe(cotacaoTesteSuccess.tomadorCNPJ)
            expect(response.body.tomadorRazaoSocial).toBe(cotacaoTesteSuccess.tomadorRazaoSocial)
            expect(response.body.reclamante.nome).toBe(cotacaoTesteSuccess.reclamante.nome)
        })
        .catch(fail)
})

test('GET /cotacoes/aaaa - not found', () => {
    return request(address)
        .get('/cotacoes/aaaa')
        .set('Authorization', environment.auth0.test.token)
        .then(response => {
            expect(response.status).toBe(404)
        })
        .catch(fail)
})

test('GET /cotacoes- Unauthorized Resource', () => {
    return request(address)
        .get('/cotacoes')
        .then(response => {
            expect(response.status).toBe(401)
        })
        .catch(fail)
})

test('GET /cotacoes/:uuid -  Unauthorized Resource', () => {
    return request(address)
        .get(`/cotacoes/${uuid}`)
        .then(response => {
            expect(response.status).toBe(401)
        })
        .catch(fail)
})

test('POST /cotaoes- Unauthorized Resource', () => {
    return request(address)
        .post('/cotacoes')
        .send(cotacaoTesteSuccess)
        .then(response => {
            expect(response.status).toBe(401)
        })
        .catch(fail)
})