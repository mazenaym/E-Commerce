const bar = document.getElementById('bar');
const closeBtn = document.getElementById('close');
const nav = document.getElementById('nav-items');
const html = document.querySelector("html");
const listItems = nav.querySelectorAll('li');
const prodContainer = document.querySelector('.prod-container');
const products = document.querySelectorAll('.prod');
const cartBtn = document.querySelector('.cart-btn');
const mobileCartBtn = document.querySelector('#mobile .cart-btn')
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartDom = document.querySelector('.cart-added');
const cartContent = document.querySelector('.cart-content');
const cartProduct = document.querySelector('.cart-product');
const cartTotal = document.querySelector('.cart-total');
const clearCart = document.querySelector('.clear-cart');
const cartCount = document.querySelector('.cart-count');
const cartCountMobile = document.querySelector('#mobile .cart-count');
const removeItemBtn = document.querySelectorAll('.remove-item');

document.addEventListener('click', (e) => {
    if (e.target === cartOverlay) {
        cartDom.classList.remove('show-cart');
        cartOverlay.classList.remove('transparent-bg');    
    }
})

bar.addEventListener('click', () => {
    nav.classList.add('active')
});

closeBtn.addEventListener('click', () => {
    nav.classList.remove('active');
});

html.addEventListener("click", function (e) {
    if (e.target !== bar && e.target !== nav)
        nav.classList.remove("active");
});

let cart = [];
let buttonsDom = [];

// getting the products
class Products {
    async getProducts() {
        try {
            let result = await fetch('products.json');
            let data = await result.json();
            let products = data.items;

            products = products.map(item => {
                const id = item.id;
                const title = item.title;
                const price = item.price;
                const image = item.image;
                return {id,title,price,image};
            });

            return products;
        }
        catch (error) {
            console.log(error);
        }
    }
}

// display products
class UI {
    displayProducts(products) {
        let result = '';
        products.forEach(product => {
            result += `
            <div class="prod">
            <img src="${product.image}" alt="">
            <div class="desc">
                <span>adidas</span>
                <h5>${product.title}</h5>
                <div class="star">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </div>
                <h4>$${product.price}</h4>
            </div>
            <button class="bag-btn" data-id=${product.id}>
                <i class="cart fa-solid fa-cart-shopping"></i>
                Add To Cart
            </button>
        </div>
            `
        });
        prodContainer.innerHTML = result;
    }

    getButtons() {
        const buttons = [...document.querySelectorAll('.bag-btn')];
        buttonsDom = buttons;

        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if (inCart) {
                button.textContent = 'In Cart';
                button.disabled = true;
                button.style.background = '#127420'
            }
            button.addEventListener('click', (e)=> {
                e.target.textContent = 'In Cart';
                e.target.disabled = true;
                button.style.background = '#127420'
                // get product from products
                let cartItem = {...storageHandler.getProduct(id), amount: 1};
                // add product to the cart
                cart = [...cart, cartItem]
                // save cart in local storage
                storageHandler.saveCart(cart);
                // set cart values
                this.setCartValues(cart);
                // display cart item
                this.addCartItem(cartItem);
                // show the cart
                this.showCart();
            });
        });
    }

    setCartValues(cart) {
        let tempTotal = 0;
        let itemsTotal = 0;
        
        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        });

        cartTotal.innerText = parseInt(tempTotal.toFixed(2));
        cartCount.innerText = itemsTotal;
        cartCountMobile.innerText = itemsTotal;
    }

    addCartItem(item) {
        const div = document.createElement('div');
        div.classList.add('cart-product');
        div.innerHTML = `
        <img src="${item.image}" alt="">
        <div>
            <h4>${item.title}</h4>
            <h5>$${item.price}</h5>
            <span class="remove-item" data-id="${item.id}">remove</span>
        </div>
        <div>
            <i class="fa-solid fa-chevron-up" data-id="${item.id}"></i>
            <p class="amount">${item.amount}</p>
            <i class="fa-solid fa-chevron-down" data-id="${item.id}"></i>
        </div>
        `
        cartContent.appendChild(div)
    }

    showCart() {
            cartDom.classList.add('show-cart');
            cartOverlay.classList.add('transparent-bg');
    }

    toggleCart() {
            cartDom.classList.toggle('show-cart');
            cartOverlay.classList.toggle('transparent-bg');
    }

    hideCart() {
        cartDom.classList.remove('show-cart');
        cartOverlay.classList.remove('transparent-bg');
    }

    setupApp() {
        cart = storageHandler.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
        cartBtn.addEventListener('click',this.toggleCart);
        mobileCartBtn.addEventListener('click',this.toggleCart);
        closeCartBtn.addEventListener('click',this.hideCart);
    }

    populateCart(cart) {
        cart.forEach(item => this.addCartItem(item));
    }

    cartLogic() {
        // clear cart button
        clearCartBtn.addEventListener('click',()=> {
            this.clearCart();
            });

        // cart functionality
        cartContent.addEventListener('click',(e)=> {
            if(e.target.classList.contains('remove-item')){
                let removeItem = e.target;
                let id = removeItem.dataset.id;
                cartContent.removeChild(removeItem.parentElement.parentElement);
                this.removeItem(id);
            } else if (e.target.classList.contains('fa-chevron-up')) {
                let addAmount = e.target;
                let id = addAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount += 1;
                storageHandler.saveCart(cart);
                this.setCartValues(cart);
                addAmount.nextElementSibling.innerText = tempItem.amount;
            } else if (e.target.classList.contains('fa-chevron-down')) {
                let lowerAmount = e.target;
                let id = lowerAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount -= 1;
                if(tempItem.amount > 0) {
                    storageHandler.saveCart(cart);
                    this.setCartValues(cart);
                    lowerAmount.previousElementSibling.innerText = tempItem.amount;
                } else {
                    cartContent.removeChild(lowerAmount.parentElement.parentElement);
                    this.removeItem(id);
                }
            }
        });
    }

    clearCart() {
        let cartItems = cart.map(item => item.id);
        cartItems.forEach(id => this.removeItem(id));

        while(cartContent.children.length > 0) {
            cartContent.removeChild(cartContent.children[0]);
        }
        this.hideCart();
    }

    removeItem(id) {
        cart = cart.filter(item => item.id !== id);
        this.setCartValues(cart);
        storageHandler.saveCart(cart);
        let button = this.getSingleButton(id);
        button.disabled = false;
        button.innerHTML = `
        <i class="cart fa-solid fa-cart-shopping"></i>
        Add To Cart
        `;
        button.style.background = '#088178';
    }

    getSingleButton(id) {
        return buttonsDom.find(button => button.dataset.id === id);
    }
}
// local storage
class storageHandler {
    static saveProducts(products) {
        localStorage.setItem('products',JSON.stringify(products))
    }

    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id)
    }

    static saveCart(cart) {
        localStorage.setItem('cart',JSON.stringify(cart));
    }

    static getCart() {
        return localStorage.getItem('cart')
                ? JSON.parse(localStorage.getItem('cart'))
                : []
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    const ui = new UI();
    const product  = new Products();

    ui.setupApp();
    product.getProducts()
    .then(products =>{ 
        ui.displayProducts(products);
        storageHandler.saveProducts(products);
    })
    .then(()=> {
        ui.getButtons();
        ui.cartLogic();
    })
});