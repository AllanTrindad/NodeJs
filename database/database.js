const sequelize = require('sequelize')
//criando a conexao com o banco de dados
const connection = new sequelize('NodeJS_Udemy', 'node','toor',{
    host: '192.168.75.128',
    dialect: 'mysql'
});
module.exports = connection;