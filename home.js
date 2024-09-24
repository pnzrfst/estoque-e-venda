
import {cadastrarVenda, verVendasDoDia, atualizarVenda, deletarVenda} from './models/venda.js';
import {cadastrarProduto, verEstoque, atualizarEstoque, deletarProdutoEstoque} from './models/estoque.js';
import leia from 'readline-sync'


const executarMenu = () => {
    let opcao;

    do {
        opcao = leia.keyInSelect(["[0] VENDA", "[1] ESTOQUE"]);

        switch (opcao) {
            case 0: // "VENDA"
                const opcoesVenda = leia.keyInSelect(
                    ["CADASTRAR VENDA", "VER VENDAS DO DIA", "ATUALIZAR VENDA", "DELETAR VENDA"]);

                switch (opcoesVenda) {
                    case 0: // "CADASTRAR VENDA"
                        cadastrarVenda();
                        break;
                    case 1: // "VER VENDAS DO DIA"
                        verVendasDoDia();
                        break;
                    case 2: // "ATUALIZAR VENDA"
                        atualizarVenda();
                        break;
                    case 3: // "DELETAR VENDA"
                        deletarVenda();
                        break;
                }
                break;

            case 1: // "ESTOQUE"
                const opcoesEstoque = leia.keyInSelect(
                    ["CADASTRAR PRODUTO", "VER ESTOQUE DE PRODUTOS", "ATUALIZAR PRODUTO", "DELETAR PRODUTO"]);

                switch (opcoesEstoque) {
                    case 0: // "CADASTRAR PRODUTO"
                        cadastrarProduto();
                        break;
                    case 1: // "VER ESTOQUE DE PRODUTOS"
                        verEstoque();
                        break;
                    case 2: // "ATUALIZAR PRODUTO"
                        atualizarEstoque();
                        break;
                    case 3: // "DELETAR PRODUTO"
                        deletarProdutoEstoque();
                        break;
                }
                break;
                
            default:
                console.log("Opção inválida. Tente novamente.");
                break;
        }
    } while (true);
};


executarMenu()