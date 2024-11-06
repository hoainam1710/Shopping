var totalQuantity = document.querySelector(".quantity");
var listProducts = [];

const initApp = () => {
    fetch("/json/listProducts.json")
        .then(response => response.json())
        .then(data => {
            listProducts = data;

            listCarts = JSON.parse(localStorage.getItem("cart"));
            if(listCarts == null || listCarts == undefined){
                totalQuantity.innerHTML = 0;
            } else totalQuantity.innerHTML = listCarts.length;

        })
};

initApp();


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





