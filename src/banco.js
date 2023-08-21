import mysql from 'mysql2';

const conexao = mysql.createConnection({
    //Conexão local
    
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'escola'
    // host: 'srv28.prodns.com.br',
    // user: 'webmaio1_g9zass',
    // password: 'W!Dq(Of8dNLS',
    // database: 'webmaio1_bdescola2'
}); 

// Conectando ao banco de dados

//conexao.connect();

conexao.connect(erro => {
    if(erro) {
        console.error(`Erro ao conectar: ${erro.message}`);
    } else {
        console.log(`Banco conectado em: ${conexao.config.host}`);
    }
})

export default conexao;