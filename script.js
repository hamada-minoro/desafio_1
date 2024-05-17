document.addEventListener("DOMContentLoaded", () => {
    const productsElement = document.getElementById("products");
    const counterElement = document.getElementById("counter");
    const changeColumnsButton = document.getElementById("changeColumns");
    let productsPerPage = 9; // Número padrão de produtos por página

    // Função para buscar e exibir os produtos da API
    async function fetchProducts() {
        try {
            const response = await fetch("https://desafio.xlow.com.br/search");
            const data = await response.json();
            const products = data.slice(0, productsPerPage); // Pegando os produtos de acordo com a quantidade por página
            renderProducts(products);
            updateCounter(data.length);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    }

    // Função para renderizar os produtos na página
    function renderProducts(products) {
        productsElement.innerHTML = "";
        products.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");

            const imageElement = document.createElement("img");
            imageElement.src = `assets/${product.productId}.png`;
            productElement.appendChild(imageElement);

            const nameElement = document.createElement("h4");
            nameElement.textContent = product.productName;
            nameElement.classList.add("titulo");
            productElement.appendChild(nameElement);

            const buyButton = document.createElement("button");
            buyButton.textContent = "Comprar";
            buyButton.classList.add("buyButton");
            productElement.appendChild(buyButton);

            const variationImage = document.createElement("img");
            variationImage.src = `assets/${product.productId}_var.png`;
            variationImage.classList.add("variation");
            variationImage.addEventListener("click", () => {
                const imageElementOld = imageElement.src ;
                imageElement.src = variationImage.src; 
                variationImage.src = imageElementOld;
            });
            productElement.appendChild(variationImage);

            productsElement.appendChild(productElement);
        });
    }

    // Função para atualizar o contador de produtos
    function updateCounter(totalProducts) {
        counterElement.textContent = `Total de Produtos: ${totalProducts}`;
    }

    // Função para alterar a quantidade de produtos por linha
    changeColumnsButton.addEventListener("click", () => {
        productsPerPage = productsPerPage === 9 ? 6 : 9; // Alternando entre 3 e 2 colunas
        fetchProducts(); // Atualiza a exibição dos produtos
    });

    // Inicializa a página buscando os produtos da API
    fetchProducts();
});

