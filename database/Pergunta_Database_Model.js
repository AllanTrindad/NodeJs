//Um Model é: É uma estrutura de dados que representa minha tabela do Banco de Dados
const sequelize = require('sequelize');
const connection = require('./database');

const Model = connection.define('perguntas',{
    titulo:{
        type: sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: sequelize.TEXT,
        allowNull: false
    }
});

Model.sync({force: false}).then(()=>{});

module.exports = Model; // exportando a variavel Model que contem as funcoes do sequelize