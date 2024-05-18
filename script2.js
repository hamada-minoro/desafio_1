document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const apiUrl = `https://desafio.xlow.com.br/search/${id}`;
    const productGrid = document.getElementById('product-grid');
    const itemCountElement = document.getElementById('item-count');

    async function fetchProducts() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Erro ' + response.statusText);
            }
            const productss = await response.json();
            renderProducts(productss);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    function renderProducts(products) {
        productGrid.innerHTML = '';
        itemCountElement.textContent = `Número de itens: ${TotalItems(products)}`;
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            const productCardVBox = document.createElement('div');
            productCardVBox.classList.add('product-card-variation-box');
           
            product.items.forEach(item => {       
                const imgCard = document.createElement('div');
                imgCard.classList.add('img-card');

                productCard.innerHTML = `<h2>${item.nameComplete}</h2>`; 

                item.images.forEach(image => {
                    const imageElement = document.createElement("img");
                    imageElement.src = `${image.imageUrl}`;
                    imgCard.appendChild(imageElement);
                    productCard.appendChild(imgCard);
                });
                
                item.sellers.forEach(seller => {
                    const nameElement = document.createElement("h4");
                    nameElement.textContent = `R$ ${seller.commertialOffer.Price}`;
                    nameElement.classList.add("titulo");
                    productCard.appendChild(nameElement);

                    const buyButton = document.createElement("button");
                    buyButton.textContent = "Comprar";
                    buyButton.classList.add("buyButton");
                    productCard.appendChild(buyButton);
                });
                
                productCard.appendChild(productCardVBox);
                productGrid.appendChild(productCard);
            });  

            product.items.forEach(item => {       
                
                item.images.forEach(image => {
                    const imageElementV = document.createElement("img");
                    imageElementV.src = `${image.imageUrl}`;
                    productCardVBox.appendChild(imageElementV);


                    imageElementV.addEventListener('click', () => {
                        const mainImageElement = productCard.querySelector('.img-card img');
                        if (mainImageElement) {
                            const imageElementOld = mainImageElement.src
                            mainImageElement.src = imageElementV.src;
                            imageElementV.src = imageElementOld;
                        }
                    });
                });

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

    fetchProducts();
});
