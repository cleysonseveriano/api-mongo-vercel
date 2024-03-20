// GET
let listaBebidas = document.getElementById('lista-bebidas');

const URL_BEBIDAS = 'https://api-mongo-render.onrender.com/bebidas';

const getBebidas = async () => {
    try {
        const response = await fetch(URL_BEBIDAS);
        const data = await response.json();
        listaBebidas.innerHTML = ''; // Limpar o conteúdo atual da lista
        if (data.length > 0) {
            data.forEach((bebida, index) => {
                listaBebidas.innerHTML += `
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

const editarBebida = async (id) => {
    // Implemente a lógica para editar uma bebida se necessário
};

document.addEventListener('DOMContentLoaded', () => {
    getBebidas();
});