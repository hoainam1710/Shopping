var totalQuantity = document.querySelector(".quantity");
var listProducts = [];


const initApp = () => {
    fetch("/json/listProducts.json")
        .then(response => response.json())
        .then(data => {
            listProducts = data;

            listCarts = JSON.parse(localStorage.getItem("cart"));
            if(listCarts === null || listCarts === undefined){
                totalQuantity.textContent = 0;
            } else totalQuantity.textContent = listCarts.length;

            if(localStorage.getItem("detail") !== null){
                let productDetail = JSON.parse(localStorage.getItem("detail"));
                console.log(productDetail);
                addProductToHTML(productDetail);
            } else console.log("item detail null");
            
             
        })
};

initApp();


const addProductToHTML = (productDetail)=> {
    document.querySelector(".listProduct").innerHTML = "";
    var newProduct = document.createElement("div");
    newProduct.classList.add("sanpham");
    newProduct.dataset.id =  productDetail.id;
    newProduct.innerHTML = 
                     `
                        <div class="thumb">
                            <img src="${productDetail.image}" alt="">
                        </div>
                        <div class="product_name">
                            <a href="#">${productDetail.name}</a>
                        </div>
                        <div class="product_desc">$${productDetail.price}</div>
                        
                        <button class="btnAddToCart"  type="submit">Thêm vào giỏ</button> `;

    document.querySelector(".listProduct").appendChild(newProduct);
    console.log(newProduct);
   
    

}

document.querySelector(".listProduct").addEventListener("click", (event)=>{
    if(event.target.classList.contains("btnAddToCart")){
        var productId = event.target.parentElement.dataset.id;
        addToListCart(productId);
        
    }
})


// add to cart
const addToListCart = (productId)=>{
    var productIdInCart = listCarts.findIndex(value => value.productId == productId);
    if(listCarts === null || listCarts === undefined){
        listCarts = [];
        listCarts = [{productId: productId, quantity: 1}];
    } else if(productIdInCart < 0) {
        listCarts.push({productId: productId, quantity: 1});
    } else listCarts[productIdInCart].quantity++;

    console.log(listCarts);
    totalQuantity.innerHTML = listCarts.length;
    localStorage.setItem("cart", JSON.stringify(listCarts));
    

}



// search
var inputSearch = document.querySelector(".inputSearch");
var listSearchs = [];

inputSearch.addEventListener("change", ()=>{
    var keySearch = inputSearch.value;
    if(inputSearch.value === "" || inputSearch.value === null || inputSearch.value === undefined){
        alert("Bạn chưa điền thông tin tìm kiếm!");
    } else {
        keySearch = inputSearch.value;
        console.log(keySearch);
        console.log(listProducts);
        
       listSearchs =  listProducts.filter(e => e.name.toUpperCase().includes(keySearch.toUpperCase()));
        // console.log(listSearchs);
        if(listSearchs.length > 0){
            localStorage.setItem("listSearchs", JSON.stringify(listSearchs)); 
        } 
        
        window.location.href = "/html/list_search.html";
              
    }
})


// login
document.querySelector(".iconLogin").addEventListener("click", ()=>{
    window.location.href = "/html/login.html";
})














