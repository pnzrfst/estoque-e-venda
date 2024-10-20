
var estoqueDb = (nomeBanco, tabela) =>{
    //criando dbestoque_estoque 
    const novoBanco = new Dexie(nomeBanco);
    novoBanco.version(1).stores(tabela)
    novoBanco.open()
    return novoBanco
}

var dbestoque = estoqueDb("EstoqueDb", {
    estoque:`++id, nomeProduto, quantidade, precoUnitario`
})



//salvar no banco function

const salvarNoBanco = (nomeTabela, dados) =>{
    let flag = empty(dados);
    if(flag){
        nomeTabela.bulkAdd([dados]);
        console.log('Dados inseridos com sucesso.')
    }
    else{
        window.alert('Por favor, preencha todos os dados.');
    }

    return flag
}

//checkBox validaçao 
const empty = object => {
    for(const value in object){
        if(object[value] === "" && object.hasOwnProperty(value)){
            return false;
        }
    }

    return true;
}

function mostrarEstoque(estoqueTabela){
    const $tbody = document.getElementById('tbody');
    $tbody.innerHTML = ''
    estoqueTabela.toArray()
        .then((produtos) =>{
            produtos.forEach((produto) => {
                const $tr = document.createElement("tr");

                const $th = document.createElement("th");
                $th.classList.add('scope', 'row')

                const $id = document.createElement("td");
                $id.innerText = `${produto.id}`;
                $tr.appendChild($id);

                
                const $nomeProduto = document.createElement("td");
                $nomeProduto.innerText = `${produto.nomeProduto}`;
                $tr.appendChild($nomeProduto);

                const $quantidadeProduto = document.createElement("td");
                $quantidadeProduto.innerText = `${produto.quantidade}`;
                $tr.appendChild($quantidadeProduto);

                const $precoUnitario = document.createElement("td");
                $precoUnitario.innerText = `${produto.precoUnitario}`;
                $tr.appendChild($precoUnitario);
                
                const $editbtn = document.createElement("td");
                const $editSpan = document.createElement("span");
                $editSpan.classList.add('material-symbols-outlined', 'btnedit');
                $editSpan.textContent = 'edit';
                $editbtn.setAttribute('data-id', produto.id)
                $editbtn.appendChild($editSpan);
                $tr.appendChild($editbtn);

                $editSpan.onclick = (event) =>{
                    const id = $editbtn.getAttribute('data-id');
                    passarInfosForm(id, produto);
                    const $salvarEstoque = document.getElementById('salvarEstoque');
                    $salvarEstoque.classList.add('disabled')
                    return
                }
                
                const $deletebtn = document.createElement("td");
                const $deleteSpan = document.createElement("span");
                $deleteSpan.classList.add('material-symbols-outlined', 'btndelete');
                $deleteSpan.textContent = 'delete';
                $deleteSpan.setAttribute('data-id', produto.id);
                $deletebtn.appendChild($deleteSpan);
                $tr.appendChild($deletebtn);
                
                $deleteSpan.onclick = deletarProduto
                
                $tbody.appendChild($tr);
                
            })
        })
    
    const $salvarEstoque = document.getElementById('salvarEstoque');
    $salvarEstoque.classList.remove('disabled')
    return $tbody    
 }


function passarInfosForm(id){
    let integerId = parseInt((id || 0));
    
    dbestoque.estoque.get(integerId).then(dados=> {
        const $nomeProduto = document.getElementById('nomeProduto');
        const $quantidadeProduto = document.getElementById('quantidadeProduto');
        const $precoProduto = document.getElementById('precoProduto');
        const $idProduto = document.getElementById('idProduto')

        $idProduto.value = dados.id || "",
        $nomeProduto.value = dados.nomeProduto || "",
        $quantidadeProduto.value = dados.quantidade || "",
        $precoProduto.value = dados.precoUnitario || "" 
    })
}


function deletarProduto(event){
    let idProduto = parseInt(event.target.dataset.id);  
    console.log(idProduto);
    
    dbestoque.estoque.delete(idProduto);

    mostrarEstoque(dbestoque.estoque);

}

export default dbestoque
export {
    salvarNoBanco,
    mostrarEstoque,
    passarInfosForm,
}