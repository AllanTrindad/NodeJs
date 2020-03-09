//Index do arquivo principal da aplicação
const express = require("express");
const app = express();
const bodyparser = require("body-parser"); // para conseguir receber os dados do front e trabalhar no back
const connection = require('./database/database') // importa o arquivo de database para que possamos criar,deletar e fazer tudo com o banco
const model = require('./database/Pergunta_Database_Model')// importa o database model

//Configuracao do database
connection
    .authenticate()
    .then(() =>{
        console.log('Conexao feita com o banco de dados!');
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

app.set('view engine','ejs');
app.use(express.static("public"));

//configuracao body-parser para conseguir receber os dados do front-end aqui no back-end
app.use(bodyparser.urlencoded({extended: false}));
//trabalhar com os dados em json, provavelmente com API REST
app.use(bodyparser.json());

//Minha rota Raiz
app.get("/",function(req, res){
    model.findAll({raw: true, order:[
        ['id','DESC'] // Ordenando por decrescente <== do maior para o menor, ASC == Crescente <== do menor pro maior
    ]}).then(dados_do_banco_raw =>{ //findALL tras tudo do banco e o método raw trás somente as informacoes das colunas
    // como eu só tenho uma tabela eu nao preciso me preocupar em definir quais os dados e quais tabelas eu quero a informação
        res.render("index",{ // nome do arquivo que vai ser renderizado. Os arquivos de .ejs devem estar obrigatoriamente dentro da pasta views
        dados_do_banco: dados_do_banco_raw // a variavel dados_do_banco recebe o valor da variavel em raw, que veio to findALL
    });
    });
}); 

//Rota da pagina de perguntas
app.get("/perguntar",function(req,res){
    res.render("perguntar",{ //nome do arquivo ejs que faz o front-end

    });
});
// essa rota recebe os dados enviados pelo formulario de perguntas e respostas
app.post("/salvarpergunta", function(req, res){
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    model.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/pagina-perguntas/:id", function(req, res){
    var id = req.params.id;
    model.findOne({    //fazendo a pesquisa no banco por um unico valor
        where: {id: id}, //comparando se o valor id recebido se encontra no DB\
    }).then(pergunta =>{
        if (pergunta != undefined) { 
            res.render("./pag_perguntas")
        }else{
            res.redirect("/")
        }
});
});

//subindo o servidor com Express
app.listen(3000, function(erro){
    if(erro){
        console.log("Deu Ruim no servidor..");

    }else{
        console.log("Servidor iniciado com sucesso..");
    }
});

// Outra maneira de incializar o servidor
//app.listen(3000, ()=>{console.log("App inicializado com Sucesso!!...");});