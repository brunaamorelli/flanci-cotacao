//Mongoose
import * as mongoose from 'mongoose';
//Custom Validators
import { validateCPF } from '../common/validators';

export interface Reclamante extends mongoose.Document {
    nome: string,
    cpf: string,
    cep: string,
    logradouro: string,
    numero: string,
    complemento: string,
    bairro: string,
    cidade: string,
    uf: string,
    telefone: string
}

export const reclamanteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        validate: {
            validator: validateCPF,
            message: '{PATH}: Invalid CPF ({VALUE})'
        }
    },
    cep: {
        type: String,
        match: /^\d{2}\.\d{3}\-\d{3}$/
    },
    logradouro: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    complemento: {
        type: String,
        required: false
    },
    bairro: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    uf: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        validate: [function(val){
            return /^(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/.test(val)
        }, 'Telefone deverá vir no formato (XX)XXXXX-XX ou (XX)XXXX-XX']
    }
}) 