let estoque = []
import leia from 'readline-sync'
//adicionar ao estoque
export const cadastrarProduto = () =>{
    
    const $nomeProduto = leia.question("Digite o nome do produto: ");
    const $qtdProduto = leia.questionInt("Digite a quantidade de produtos:" );

    const produto = {
        nome: $nomeProduto,
        quantidade: $qtdProduto     
    };

    estoque.push(produto);

    console.log(`Produto ${produto.nome} cadastrado com sucesso.`);
    console.log(estoque);
}

// cadastrarProduto()

//atualizar o estoque

export const atualizarEstoque = () => {
    const $produtoAtualizar = leia.question("digite o produto que deseja atualizar: ");
    const estoqueParaAtualizar = estoque.filter(produto => produto.nome === $produtoAtualizar);

    // validarFiltro()

    const produtoAtual = estoqueParaAtualizar[0];

    console.log(`Registro encontrado, ${produtoAtual.nome}`);

    var opcao = leia.keyInSelect("Digite o que deseja fazer: ", ["[0] ATUALIZAR ESTOQUE DO PRODUTO", "[1] ATUALIZAR PRODUTO"]);

    switch(opcao){
        case 1:
            const estoqueAtualizado = leia.questionInt("Atualize o estoque: ");
            produtoAtual.quantidade = estoqueAtualizado;
        break;

        case 2:
            produtoAtual.nome = leia.question("Digite o nome do novo produto: "),
            produtoAtual.quantidade = leia.questionInt("Digite a quantidade em estoque: ")
            
            console.log(`O produto  ${produtoAtual.nome} foi cadastrado com sucesso.`);
        break;
    }
    
}

//ler o estoque

export const verEstoque = () =>{console.log(estoque)};


//deletar um produto do estoque

export const deletarProdutoEstoque = () =>{
    const produtoEscolhido = leia.question("Digite o nome do produto que deseja deletar: ");
    const estoqueParaDeletar = estoque.find(produto => produto.nome === produtoEscolhido);

    // validarFiltro()

    let opcao = leia.keyInSelect("Deseja realmente deletar esse produto?", ["SIM", "NAO"]);


    if(opcao === 0){
        const indexParaDeletar = estoque.indexOf(produtoParaDeletar);
        estoque.splice(indexParaDeletar, 1);
        console.log('Produto deletado dos registros com sucesso.');
        return
    }

    console.log("Operacao cancelada.")

}

////////////////

export const validarFiltro = () =>{
    if ((estoqueParaDeletar.length === 0 || estoqueParaAtualizar.length === 0) ||
    (!estoqueParaAtualizar || !estoqueParaDeletar)){
        console.log("Não foi encontrado nenhum parametro em nossos registros.")
        return;
    }

}

//assim que atualizar um estoque produto, atualizar informacoes de preco do estoque.