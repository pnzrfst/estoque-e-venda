
import novoBanco,  {
    salvarNoBanco,
    mostrarVendas,
    mostrarProdutosEstoque,
}from "../venda-modules.js"



const db = novoBanco("VendasDb", {
    dadosVenda: `++id, nomeCliente, precoVenda, telefoneCliente, vendaFiada`
}) 


//inputs 
const $idCliente = document.getElementById('idCliente');
const $nomeCliente = document.getElementById('nomeCliente');

const $telefoneCliente = document.getElementById('telefoneCliente');
const $isFiado = document.getElementById('isFiado');

//buttons
const $btns = document.getElementById('btns')
const $salvarCliente = document.getElementById('salvarCliente');
const $verVendas = document.getElementById('verVendas');
const $alterarVenda = document.getElementById('alterarVenda');
const $comecarCadastro = document.getElementById('comecaCadastro');
const $geraRelatorio = document.getElementById('gerarRelatorio');

//form
const $form = document.getElementById('formEntrada');
//table
const $tabela = document.getElementById('tabelaVenda');

$comecarCadastro.addEventListener('click', () =>{
    console.log('entrou')
    $comecarCadastro.style.display = 'none';
    $form.style.display = 'inline';
    $btns.classList.remove('disabled');
    $tabela.classList.remove('disabled');
    $geraRelatorio.classList.add('disabled');
    console.log("saiu")
})

$salvarCliente.addEventListener('click', () =>{
    if($isFiado.value === "Sim" || $isFiado.value === "sim"){
       const isFiado = true
       let status = salvarNoBanco(db.dadosVenda, {
        nomeCliente: $nomeCliente.value,
        // precoVenda: $precoVenda.value,
        telefoneCliente: $telefoneCliente.value,
        vendaFiada: isFiado
        })
        console.log(status)
    }else if($isFiado.value === "Não" || $isFiado.value === "não" || $isFiado.value === "Nao" || $isFiado.value === "nao"){
        const isFiado = false;
        let status = salvarNoBanco(db.dadosVenda, {
            nomeCliente: $nomeCliente.value,
            precoVenda: $precoVenda.value,
            telefoneCliente: $telefoneCliente.value,
            vendaFiada: isFiado
        })
        console.log(status)
    }
       

    $idCliente.value = ""
    $nomeCliente.value = ""
    // $precoVenda.value = ""
    $telefoneCliente.value = ""
    $isFiado.value = ""

})

$alterarVenda.addEventListener('click', () =>{
    const id = parseInt($idCliente.value || 0);

    if($isFiado.value === "Sim" || $isFiado.value === "sim"){
        const isFiado = true
        db.dadosVenda.update(id, {
            nomeCliente: $nomeCliente.value,
            precoVenda: $precoVenda.value,
            telefoneCliente: $telefoneCliente.value,
            vendaFiada: isFiado
        }).then((atualizado) =>{
            let status = atualizado ? 'dados atualizados.' : 'não foi possivel atualizar registros.';
            console.log(status)
            mostrarVendas(db.dadosVenda)
        })
    }

    if($isFiado.value === "Não" || $isFiado.value === "não" || $isFiado.value === "Nao" || $isFiado.value === "nao"){
       const isFiado = false
        db.dadosVenda.update(id, {
            nomeCliente: $nomeCliente.value,
            precoVenda: $precoVenda.value,
            telefoneCliente: $telefoneCliente.value,
            vendaFiada: isFiado
        }).then((atualizado) =>{
            let status = atualizado ? 'dados atualizados.' : 'não foi possivel atualizar registros.';
            console.log(status)
            mostrarVendas(db.dadosVenda)
        })
    
    }

    $idCliente.value = "";
    $nomeCliente.value = "";
    $precoVenda.value = "";
    $telefoneCliente.value = "";
    $isFiado.value = "";   
    
}) 



$verVendas.addEventListener('click', () =>{
    mostrarVendas(db.dadosVenda);
    
    $idCliente.value = "";
    $nomeCliente.value = "";
    // $precoVenda.value = "";
    $telefoneCliente.value = "";
    $isFiado.value = "";   
})


$geraRelatorio.addEventListener('click', () =>{
    mostrarProdutosEstoque()
})


export default db