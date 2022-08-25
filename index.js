import express from "express";
import { ler }  from "./src/aluno.js";

const app = express();
const porta = 3000;

//Configurando suporte ao JSON
app.use(express.json());

//Configurando suporte a dados de inputs de formulários
app.use(express.urlencoded({extended : true}));

//Configurando o servidor

app.listen(porta,() => {
    console.log('Funfooou');
});

//ROTAS

//Rota (endpoint) para a raiz da API.
app.get('/', (req,res) => {
    res.send(`É um dia lindo para aprender sobre APIs`);
});

//Rota (endpoint)
app.get('/alunos', (req,res) => {
//   res.send(`Exibindo TODOS os alunos`);
    ler(res);
});

//Rota (endpoint) para exibir um único aluno
app.get('/alunos/:id', (req, res) =>{
    res.send(`Exibindo dados de UM aluno.`);
});


//Rota (endpoint) para cadastrar um  aluno
app.post('/alunos/:', (req, res) => {
    res.send(`CADASTRANDO um aluno`);
})

//ROTA (endpoint) para atualizar ALGUNS/TODOS os dados do aluno

app.put('/alunos/:id', (req,res) =>{
    res.send(`ATUALIZA alunos`)
})

app.patch('/alunos/:id', (req,res) => {
    res.send(`ATUALIZA alguns dados`)
})

//Rota (endpoint) para EXCLUIR aluno

app.delete('/alunos/:id', (req,res) =>{
    res.send(`EXCLUI aluno`)
})