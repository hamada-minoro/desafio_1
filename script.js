document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://desafio.xlow.com.br/Search';
    const productGrid = document.getElementById('product-grid');
    const productCount = document.getElementById('product-count');
    const changeColumnsButton = document.getElementById("changeColumns");
    changeColumnsButton.textContent = 'Mostrar Mais';
    var change = Boolean(true);
    let productsPerPage = 5; 

    async function fetchProducts() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const products = data.slice(0, productsPerPage); 
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
                <button onclick="buyProduct('${product.productId}')">Veja Mais</button>
            `;
            productGrid.appendChild(productCard);
        });
    }

    function updateProductCount(count) {
        productCount.textContent = `${count} Produtos Encontrados`;
    }

 
    changeColumnsButton.addEventListener("click", () => {
       
        
        if (change == true) {
            changeColumnsButton.textContent = 'Mostrar Menos';
            productsPerPage = productsPerPage === 5 ? 10 : 5; 
            change = Boolean(false);
            fetchProducts(); 
        } else {
            changeColumnsButton.textContent = 'Mostrar Mais';
            productsPerPage = productsPerPage === 5 ? 10 : 5; 
            change = Boolean(true);
            fetchProducts(); 
        }
        
        
        
    });
    fetchProducts();
});

function buyProduct(productId) {
    window.location.href = `comprar.html?id=${productId}`;
}
