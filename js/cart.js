var listCartJson = localStorage.getItem("cart");
var cartHTML = document.querySelector(".cart");
var subTotal = document.querySelector(".subTotal");
var sumTotal = document.querySelector(".sumTotal");
var btnOrder = document.querySelector(".btnOrder");
var quantity = document.querySelector(".quantity");
var listCarts = [];
var listProducts = [];


const initApp = () => {
    fetch("/json/listProducts.json")
        .then(response => response.json())
        .then(data => {
            listProducts = data;
            if (listCartJson) {
                listCarts = JSON.parse(listCartJson);
                console.log(listCarts);
                if(listCarts.length == 0){
                    alert("Giỏ hàng chưa có sản phẩm");
                    return;
                }
                addCartToHTML();

                var total = localStorage.getItem("sumTotal");
                if (total) {
                    sumTotal.innerHTML = `$${total}`;
                } else sumTotal.innerHTML = "$0";

                quantity.innerHTML = listCarts.length;

                updateSumTotal();

            } else console.log("List cart null");
            
        })
};

initApp();


const addCartToHTML = () => {
    cartHTML.innerHTML = `<tr>
                            <th>Sản phẩm</th>
                            <th>Giá tiền</th>
                            <th>Số lượng</th>
                            <th>Tạm tính</th>
                            <th>Xóa</th>
                        </tr>`;


    for (let item of listCarts) {
        var newCart = document.createElement("tr");
        var productInCart = listProducts.find(e => e.id == item.productId);
        newCart.dataset.id = item.productId;
        newCart.classList.add("item");
        newCart.innerHTML =
            `<td class="product">
                                <div class="thumb">
                                    <img src="${productInCart.image}" alt="">
                                </div>
        
                                <div class="name">${productInCart.name}</div>
                            </td>
        
                            <td>$${productInCart.price}</td>

                            <td>
                                <input class = "quantityInCart" type="number" id="quantity" min="1" max="10" value="${item.quantity}">
                            </td>
        
                            <td class = "subTotal">$${productInCart.price * item.quantity}</td>

                            <td>
                                <i class="fa-solid fa-trash"></i>
                            </td>`;

        cartHTML.appendChild(newCart);
    }
};

cartHTML.addEventListener("input", (e) => {
    if (e.target.classList.contains("quantityInCart")) {
        var cartPosition = e.target.parentElement.parentElement.dataset.id;
        var productInCart = listProducts.find(e => e.id == cartPosition);
        var cartClick = listCarts.find(e => e.productId == cartPosition);

        if (cartClick) {
            cartClick.quantity = e.target.value;
            subTotal = productInCart.price * e.target.value;

            localStorage.setItem("cart", JSON.stringify(listCarts));
            addCartToHTML();
            updateSumTotal();
        }
    } 
});

// remove item
cartHTML.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-solid")) {
        const result = confirm("Bạn có chắc chắn muốn xóa sản phẩm khỏi giỏ hàng?");
        if (result) {
            var cartId = e.target.parentElement.parentElement.dataset.id;
            var cartClickIndex = listCarts.findIndex(e => e.productId == cartId);
            console.log(cartClickIndex);    
            listCarts.splice(cartClickIndex, 1);
    
            localStorage.setItem("cart", JSON.stringify(listCarts));
            addCartToHTML();
            updateSumTotal();
            updateTotalQuantity();
        } 
    }
});

const updateTotalQuantity = ()=>{
    quantity.innerHTML = listCarts.length;
}

const updateSumTotal = () => {
    var total = 0;
    listCarts.forEach(item => {
        var productInCart = listProducts.find(e => e.id == item.productId);
        if (productInCart) {
            total += productInCart.price * item.quantity;
        }
    })
    localStorage.setItem("sumTotal", total.toString());
    sumTotal.innerHTML = `$${total}`;
}

btnOrder.addEventListener("click", () => {
    if(listCarts.length > 0){
        alert("Đặt hàng thành công!");
        // localStorage.removeItem("cart");
    } else alert("Giỏ hàng chưa có sản phẩm!")
    
    
})


// search
var inputSearch = document.querySelector(".inputSearch");
var listSearchs = [];

inputSearch.addEventListener("change", ()=>{
    var keySearch = inputSearch.value;
    if(inputSearch.value == "" || inputSearch.value == null){
        alert("Bạn chưa điền thông tin tìm kiếm!");
    } else {
        keySearch = inputSearch.value;
        
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