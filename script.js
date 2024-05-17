document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://desafio.xlow.com.br/Search';
    const productGrid = document.getElementById('product-grid');
    const productCount = document.getElementById('product-count');
    const changeColumnsButton = document.getElementById("changeColumns");
    changeColumnsButton.textContent = 'Mostrar Mais';
    let productsPerPage = 5; // Número padrão de produtos por página

    async function fetchProducts() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const products = data.slice(0, productsPerPage); // Pegando os produtos de acordo com a quantidade por página
            renderProducts(products);
            updateProductCount(data.length);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    }

    function renderProducts(products) {
        productGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <h2>${product.productName}</h2>
                <button onclick="buyProduct('${product.productId}')">Comprar</button>
            `;
            productGrid.appendChild(productCard);
        });
    }

    function updateProductCount(count) {
        productCount.textContent = `${count} Produtos Encontrados`;
    }

    // Função para alterar a quantidade de produtos por linha
    changeColumnsButton.addEventListener("click", () => {
        productsPerPage = productsPerPage === 5 ? 10 : 5; // Alternando entre 3 e 2 colunas
        fetchProducts(); // Atualiza a exibição dos produtos
    });
    fetchProducts();
});

function buyProduct(productId) {
    window.location.href = `comprar.html?id=${productId}`;
    // window.location.href = 'comprar.html';
}
