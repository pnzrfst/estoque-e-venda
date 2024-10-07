import db from "./front/venda.js";

// import  {dbestoque}  from "./front/estoque.js";

const novoBanco = (nomeBanco, tabela) =>{
    //criando o banco de dados de venda.
    const db = new Dexie(nomeBanco);
    db.version(1).stores(tabela);
    return db
}

const salvarNoBanco = (nomeTabela, dados) =>{
    let status = verificarVazio(dados);

    if(status){
        nomeTabela.bulkAdd([dados]);
        console.log("Dados inseridos com sucesso")
  
    }else{
        window.alert("Não foi possivel cadastrar os dados.");
    }   

    return status
   
}

const verificarVazio = object =>{
    for(const value in object){
        if(object[value] === "" && object.hasOwnProperty(value)){
            return false;
        }
    }

    return true;
}


function mostrarVendas(dbNomeTabela){
    const $tbody = document.getElementById('tbody');

    $tbody.innerHTML = '';
    dbNomeTabela.toArray()
        .then((vendas) =>{
            vendas.forEach((venda) =>{

                const $tr = document.createElement("tr");

                const $th = document.createElement("th");
                $th.classList.add('scope', 'row');

                const $idCliente = document.createElement("td");
                $idCliente.innerText = `${venda.id}`;
                $tr.appendChild($idCliente);

                const $nomeCliente = document.createElement("td");
                $nomeCliente.innerText = `${venda.nomeCliente}`;
                $tr.appendChild($nomeCliente);

                const $precoVenda = document.createElement("td");
                $precoVenda.innerText = `${venda.precoVenda}`;
                $tr.appendChild($precoVenda);

                const $telefoneCliente = document.createElement("td");
                $telefoneCliente.innerText = `${venda.telefoneCliente}`;
                $tr.appendChild($telefoneCliente);

                const $isFiado = document.createElement("td");
                if(venda.vendaFiada === true){
                    $isFiado.innerText = "Sim";
                }

                if(venda.vendaFiada === false){
                    $isFiado.innerText = "Não";
                }
                
                $tr.appendChild($isFiado);

                

                const $editbtn = document.createElement("td");
                const $editSpan = document.createElement("span");

            

                $editSpan.classList.add('material-symbols-outlined', 'btnedit');
                $editSpan.textContent = 'edit';
                $editbtn.setAttribute('data-id', venda.id);
                $editbtn.appendChild($editSpan);
                $tr.appendChild($editbtn);
                $editSpan.onclick = (event) =>{
                    const id = $editbtn.getAttribute('data-id');
                    passarInfosForm(id, venda);
                    const $salvarVenda = document.getElementById('salvarVenda');
                    $salvarVenda.classList.add('disabled')
                    return
                }

                const $deletebtn = document.createElement("td");
                const $deleteSpan = document.createElement("span");
                $deleteSpan.classList.add('material-symbols-outlined', 'btndelete');
                $deleteSpan.textContent = 'delete';
                $deleteSpan.setAttribute('data-id', venda.id);
                $deletebtn.appendChild($deleteSpan);
                $tr.appendChild($deletebtn);
                
                $deleteSpan.onclick = deletarVenda


                $tbody.appendChild($tr);      
                
            })
            
        })
        
    return $tbody
}

function passarInfosForm(id){
    let integerId = parseInt((id || 0));

    db.dadosVenda.get(integerId).then(dados =>{

        const $idCliente = document.getElementById('idCliente');
        const $nomeCliente = document.getElementById('nomeCliente');
        const $precoVenda = document.getElementById('precoVenda')
        const $telefoneCliente = document.getElementById('telefoneCliente')
        const $isFiado = document.getElementById('isFiado');

        if(dados.vendaFiada === true){
            dados.vendaFiada = "Sim";

            $idCliente.value = dados.id || "",
            $nomeCliente.value = dados.nomeCliente || "",
            $precoVenda.value = dados.precoVenda || "",
            $telefoneCliente.value = dados.telefoneCliente || "",
            $isFiado.value = String(dados.vendaFiada) || ""
        }

        if(dados.vendaFiada === false){
            dados.vendaFiada = "Não";

            $idCliente.value = dados.id || "",
            $nomeCliente.value = dados.nomeCliente || "",
            $precoVenda.value = dados.precoVenda || "",
            $telefoneCliente.value = dados.telefoneCliente || "",
            $isFiado.value = String(dados.vendaFiada) || ""

        }
        
    })
}


// async function mostrarModal() {
//     try {
//         const produtos = await dbestoque.estoque.toArray()// Aqui, você busca a tabela estoque
//         const produtoAchar = window.prompt('Digite o produto que deseja encontrar');
//         const produtoEncontrado = produtos.filter((produto) => produto.nomeProduto.toLowerCase().includes(produtoAchar.toLowerCase()));

//         if (produtoEncontrado) {
//             console.log('Produto encontrado: ', produtoEncontrado);
//         } else {
//             console.log('Produto não encontrado.');
//         }

//     } catch (erro) {
//         console.error('Erro ao buscar produtos:', erro);
//     }
// }


function deletarVenda(event){
    let idCliente = parseInt(event.target.dataset.id);

    db.dadosVenda.delete(idCliente);
    mostrarVendas(db.dadosVenda)
    console.log(db.dadosVenda);
}


export default novoBanco
export {
    salvarNoBanco,
    mostrarVendas,
    // mostrarModal
}