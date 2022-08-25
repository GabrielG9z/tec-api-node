import conexao from './banco.js';


// Criando o CRUD


// Função para ler o banco de dados
function ler(res){


const sql = "SELECT * FROM alunos ORDER BY nome";

// Conectando  ao Banco de dados.
conexao.query(sql, (erro, resultados) =>{
    if (resultados.length === 0) {
        res.status(204).end(); // 204 = Sem conteúdo. O método .end() para qualquer comunicação.
        return; //die
    }

    if(erro) {
        res.status(400).json(erro.code);  // 400 BAD Request - requisição inválida
    } else {
        res.status(200).json(resultados); //200 OK - Tudo certo, exibir os resultados
    }
} )

}

export {ler};