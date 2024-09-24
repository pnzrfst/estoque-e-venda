import leia from 'readline-sync'

//array 
    let vendasDia = [];

//-----------------------------------------------------------------------------------
export const cadastrarVenda = () =>{
       const dadosVenda = {
            cliente: {
                nome: "",
                telefone: ""
            },
            venda: {
                produto: [],
                valor: 0,
                data: new Date().toISOString(),
            }
        }


        const nomeCliente = leia.question("Insira o nome do cliente: ");
        dadosVenda.cliente.nome = nomeCliente;

        const telefoneCliente = leia.question("Insira o numero de telefone do cliente: ");
        dadosVenda.cliente.telefone = telefoneCliente;

        const produtoCliente = leia.question("Insira o produto comprado pelo cliente: ");
        const qtdProduto = leia.question("Insira quantos produtos foram comprados: ");
        const valorProduto = leia.questionFloat("Qual foi o valor do produto? ");

        dadosVenda.venda.produto.push({
            nome: produtoCliente,
            valor: valorProduto,
            quantidade: qtdProduto
        });

        dadosVenda.venda.valor += valorProduto * qtdProduto;

        vendasDia.push(dadosVenda);
        
        console.log("Venda cadastrada com sucesso!");

};

//--------------------------------------------------------------------- 
//ler as vendas do dia

export const verVendasDoDia = () =>{ console.log(vendasDia) }
 
//----------------------------------------------------------------------
//atualizar uma venda

export const atualizarVenda = () =>{
        const nomeCliente = leia.question("Informa o nome do cliente para que possa alterar a venda: ");
        const vendaParaAtualizar = vendasDia.find(dadosVenda => dadosVenda.cliente.nome === nomeCliente);

        // validarFiltro(vendaParaAtualizar)

        console.log(`Registro encontrado, ${vendaParaAtualizar.cliente.nome}`);

        const opcao = leia.questionInt("Digite o que voce deseja alterar na venda: [1 - Nome do cliente], [2 - Telefone do cliente], [3 - Adicionar produto na venda], [4 - Alterar produto na venda], [5 - Excluir uma venda]:   ");

        switch(opcao){

            case 1: 
                const novoNome = leia.question("Insira o novo nome do cliente: ");
                vendaParaAtualizar.cliente.nome = novoNome;
                console.log(`Nome do cliente atualizado para: ${vendaParaAtualizar.cliente.nome}`);
            break;
            //--

            case 2:
                const novoTelefone = leia.question("Insira o novo telefone para atualizar: ");
                vendaParaAtualizar.cliente.telefone = novoTelefone;
                console.log(`Telefone do cliente atualizado para: ${vendaParaAtualizar.cliente.telefone}`);
            break;

            case 3:
                const novoProduto = leia.question("Insira o novo produto: ");
                const novoProdutoValor = leia.questionFloat("Insira o valor do produto: ");
                const qtdNovoProduto = leia.questionInt("Insira quantos produtos foram comprados: ");

                if(!vendaParaAtualizar.venda.produto){
                    vendaParaAtualizar.venda.produto = [];
                }

                vendaParaAtualizar.venda.produto.push({
                    nome: novoProduto,
                    valor: novoProdutoValor,
                    quantidade: qtdNovoProduto
                })
                
                vendaParaAtualizar.venda.valor += novoProdutoValor * qtdNovoProduto;
                
            break;

            case 4:
                const produtoAlterar = leia.question("Insira o produto que deseja alterar: ");
                const produtoEncontrado = vendaParaAtualizar.venda.produto.find(produto => produto.nome === produtoAlterar);

                if(!produtoEncontrado){
                    console.log("Esse registro nao possui o produto especificado.");
                    return;
                }

                produtoEncontrado.nome = leia.question("Insira o novo produto: ");
                produtoEncontrado.valor = leia.questionFloat("Insira o valor do novo produto: ");
                const alterarQtd = leia.questionInt("Insira a quantidade do produto: ");

                if(alterarQtd > produtoEncontrado.quantidade){
                    const opcaoAlterarQuantidade = leia.questionInt("Atençao: quantidade maior que a do registro original: Deseja alterar a quantidade? [1- SIM] [2- NAO]");
                    
                    switch(opcaoAlterarQuantidade){
                        case 1: 
                        produtoEncontrado.quantidade = alterarQtd;
                        break;

                        case 2:
                            console.log(`Produto ${produtoAlterar} alterado para ${produtoEncontrado.nome} com sucesso.`);
                        break;
                    }
                }
            break;   
        }
        
}

//---------------------------------------------------------------------------------

//deletar uma venda

export const deletarVenda = () =>{
        const nomeCliente = leia.question("Informa o nome do cliente para que possa alterar a venda: ");
        const vendasFiltradas = vendasDia.find(dadosVenda => dadosVenda.nome === nomeCliente);

        // validarFiltro(vendasFiltradas)

        let opcao = leia.keyInSelect( "DESEJA REALMENTE EXCLUIR ESSA VENDA?" ["[0] SIM", "[1] NAO"]);

        if(opcao === 0){
            const indexParaDeletar = vendasDia.indexOf(vendaParaDeletar);
            vendasDia.splice(indexParaDeletar, 1);
            console.log("Venda excluida com sucesso.")
        }
}


// export const validarFiltro = () =>{
//     if ((vendaParaAtualizar.length === 0 || vendasFiltradas.length === 0) ||
//     (!vendaParaAtualizar || !vendasFiltradas)){
//         console.log("Não foi encontrado nenhum parametro em nossos registros.")
//         return;
//     }
// }



//assim que atualizar um produto, se for diferente do anterior, atualizar informacoes de preco no produto novo.