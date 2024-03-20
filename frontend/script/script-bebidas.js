// GET
let tbody = document.getElementById('tbody-prod');

const URL_BEBIDAS = 'https://api-mongo-render.onrender.com/bebidas';

const getBebidas = async () => {
    try {
        const response = await fetch(URL_BEBIDAS);
        const data = await response.json();
        if (data.length > 0) {
            data.forEach((bebida, index) => {
                tbody.innerHTML += `
                <tr>
                <th scope="row">${index + 1}</th>
                    <td>${bebida._id}</td>
                    <td>${bebida.nome}</td>
                    <td>R$ ${bebida.preco.toFixed(2)}</td>
                    <td>${bebida.ml} ml</td>
                    <td>
                        <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal-${index}" id="${index}-produto-${bebida._id}" onclick="pegarId(event)">
                            Editar
                        </button>
                        <!-- Modal -->
                        <div class="modal fade" id="exampleModal-${index}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Editar produto</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div class="mb-3">
                                            <label for="inputNome" class="form-label">Nome</label>
                                            <input type="text" class="form-control" id="nomeUpdate-${index}" placeholder="${bebida.nome}">
                                        </div>
                                        <div class="mb-3">
                                            <label for="inputPreco" class="form-label">Preço</label>
                                            <input type="number" class="form-control" id="precoUpdate-${index}" placeholder="${bebida.preco}">
                                        </div>
                                        <div class="mb-3">
                                            <label for="inputPreco" class="form-label">(ml)</label>
                                            <input type="number" class="form-control" id="mlUpdate-${index}" placeholder="${bebida.ml}">
                                        </div>
                                    </form>
                                </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                        <button type="button" class="btn btn-primary" onclick="onclickUpdate(${index})">Salvar</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="btn btn-danger" id="produto-${bebida._id}" onclick="excluirBebida('${bebida._id}')">Deletar</button>
                        </td>
                    </tr>
                
                        <div class="bebida">
                            <h3>${bebida.nome}</h3>
                            <p>Preço: R$ ${bebida.preco.toFixed(2)}</p>
                            <p>Volume (ml): ${bebida.ml}</p>
                            <button onclick="editarBebida('${bebida._id}')">Editar</button>
                            <button onclick="excluirBebida('${bebida._id}')">Excluir</button>
                        </div>
        `;
            });
        } else {
            listaBebidas.innerHTML = '<p>Nenhuma bebida cadastrada.</p>';
        }
    } catch (error) {
        console.error('Erro ao buscar bebidas:', error);
    }
}

const criarBebida = async () => {
    const nome = inputNomeAdd.value
    const preco = inputPrecoAdd.value
    const ml = inputMlAdd.value
    const data = {
        nome: nome,
        preco: preco,
        ml: ml
    }
    try {
        const response = await fetch(URL_BEBIDAS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            console.log('Bebida adicionada com sucesso');
            // getBebidas(); // Recarregar a lista de bebidas após adicionar uma nova
            window.location.reload()
        } else {
            throw new Error('Erro ao adicionar bebida');
        }
    } catch (error) {
        console.error('Erro ao adicionar bebida:', error.message);
    }
};

const excluirBebida = async (id) => {
    try {
        const response = await fetch(`${URL_BEBIDAS}/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            console.log('Bebida excluída com sucesso');
            getBebidas(); // Recarregar a lista de bebidas após excluir uma
        } else {
            throw new Error('Erro ao excluir bebida');
        }
    } catch (error) {
        console.error('Erro ao excluir bebida:', error.message);
    }
};

let idBebida = ''

const pegarId = (event) => {
    const btn = event.currentTarget;
    const idDoBotao = btn.id;
    if (!idDoBotao) {
        console.error('ID do botão não encontrado.');
        return;
    }
    const idDoProduto = idDoBotao.split('-')[2];
    idBebida = idDoProduto
    console.log(idDoProduto)    
    return idDoProduto;
};
const onclickUpdate = (index) => {
    const nomeUpdate = document.getElementById(`nomeUpdate-${index}`).value;
    const precoUpdate = document.getElementById(`precoUpdate-${index}`).value;
    const mlUpdate = document.getElementById(`mlUpdate-${index}`).value;

    const data = {
        nome: nomeUpdate,
        preco: Number(precoUpdate),
        ml: Number(mlUpdate)
    };
    
    editarBebida(data);
};


const editarBebida = async (data) => {
    try {
        const response = await fetch(`${URL_BEBIDAS}/${idBebida}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            window.location.reload();
        } else {
            throw new Error('Erro ao atualizar produto');
        }
    } catch (error) {
        console.error('Erro ao atualizar produto:', error.message);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    getBebidas();
});