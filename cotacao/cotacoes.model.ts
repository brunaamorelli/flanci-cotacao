//Mongoose
import * as mongoose from 'mongoose';
//UUID
import { v4 as uuidv4 } from 'uuid';
//Custom Validators
import { validateCNPJ } from '../common/validators';
//Custom Models
import { Reclamante, reclamanteSchema } from './reclamante.model';

export interface Cotacao extends mongoose.Document {
    uuid: string,
    tomadorCNPJ: string,
    tomadorRazaoSocial: string,
    modalidade: string,
    depositoRecursal: boolean,
    processoSubstituicao: boolean,
    tipoRecurso: string[],
    inicioVigencia: Date,
    vigencia: number,
    valorCobertura: number,
    reclamante: Reclamante,
    processo: string,
    localGarantia: string
    tribunal: string,
    idCliente: string,
    observacoes: string,
    emailRecebimento: string
    contrato: any
}

export interface CotacaoModel extends mongoose.Model<Cotacao>{
    findByUuid(uuid: string, projection?: string): Promise<Cotacao>
}


const cotacaoSchema = new mongoose.Schema({
    uuid: {
        //Gerar no backend
        type: String,
        unique: true
    },
    tomadorCNPJ: {
        type: String,
        required: true,
        validate: {
            validator: validateCNPJ,
            message: '{PATH}: Invalid CNPJ ({VALUE})'
        }
    },
    tomadorRazaoSocial: {
        type: String,
        required: true
    },
    modalidade: {
        type: String,
        required: true
    },
    depositoRecursal: {
        type: Boolean,
        required: false
    },
    processoSubstituicao: {
        type: Boolean,
        required: false
    },
    tipoRecurso: {
        type: [String],
        required: [function(){
            return this.depositoRecursal;
        }, 'Campo obrigatório caso campo depositoRecursal seja verdadeiro.'],
        validate: [function(val) {
            if(this.depositoRecursal && !this.processoSubstituicao){
                return val.length == 1;
            }
            return true
        }, 'Somente um tipo de recurso caso processoSubstituicao seja falso.']
    },
    inicioVigencia: {
        type: Date,
        required: true
    },
    vigencia: {
        type: Number,
        required: true
    },
    valorCobertura: {
        type: Number,
        required: true
    },
    reclamante: {
        type: reclamanteSchema,
        required: true
    },
    processo: {
        type: String,
        required: true
    },
    localGarantia: {
        type: String,
        required: true,
        enum: ['Tribunal', 'Vara']
    },
    tribunal: {
        type: String,
        required: true
    },
    idCliente: {
        type: String,
        required: false
    },
    observacoes: {
        type: String,
        required: false
    },
    emailRecebimento: {
        type: String,
        required: true,
        validate: [function(val){
            return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(val);
        }, 'E-mail mal formatado']

        
    },
    contrato: {
        type: Buffer,
        required: true
    }
})

//Método de associação com o model -> utilizamos STATICS
cotacaoSchema.statics.findByUuid = function(uuid: string, projection: string){
    return this.findOne({uuid}, projection)
}

cotacaoSchema.pre('save', function(next) {
    const cotacao: Cotacao = <Cotacao>this
    if(this.isNew){
        cotacao.uuid = uuidv4()
    }
    next()
})

//Cria o model para o mongoose
//1o argumento: nome da Collection
//2o argumento: schema
export const Cotacao = mongoose.model<Cotacao, CotacaoModel>('Cotacoes', cotacaoSchema)