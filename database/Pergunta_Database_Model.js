//Um model é: É uma estrutura de dados que representa minha tabela do Banco de Dados
const sequelize = require('sequelize');
const connection = require('./database');

const model = connection.define('perguntas',{
    titulo:{
        type: sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: sequelize.TEXT,
        allowNull: false
    }
});

model.sync({force: false}).then(()=>{});

module.exports = model;