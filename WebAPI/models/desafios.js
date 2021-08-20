const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let playersSchema = new Schema({
    desafioId: {
        type: String
    },
    descricao: {
        type: String
    },
    grupo: {
        type: Number
    },
    pagamento: {
        type: Number
    },
    situacao: {
        type: Number
    },
    }, {
        collection: 'players'
    })
module.exports = mongoose.model('players', playersSchema)