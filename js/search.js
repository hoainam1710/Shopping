
var listSearchs = [];
var listProducts = [];
var listCarts = [];
var listSearchHTML = document.querySelector(".listSearchs");
var inputSearch = document.querySelector(".inputSearch");
var btnSearch = document.querySelector(".fa-solid");
var totalQuantity = document.querySelector(".quantity");
var title = document.querySelector(".title_content");



const initApp = () => {

    fetch("/json/listProducts.json")
        .then(response => response.json())
        .then(data => {
            listProducts = data;
            listCarts = JSON.parse(localStorage.getItem("cart"));
            totalQuantity.innerHTML = listCarts.length;
            listSearchs = JSON.parse(localStorage.getItem("listSearchs"));
            console.log(listSearchs);
            if (listSearchs.length > 0) {
                title.innerHTML = "Danh sách sản phẩm tìm kiếm";
                addListSearchToHTML();
            } else if(listSearchs.length == 0){
                listSearchHTML.innerHTML = "";
                title.innerHTML = "Không tìm thấy sản phẩm.";
            } 
        })

}

const addListSearchToHTML = () => {
    listSearchHTML.innerHTML = "";
    listSearchs.forEach(item => {
        var newItemSeach = document.createElement("div");
        newItemSeach.dataset.id = item.id;
        newItemSeach.classList.add("item");
        newItemSeach.innerHTML =
            `
                    <div class="thumb">
                        <img src="${item.image}" alt="">
                    </div>
                    <div class="name">
                        <a href="#">${item.name}</a>
                    
                    </div>
                    <div class="price">$${item.price}</div>
                    <button class="btnAddToCart" type="submit">THÊM VÀO GIỎ</button>
                `;

        listSearchHTML.appendChild(newItemSeach);
    })
}

initApp();


// add to cart 
document.querySelector(".listSearchs").addEventListener("click", (event)=>{
    if(event.target.classList.contains("btnAddToCart")){
        var productId = event.target.parentElement.dataset.id;
        
        addToListCart(productId);
        
        
    }
})



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
inputSearch.addEventListener("change", () => {
    var keySearch = inputSearch.value;
    if (inputSearch.value == "" || inputSearch.value == null) {
        alert("Bạn chưa điền thông tin tìm kiếm!");
    } else {
        keySearch = inputSearch.value;
        console.log(listProducts);

        listSearchs = listProducts.filter(e => e.name.toUpperCase().includes(keySearch.toUpperCase()));
        console.log(listSearchs);

        if (listSearchs.length > 0) {
            document.querySelector(".title_content").innerHTML = "Danh sách sản phẩm tìm kiếm"
            localStorage.setItem("listSearchs", JSON.stringify(listSearchs));
            addListSearchToHTML();
        } else if(listSearchs.length == 0){
            listSearchHTML.innerHTML = "";
            document.querySelector(".title_content").innerHTML = "Không tìm thấy sản phẩm."
        } 


    }
})


// login
document.querySelector(".iconLogin").addEventListener("click", ()=>{
    window.location.href = "/html/login.html";
})





