// REQUISIÇÕES

// GET
/*
    Propiedades:
        _id:
        nome:
        preco:
*/
const getAllProducts = async () => {
    const response = await fetch(`https://api-mongo-render.onrender.com/`)
    const data = await response.json()
    // Para pegar um produto específico com prop especifica
    // console.log(data[0].preco)
    console.log(data)
}

getAllProducts()