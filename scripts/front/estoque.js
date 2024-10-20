
import dbestoque, {
    salvarNoBanco,
    mostrarEstoque,
    passarInfosForm,

}from "../estoque-modules.js";

    
//inputs 
const $idProduto = document.getElementById('idProduto');
const $nomeProduto = document.getElementById('nomeProduto');
const $quantidadeProduto = document.getElementById('quantidadeProduto');
const $precoProduto = document.getElementById('precoProduto');

//buttons
const $salvarProduto = document.getElementById('salvarEstoque');
const $verEstoque = document.getElementById('verEstoque');
const $alterarEstoque = document.getElementById('alterarEstoque');

//inserindo valores usando o botao de salvar
$salvarProduto.addEventListener('click', () =>{
     let flag = salvarNoBanco(dbestoque.estoque, {
         nomeProduto: $nomeProduto.value,
         quantidade: $quantidadeProduto.value,
         precoUnitario: $precoProduto.value
     })
    
     console.log(flag);

     $idProduto.value = "";
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

    $idProduto.value = "";
    $nomeProduto.value = "";
    $quantidadeProduto.value = "";
    $precoProduto.value = "";

})
  

$verEstoque.addEventListener('click', () =>{
    mostrarEstoque(dbestoque.estoque);
    $idProduto.value = "";
    $nomeProduto.value = "";
    $quantidadeProduto.value = "";
    $precoProduto.value = "";
})

