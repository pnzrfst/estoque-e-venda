import novoBanco,  {
    salvarNoBanco,
    mostrarVendas
}from "./venda-modules.js"

const db = novoBanco("VendasDb", {
    dadosVenda: `++id, nomeCliente, precoVenda, telefoneCliente, vendaFiada`
}) 

//inputs 
const $idCliente = document.getElementById('idCliente');
const $nomeCliente = document.getElementById('nomeCliente');
const $precoVenda = document.getElementById('precoVenda');
const $telefoneCliente = document.getElementById('telefoneCliente');
const $isFiado = document.getElementById('isFiado');

//buttons
const $salvarVenda = document.getElementById('salvarVenda');
const $verVendas = document.getElementById('verVendas');
const $alterarVenda = document.getElementById('alterarVenda');
const $deletarVenda = document.getElementById('deletarVenda');

$salvarVenda.onclick = (event) =>{
    if($isFiado.value === "Sim" || $isFiado.value === "sim"){
       const isFiado = true
       let status = salvarNoBanco(db.dadosVenda, {
        nomeCliente: $nomeCliente.value,
        precoVenda: $precoVenda.value,
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
       


    $nomeCliente.value = ""
    $precoVenda.value = ""
    $telefoneCliente.value = ""
    $isFiado.value = ""

    mostrarVendas(db.dadosVenda)
}

$alterarVenda.onclick = () =>{
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
    
}



$verVendas.onclick = (() => {
    mostrarVendas(db.dadosVenda);
})

export default db