import estoqueDb, {
    salvarNoBanco,
    mostrarEstoque,
    passarInfosForm,

}from "../estoque-modules.js";


export const dbestoque = estoqueDb("EstoqueDb", {
   estoque:`++id, nomeProduto, quantidade, precoUnitario`
})

//inputs 
const $idProduto = document.getElementById('idProduto');
const $nomeProduto = document.getElementById('nomeProduto');
const $quantidadeProduto = document.getElementById('quantidadeProduto');
const $precoProduto = document.getElementById('precoProduto');

//buttons
const $salvarProduto = document.getElementById('salvarEstoque');
const $verEstoque = document.getElementById('verEstoque');
const $alterarEstoque = document.getElementById('alterarEstoque');
const $deletarEstoque = document.getElementById('deletarEstoque');

const $editbtn = document.getElementById('btnedit');

// //inserindo valores usando o botao de salvar
$salvarProduto.addEventListener('click', () =>{
    let flag = salvarNoBanco(dbestoque.estoque, {
        nomeProduto: $nomeProduto.value,
        quantidade: $quantidadeProduto.value,
        precoUnitario: $precoProduto.value
    })
    
    console.log(flag);

    $nomeProduto.value = "";
    $quantidadeProduto.value = "";
    $precoProduto.value = "";
})

$alterarEstoque.addEventListener('click', ()  =>{
    const id = parseInt($idProduto.value || 0);

    dbestoque.estoque.update(id,{
        nomeProduto: $nomeProduto.value,
        quantidade: $quantidadeProduto.value,
        precoUnitario: $precoProduto.value
    }).then((atualizado) =>{
         let status = atualizado ? 'dados atualizados.' : 'não foi possivel atualizar o registro.';
         console.log(status);
         mostrarEstoque(dbestoque.estoque)
    })
})
  

$verEstoque.addEventListener('click', () =>{
    mostrarEstoque(dbestoque.estoque);
})

// //consertar o input de id e seus metodos para poder atualizar e excluir