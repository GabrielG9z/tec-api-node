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

    // Função para ler um aluno

function lerUm(id,res){
    const sql = "SELECT * FROM alunos WHERE id = ?";

    conexao.query(sql, id, (erro,resultados) => {
        
        //checando se existe conteúdo
        if(resultados.length === 0 ) {
            res.status(204).end();
            return;
        }
        // if erro ou resultado
        if(erro){
            res.status(400).json(erro.code);
        } else {
            res.status(200).json(resultados[0]); //Com o [], ele exibe o resultado dentro da matriz e sem o zero ele traz apenas o objeto.
        }
    })
}

// Inserindo alunos

function inserir(aluno, res) {

    // Caractere coringa ele adivinha os campos quais iremos inserir. Esse trecho "SET ?" estão vindo do MYSQL2 e a ? recebe os dados e atribui na ordem. Proteção contra injection e tratamento de strings vindos do módulo MYSQL2.
    const sql = "INSERT INTO alunos SET ?";

    conexao.query(sql, aluno, (erro) => {
    if(erro){
        res.status(400).json(erro.code); //400 = Requisição inválida e informa o código do erro.
    } else {
        res.status(201).json({"Status": "Aluno inserido"}); //201 = Criado e apresenta a mensagem aluno inserido ! 
    }
});

}

// ATUALIZAR Aluno
// Essa função vai receber um id, os dados aluno e res.
function atualizar(id, aluno, res) {
    const sql = "UPDATE alunos SET ? WHERE id = ?";

    // Para  passar maisde um parametro usamos o array. Dentro dele a ordem dos parametros importa muito, pois o ? fará o UPDATE do aluno primeiro, e depois alocará as mudanças ao ID.
    conexao.query(sql, [aluno, id], (erro, resultados) => {
        if (erro) {
            res.status(400).json(erro.code);
        } else {
            //res.status(200).json({"status" : "Atualizado com sucesso !"});

            // Spread operator (Operador de "espalhamento" de objeto)
            res.status(200).json( {...aluno, id} )
        }
    });
}

function excluir(id, res) {
const sql = "DELETE FROM alunos WHERE id = ?";

conexao.query(sql, id, (erro) => {
        if (erro) {
            res.status(400).json(erro.code);
        } else {
            res.status(200).json({"status" : "aluno excluído", id});
        }
    })
}

export {ler, inserir, lerUm, atualizar, excluir };