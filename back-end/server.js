import express  from "express";
import banco from "./banco.js";
import cors from "cors";
import categoria from "./controller/Categoria.js";
import autor from "./controller/Autor.js";
import editora from "./controller/Editora.js";
import pessoa from "./controller/Pessoa.js";
import livro from "./controller/Livro.js";
import livroautor from "./controller/LivroAutor.js";
import emprestimo from "./controller/Emprestimo.js";

import colaborador from "./controller/Colaborador.js";
import veiculo from "./controller/Veiculo.js";
import funcionario from "./controller/Funcionario.js";

import usuario from "./controller/Usuario.js";
import produto from "./controller/Produto.js";

import "../back-end/model/Relacionamentos.js";


  try {
    await banco.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

const app = express();
app.use(express.json());
app.use(cors());

app.get('/teste', (request, response) => {
    response.status(200).send('Requisição recebida.');
});

app.post('/teste-parametros/:rp1/:rp2', (request, response) => {
    console.log('Route Params');
    console.log(request.params);

    console.log('Query Params');
    console.log(request.query);

    console.log('Body Params');
    console.log(request.body);

    console.log('Headers Params');
    console.log(request.headers);

    response.status(200).send(request.body.titulo);
});

app.get("/categoria", categoria.listar);
app.get("/categoria/:idcategoria", categoria.selecionar);
app.post("/categoria/", categoria.criar); //alterar no postgres o campo categoria da tabela Categoria para UNIQUE(não permitirá duplicar)
app.put("/categoria/:idcategoria", categoria.alterar);
app.delete("/categoria/:idcategoria", categoria.excluir);




app.get("/autor", autor.listar);
app.get("/autor/:idautor", autor.selecionar);
app.post("/autor/", autor.criar); //alterar no postgres o campo autor da tabela Autor para UNIQUE(não permitirá duplicar)
app.put("/autor/:idautor", autor.alterar);
app.delete("/autor/:idautor", autor.excluir);



app.get("/editora", editora.listar);
app.get("/editora/:ideditora", editora.selecionar);
app.post("/editora/", editora.criar); 
app.put("/editora/:ideditora", editora.alterar);
app.delete("/editora/:ideditora", editora.excluir);



app.get("/pessoa", pessoa.listar);
app.get("/pessoa/:idpessoa", pessoa.selecionar);
app.post("/pessoa/", pessoa.criar); 
app.put("/pessoa/:idpessoa", pessoa.alterar);
app.delete("/pessoa/:idpessoa", pessoa.excluir);



app.get("/livro", livro.listar);
app.get("/livro/:idlivro", livro.selecionar);
app.post("/livro/", livro.criar); 
app.put("/livro/:idlivro", livro.alterar);
app.delete("/livro/:idlivro", livro.excluir);
app.get("/livro/categoria/:idcategoria", livro.listarporcategorias);



app.get("/livroautor", livroautor.listar);
app.get("/livroautor/:idlivroautor", livroautor.selecionar);
app.post("/livroautor/", livroautor.criar);
app.put("/livroautor/:idlivroautor", livroautor.alterar);
app.delete("/livroautor/:idlivroautor", livroautor.excluir);




app.get("/emprestimo/selecionar/:idemprestimo", emprestimo.selecionar);
app.get("/emprestimo/todos", emprestimo.listarTodos);
//app.post("/emprestimo/", emprestimo.criar); 
app.put("/emprestimo/:idemprestimo", emprestimo.alterar);
//app.delete("/emprestimo/:idemprestimo", emprestimo.excluir);


app.get("/emprestimo/pendentes", emprestimo.listarpendentes);
app.post("/emprestar", emprestimo.emprestar);
app.put("/devolver", emprestimo.devolver);
app.get("/emprestimo/pessoa/:idpessoa", emprestimo.listarporpessoa);

app.get("/emprestimo/atrasados", emprestimo.listarAtrasados);
app.post("/emprestimo/marcar-atrasados", emprestimo.marcarEmprestimosAtrasados);


//app.post('/emprestimo/emprestar', emprestimo.emprestar);
//app.put('/emprestimo/devolver', emprestimo.devolver);
//app.get('/listar/emprestimos/pendentes', emprestimo.listarEmprestimosPendentes);
//app.get('/listar/emprestimos/pessoa/:idpessoa', emprestimo.listarHistoricoPessoa);

//app.post("/emprestimo/emprestar/", emprestimo.emprestar); 
//ajustar referencia bidirecional, ou seja, o modelo emprestimo deve estar associado ao modelo livro e vice-versa. 

//app.post("/emprestimo/devolver", emprestimo.devolver); 


//Avaliação - Inicio
app.get("/colaborador", colaborador.listar);
app.get("/colaborador/:idcolaborador", colaborador.selecionar);
app.post("/colaborador/", colaborador.criar); 
app.put("/colaborador/:idcolaborador", colaborador.alterar);
app.delete("/colaborador/:idcolaborador", colaborador.excluir);

app.get("/funcionario", funcionario.listar);
app.get("/funcionario/:idfuncionario", funcionario.selecionar);
app.post("/funcionario/", funcionario.criar); 
app.put("/funcionario/:idfuncionario", funcionario.alterar);
app.delete("/funcionario/:idfuncionario", funcionario.excluir);

app.get("/veiculo", veiculo.listar);
app.get("/veiculo/:idveiculo", veiculo.selecionar);
app.post("/veiculo/", veiculo.criar); 
app.put("/veiculo/:idveiculo", veiculo.alterar);
app.delete("/veiculo/:idveiculo", veiculo.excluir);
//Avaliação - Fim

// Rotas de autenticação
app.post("/auth/registrar", usuario.registrar);
app.post("/auth/login", usuario.login);
app.post("/auth/google", usuario.loginGoogle);
app.post("/auth/apple", usuario.loginApple);
app.get("/auth/perfil", usuario.verificarToken, usuario.perfil);
app.get("/usuarios", usuario.verificarToken, usuario.verificarAdmin, usuario.listar);

// Rotas de produtos
app.get("/produtos", produto.listar);
app.get("/produtos/:idproduto", produto.selecionar);
app.post("/produtos", usuario.verificarToken, usuario.verificarAdmin, produto.criar);
app.put("/produtos/:idproduto", usuario.verificarToken, usuario.verificarAdmin, produto.alterar);
app.delete("/produtos/:idproduto", usuario.verificarToken, usuario.verificarAdmin, produto.excluir);
app.get("/produtos/categoria/:categoria", produto.listarPorCategoria);

app.listen(5000);