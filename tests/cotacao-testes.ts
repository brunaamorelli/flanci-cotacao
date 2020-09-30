//FileSystem
import * as fs from 'fs';

const contrato = fs.readFileSync('./tests/files/contrato.docx', 'utf-8');

export const cotacaoTesteSuccess = {
    tomadorCNPJ: "02.471.574/0001-73",
    tomadorRazaoSocial: "Flanci Corretora de Seguros",
    modalidade: "Judicial Trabalhista e Recursal",
    depositoRecursal: true,
    processoSubstituicao: false,
    tipoRecurso: [
        "Embargos no TST"
    ],
    inicioVigencia: "2016-05-18T16:00:00Z",
    vigencia: 3,
    valorCobertura: 3000,
    reclamante: {
        nome: "Felipe Monteiro",
        cpf: "222.222.222-22",
        cep: "22.210-050",
        logradouro: "Rua Correa Dutra",
        numero: "90",
        complemento: "Cobertura",
        bairro: "Flamengo",
        cidade: "Rio de Janeiro",
        uf: "RJ",
        telefone: "(21)99999-9999"
    },
    processo: "12234.3553.3534554/2019",
    localGarantia: "Tribunal",
    tribunal: "TJRJ",
    idCliente: "45678910",
    observacoes: "bla bla bla",
    emailRecebimento: "felipe@yahoo.com",
    contrato: contrato
}