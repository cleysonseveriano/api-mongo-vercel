// REQUISIÇÕES

// GET
/*
    Propiedades:
        _id:
        nome:
        preco:
*/

let tbody = document.getElementById('tbody-prod')

const URL = `https://api-mongo-render.onrender.com/`

const getProdutos = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    data.forEach((element, index) => {
        tbody.innerHTML += `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${element._id}</td>
            <td>${element.nome}</td>
            <td>R$ ${element.preco}</td>
            <td>
                <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${element._id}" onclick="pegarId(this.id)">
                    Editar
                </button>
                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                    <input type="text" class="form-control" id="nomeUpdate-${element._id}" placeholder="${element.nome}">
                                </div>
                                <div class="mb-3">
                                    <label for="inputPreco" class="form-label">Preço</label>
                                    <input type="number" class="form-control" id="precoUpdate-${element._id}" placeholder="${element.preco}">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" class="btn btn-primary" onclick="onclickUpdate('${element._id}')">Salvar</button>
                        </div>
                    </div>
                    </div>
                </div>
                <button type="button" class="btn btn-danger" id="${element._id}" onclick="onclickDelete('${element._id}')">Deletar</button>
            </td>
        </tr>
        `
    })
}

const createProduto = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

function addProduto(event) {
    event.preventDefault()
    const produtoNome = document.getElementById('inputNomeAdd')
    const produtoPreco = document.getElementById('inputPrecoAdd')

    console.log(produtoNome.value, produtoPreco.value)

    const data = {
        nome: `${produtoNome.value}`,
        preco: Number(`${produtoPreco.value}`)
    }

    console.log(data)

    createProduto(URL, data).then((data) => {
        console.log(data);
        window.location.reload()
    })
}

const deleteProduto = async (id) => {
    try {
        const response = await fetch(`https://api-mongo-render.onrender.com/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Erro ao excluir produto');
        }
        console.log('Produto excluído com sucesso');
        window.location.reload()
    } catch (error) {
        console.error('Erro ao excluir produto:', error.message);
    }
};

const onclickDelete = (id) => {
    console.log('ID do produto para deletar:', id);
    deleteProduto(id)
};

const pegarId = (id) => {
    console.log('ID do produto para atualizar:', id);
    return id;
}

const onclickUpdate = (id) => {
    const nomeUpdate = document.getElementById(`nomeUpdate-${id}`)
    const precoUpdate = document.getElementById(`precoUpdate-${id}`)

    const data = {
        nome: `${nomeUpdate.value}`,
        preco: Number(`${precoUpdate.value}`)
    }

    updateProduto(id, data)
}

const updateProduto = async (id, data) => {
    try {
        const response = await fetch(`https://api-mongo-render.onrender.com/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Erro ao atualizar produto');
        }
        console.log('Produto atualizado com sucesso');
        window.location.reload()
    } catch (error) {
        console.error('Erro ao atualizar produto:', error.message);
    }
};

getProdutos()
