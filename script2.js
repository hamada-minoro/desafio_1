
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = `https://desafio.xlow.com.br/search/${id}`;
    const productGrid = document.getElementById('product-grid');
    const itemCountElement = document.getElementById('item-count');
    const changeColumnButton = document.getElementById('change-column');

    let productsPerPage = 3; // Quantidade de produtos por linha

    async function fetchProducts() {
        try {
            const response = await fetch(apiUrl);
            const products = await response.json();
            renderProducts(products);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    }

    function renderProducts(products) {
        productGrid.innerHTML = '';
        itemCountElement.textContent = `Número de itens: ${TotalItems(products)}`;
        products.forEach(product => {
           const itemSlice =  product.items.slice(0, productsPerPage);
            itemSlice.forEach(item => {       
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <h2>${item.nameComplete}</h2>
                `;
                productGrid.appendChild(productCard);
            });
        });
    }

    function TotalItems(products) {
        let totalItems = 0;
        products.forEach(product => {
            totalItems += product.items.length;
        });
        return totalItems;
    }

   
    changeColumnButton.addEventListener('click', () => {
        productsPerPage = productsPerPage === 3 ? 10 : 3; 
        fetchProducts();
    });

    fetchProducts();
});

