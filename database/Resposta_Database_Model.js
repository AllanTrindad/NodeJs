const sequelize = require('sequelize');
const connection = require('./database');

const Resposta = connection.define("Respostas",{
    corpo:{
        type: sequelize.TEXT, // TEXT texto longo STRING texto curto
        allowNull: false
    },
    perguntaId:{
        type: sequelize.INTEGER,
        allowNull: false
    }

});

Resposta.sync({force: false}).then(() =>{}); // sincronizando com DB e não forçando a criação da tabela caso ja exista

module.exports = Resposta; // exportando o módulo Resposta