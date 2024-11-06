// slideShow
var banner = document.getElementById("bannerMain");
var btnPreviousSlide = document.getElementById("btn_previous_slide");
var btnNextSlide = document.getElementById("btn_next_slide");
var totalQuantity = document.querySelector(".quantity");
var index = 1;
var imgBanner = [];

for (var i = 1; i < 5; i++) {
    imgBanner[i] = {};
    imgBanner[i].src = "img/banner" + i + ".webp";
}

function nextSlide() {
    index++;
    if (index == 5) {
        index = 1;
    }
    banner.src = imgBanner[index].src;
};

function previousSlide() {
    index--;
    if (index == 0) {
        index = 4;
    }
    banner.src = imgBanner[index].src;
}

btnPreviousSlide.addEventListener("click", previousSlide);
btnNextSlide.addEventListener("click", nextSlide);

setInterval(nextSlide, 3000);


// listProducts

var listProducts = [];
var listProductHTML = document.querySelector(".listProducts");


const addProductToHTML = () => {
    listProductHTML.innerHTML = "";
    for (let itemProduct of listProducts) {
        var newProduct = document.createElement("div");
        newProduct.classList.add("item");
        newProduct.dataset.id = itemProduct.id;     // lưu ý: dataset luôn trả về String
        newProduct.innerHTML = `
                <div class="thumb">
                    <img class = "imgProduct" src="${itemProduct.image}" alt="">
                </div>
                <div class="name">
                    <a href="#">${itemProduct.name}</a>
                
                </div>
                <div class="price">$${itemProduct.price}</div>
                <button class="btnAddToCart" type="submit">THÊM VÀO GIỎ</button>`;
        listProductHTML.appendChild(newProduct);

    }

}


const initApp = () => {
    fetch("/json/listProducts.json")
        .then(response => response.json())
        .then(data => {
            listProducts = data;
            localStorage.setItem("product", listProducts);
            addProductToHTML();
            console.log(listProductHTML);
            console.log(listProducts);
            
            listCarts = JSON.parse(localStorage.getItem("cart"));
            if(listCarts == null || listCarts == undefined){
                totalQuantity.innerHTML = 0;
            } else totalQuantity.innerHTML = listCarts.length;

        })
};

initApp();



var btnAddToCart = document.querySelector(".btnAddToCart");
var listCarts = [];
var listCartHTML = document.querySelector(".listCarts");


listProductHTML.addEventListener("click", (event) => {
    var itemCart = event.target;
    if (itemCart.classList.contains("btnAddToCart")) {
        var productId = itemCart.parentElement.dataset.id;
        
        addToListCart(productId);

    }

});

const addToListCart = (productId) => {
    if(!Array.isArray(listCarts)){
        listCarts = [];
    }
    let productIdClick = listCarts.findIndex(value => value.productId == productId);
    if (listCarts.length == 0) {
        console.log("listCarts.length = 0");
        listCarts = [{ productId: productId, quantity: 1 }];
    } else if (productIdClick < 0) {
        listCarts.push({ productId: productId, quantity: 1 });
    } else {
        listCarts[productIdClick].quantity++;
    }

    console.log(listCarts);
    totalQuantity.innerHTML = listCarts.length;
    localStorage.setItem("cart", JSON.stringify(listCarts));

};



// search 
var inputSearch = document.querySelector(".inputSearch");
var listSearchs = [];

inputSearch.addEventListener("change", ()=>{
    var keySearch = inputSearch.value;
    if(inputSearch.value == "" || inputSearch.value == null || inputSearch.value == undefined){
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


// detail
listProductHTML.addEventListener("click", (event) => {
    var item = event.target;
    if (item.classList.contains("imgProduct")) {
        let productId = item.parentElement.parentElement.dataset.id;
        let productClick = listProducts.find(value => value.id == productId);
        console.log(productClick);
        
        localStorage.setItem("detail", JSON.stringify(productClick));
        window.location.href = "/html/detail.html";
    }

});
























