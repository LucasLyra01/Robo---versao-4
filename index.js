const IQOption = require('./lib');
const { log, sleep } = require('./utils');
const readlineSync = require('readline-sync');
const random = require('random');

let direcao = null;

real_practice = "PRACTICE"

// var email_digitado = readlineSync.questionEMail('Digite o email: ')
// var senha_digitada = readlineSync.question("Digite a senha: ")

let logado = false;

const email_digitado = ""
const senha_digitada = ""

// var paridades = readlineSync.question('Digite o par: ')
// var paridades = paridades.toUpperCase();
// const paridades = [
//     'AUDUSD', 'EURAUD', 'EURCAD', 
//     'EURGBP', 'EURJPY', 'EURUSD', 
//     'GBPAUD', 'GBPCAD', 'GBPCHF', 
//     'GBPJPY', 'GBPUSD', 'AUDCAD',
//     'AUDJPY', 'USDCHF', 'USDCAD',
// ]

const paridades = [
    'EURUSD-OTC', 'NZDUSD-OTC'
]

// var dias = readlineSync.question('Quantos dias que deseja analisar: ')
// var timeframe = readlineSync.question('Digite o timeframe: ');
const dias = 10;
const porcentagem = 80;
const timeframe = 5;

porc_call = porcentagem
porc_put = (100 - porcentagem)


IQOption({
    email: email_digitado,
    password: senha_digitada

    }).then(async API => {

    

        logado = true;

        console.log("Logado com sucesso");

        API.setBalance(real_practice);

        dados_conta = await API.getBalance(real_practice);
        moeda = dados_conta['currency'];
        valor_banca = dados_conta['amount']
        console.log(moeda, valor_banca);

        if (logado === true){

            operando(API)

        }


        }).catch(error =>{
        console.error(error);
})

async function operando(API){

    try {
        var velas = await API.getCandles("EURUSD", (timeframe * 60), 10, Date.now())

        for (var x in velas){

            let abertura = velas[x]['open'];
            let fechamento = velas[x]['close']
            let hora_abertura = velas[x]['from']
            
            var horario = new Date(hora_abertura * 1000);
            var horario = horario.toLocaleTimeString();

            console.log(velas[x]['open'] + " ---> " + horario);       

        }

    } catch (error) {
        
    }

}