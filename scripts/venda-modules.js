import dbestoque from "./estoque-modules.js";


const novoBanco = (nomeBanco, tabela) =>{
    //criando o banco de dados de venda.
    const db = new Dexie(nomeBanco);
    db.version(1).stores(tabela);
    return db
}

const db = novoBanco("VendasDb", {
    dadosVenda: `++id, nomeCliente, telefoneCliente, vendaFiada`
}) 

const salvarNoBanco = (nomeTabela, dados) =>{
    let status = verificarVazio(dados);

    if(status){
        nomeTabela.bulkAdd([dados]);
        console.log("Dados inseridos com sucesso")
  
    }else{
        window.alert("Não foi possivel cadastrar os dados.");
    }   

    mostrarVendas(db.dadosVenda)
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


function mostrarVendas(){
    const $tbody = document.getElementById('tbody');

    $tbody.innerHTML = '';
    db.dadosVenda.toArray()
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
    
    const $salvarVenda = document.getElementById('salvarVenda');
    $salvarVenda.classList.remove('disabled')
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

function deletarVenda(event){
    let idCliente = parseInt(event.target.dataset.id);
    db.dadosVenda.delete(idCliente);
    mostrarVendas(db.dadosVenda);
    console.log(db.dadosVenda);
}


const precoProdutos = [];

async function adicionarProdutosVenda() {
    const produtoFiltrar = document.getElementById('searchBar').value;
    const mostrarProdutos = document.getElementById('mostrarItens');

    dbestoque.estoque
        .where('nomeProduto')
        .equals(produtoFiltrar)
        .toArray()
        .then(produtosVenda => {
            produtosVenda.forEach((produto) => {
               

                const li = document.createElement("li");
                li.classList.add('produtoCompra');

                const nome = document.createElement("h3");
                nome.innerText = `${produto.nomeProduto}`;

                const paragrafo = document.createElement("p");
                paragrafo.innerText = `R$ ${produto.precoUnitario}`;

                const divbtns = document.createElement("div");

                const qtdComprada = document.createElement("input");
                qtdComprada.type = 'number';
                qtdComprada.setAttribute('data-produto-id', produto.id)
                qtdComprada.placeholder = 'Digite a quantidade';
                qtdComprada.classList.add('quantidadeComprada');

                const btnSalvar = document.createElement("button");
                btnSalvar.textContent = 'Salvar Produto';
                btnSalvar.classList.add('salvarProduto')
                btnSalvar.addEventListener('click', () => {
                    calcularTotalPorUnidade();
                    subtrairEstoque();
                });

                const btnEditar = document.createElement("button");
                btnEditar.textContent = 'Editar Produto';
                btnEditar.classList.add('editarProduto');

                const btnApagar = document.createElement("button");
                btnApagar.textContent = 'Apagar produto';
                btnApagar.classList.add('apagarProduto');

                divbtns.appendChild(qtdComprada);
                divbtns.appendChild(btnSalvar);
                divbtns.appendChild(btnEditar);
                divbtns.appendChild(btnApagar);

                li.appendChild(nome);
                li.appendChild(paragrafo);
                li.appendChild(divbtns);

                mostrarProdutos.appendChild(li);

                precoProdutos.push(produto.precoUnitario.toString().replace(',', '.'));
            });
        });
}

function calcularTotalPorUnidade() {
    const precos = precoProdutos;
    let total = 0;
    const $subTotalCompra = document.getElementById('subTotalCompra');

    
    const quantidadeInputs = document.querySelectorAll('.quantidadeComprada');

    quantidadeInputs.forEach((input, index) => {
        const quantidade = parseInt(input.value) || 0; 
        total += parseFloat(precos[index]) * quantidade; 
    });

    console.log(total);
    $subTotalCompra.innerText = `R$ ${total.toFixed(2)}`;
}

async function subtrairEstoque() {
    const produtos = await dbestoque.estoque.toArray();
    const quantidadeNova = [{}];

    
    const quantidadePorInputs = document.querySelectorAll('.quantidadeComprada');
    for (const input of quantidadePorInputs) {
        const produtoId = input.getAttribute('data-produto-id'); 
        const quantidadeComprada = parseInt(input.value) || 0; // Converter para número

        const produto = produtos.find(p => p.id == produtoId); 

        if (produto) {
            const novaQuantidade = produto.quantidade - quantidadeComprada;

            // Atualiza somente o produto correspondente
            await dbestoque.estoque.update(produto.id, {
                quantidade: JSON.stringify(novaQuantidade)
            });
        }
    }
}

export default novoBanco
export {
    salvarNoBanco,
    mostrarVendas,
    adicionarProdutosVenda,
    calcularTotalPorUnidade,
    subtrairEstoque
}
