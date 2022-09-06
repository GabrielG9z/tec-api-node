import express from "express";
import cors from "cors";
import { ler, inserir, lerUm, atualizar, excluir }  from "./src/aluno.js";

const app = express();

//process.env busca a porta que a hospedagem destinou para o banco 

const porta = process.env.PORT || 3000;


//Configurando requisições de diferentes origens.
app.use(cors())

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
    res.send(`<h1> É um dia lindo para aprender sobre APIs </h1>`);
});

//Rota (endpoint)
app.get('/alunos', (req,res) => {
//   res.send(`Exibindo TODOS os alunos`);
    ler(res);
});

//Rota (endpoint) para exibir um único aluno
app.get('/alunos/:id', (req, res) =>{
    //res.send(`Exibindo dados de UM aluno.`);

    const id = parseInt(req.params.id);
    lerUm(id, res);
});


//Rota (endpoint) para cadastrar um  aluno
app.post('/alunos/:', (req, res) => {
    // Capturando os dados apartir do corpo da requisição
    const novoAluno = req.body;

    // Executando a função inserir e passando os parâmetros novoAluno e res.
    inserir(novoAluno, res);
   // res.send(`CADASTRANDO um aluno`);
})

//ROTA (endpoint) para atualizar ALGUNS/TODOS os dados do aluno

app.put('/alunos/:id', (req,res) =>{
    res.send(`ATUALIZA alunos`)
})

app.patch('/alunos/:id', (req,res) => {
    // res.send(`ATUALIZA alguns dados`)

    //Capturar o id
    const id = parseInt(req.params.id);
    
    //Dados do aluno
    const aluno = req.body;

    atualizar(id, aluno, res);
})

//Rota (endpoint) para EXCLUIR aluno

app.delete('/alunos/:id', (req,res) =>{
   // res.send(`EXCLUI aluno`)
   const id = parseInt(req.params.id);

   const aluno = req.body;

   excluir(id, res)
})