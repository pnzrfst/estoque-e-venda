import estoqueDb, {
    salvarNoBanco,
    mostrarEstoque,
    passarInfosForm,

}from "./estoque-modules.js";


const db = estoqueDb("EstoqueDb", {
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

//inserindo valores usando o botao de salvar
$salvarProduto.onclick = (event) =>{
    let flag = salvarNoBanco(db.estoque, {
        nomeProduto: $nomeProduto.value,
        quantidade: $quantidadeProduto.value,
        precoUnitario: $precoProduto.value
    })
    
    console.log(flag);

    $nomeProduto.value = "";
    $quantidadeProduto.value = "";
    $precoProduto.value = "";
}

$alterarEstoque.onclick = () => {
   const id = parseInt($idProduto.value || 0);

   db.estoque.update(id,{
       nomeProduto: $nomeProduto.value,
       quantidade: $quantidadeProduto.value,
       precoUnitario: $precoProduto.value
   }).then((atualizado) =>{
        let status = atualizado ? 'dados atualizados.' : 'não foi possivel atualizar o registro.';
        console.log(status);
        mostrarEstoque(db.estoque)
   })
};

$verEstoque.onclick = (() =>{
    mostrarEstoque(db.estoque);
}) 

export default db


//consertar o input de id e seus metodos para poder atualizar e excluir