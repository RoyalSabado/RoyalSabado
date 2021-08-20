const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let playersSchema = new Schema({
    jogadorId: {
        type: Number
    },
    nome: {
        type: String
    },
    sexo: {
        type: String
    },
    }, {
        collection: 'players'
    })
module.exports = mongoose.model('players', playersSchema)