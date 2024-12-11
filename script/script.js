let productBox = document.getElementById('productsBox');
let cartCount = document.getElementById('count');
let cartBtn = document.getElementById('cartImg');
let home = document.getElementById('home');
let myCart = document.getElementById('cartCards');
let cartBox = document.getElementById('cart');

let url = 'https://dummyjson.com/products';

let productProm = fetchProducts(url);
let addToCart = [];

async function fetchProducts(url) {
    let productProm = fetch(url);
    return await productProm;
}

productProm.then((response)=>{
    return response.json();
}).then((ele)=>{
    console.log(ele.products);
    ele.products.forEach(element => {
        createCard(element);
    });
})


function createCard(obj){
    let card = document.createElement('div');
    card.setAttribute('class','card');
    card.setAttribute('id','card');
    card.innerHTML = `
    <div class="childCard">
                <img src="${obj.thumbnail}" alt="productimage" class="productImg">
            </div>
            <div class="descChild" >
                <div class="productHead">
                    <h3 class="product-name">${obj.title}</h3>
                <p class="product-price">$${obj.price}</p>
                </div>

                <div class="prductDesc" id="productDesc">
                    <p>${obj.description}</p>
                </div>
                <div class="cart-btn" id="cart-btn">
                    <button class="btn" name="btn">Add to Cart</button>
                </div>
            </div>
    
    `;

    card.addEventListener('click',(event)=>{
        console.log(event.target.name);
        let name = event.target.name;
        if(name=='btn'){
            // Object.defineProperty(obj,'count',{value:1});
            // obj.count = 1;
            addToCart.push(obj);
            // addTCartFunction(obj);
            checkCart();
        }
    })

    productBox.appendChild(card);
}

function checkCart(){
    let count = addToCart.length;
    cartCount.innerText = count;
    console.log(addToCart);
}


cartBtn.addEventListener('click',()=>{
    home.classList.toggle('hide');
    cartBox.classList.toggle('hide');
    cart();
    console.log(addToCart);
    
})

function cart(){
    myCart.innerHTML = '';
    if(addToCart.length!=0){
        for(let i = 0; i< addToCart.length; i++){
            showCart(addToCart[i]);
            
        }
    }
}


function showCart(obj){
    console.log(obj);
    let card = document.createElement('div');
    card.setAttribute('class','card');
    // card.setAttribute('id','card');
    card.innerHTML = `
    <div class="childCard">
                <img src="${obj.thumbnail}" alt="productimage" class="productImg">
            </div>
            <div class="descChild" >
                <div class="productHead">
                    <h3 class="product-name">${obj.title}</h3>
                <p class="product-price">$${obj.price}</p>
                </div>

                <div class="prductDesc" id="productDesc">
                    <p>${obj.description}</p>
                </div>
                <div class="cart-btn" id="cart-btn">
                    <button class="btn" name="btn">Remove</button>
                </div>
            </div>
    
    `;

    myCart.appendChild(card);
    card.addEventListener('click',(event)=>{
        console.log(event.target.name);
        let name = event.target.name;
        if(name=='btn'){
            let index = addToCart.indexOf(obj);
            addToCart.splice(index,1);
            cart();
            checkCart();
        }
    })

}

