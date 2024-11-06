document.querySelector(".btnRequiredSignIn").addEventListener("click", () => {
    window.location.href = "/html/login.html";

})

//eye_icon
var isShowPass = true;
document.querySelector(".eye_icon_pass").addEventListener("mousedown", (event)=>{
    event.preventDefault();
    event.stopPropagation();
    if(isShowPass){
        document.querySelector(".inputPassword").type = "text";
        document.querySelector(".eye_icon_pass").src = "/img/eye-hide.svg";
        isShowPass = false;
    } else {
        document.querySelector(".inputPassword").type = "password";
        document.querySelector(".eye_icon_pass").src = "/img/eye-show.svg";
        isShowPass = true;
    }
    
})

var isShowConfirm = true;
document.querySelector(".eye_icon_confirm").addEventListener("mousedown", (event)=>{
    event.preventDefault();
    event.stopPropagation();
    if(isShowConfirm){
        document.querySelector(".inputConfirm").type = "text";
        document.querySelector(".eye_icon_confirm").src = "/img/eye-hide.svg";
        isShowConfirm = false;
    } else {
        document.querySelector(".inputConfirm").type = "password";
        document.querySelector(".eye_icon_confirm").src = "/img/eye-show.svg";
        isShowConfirm = true;
    }
    
})

const errorEmail = document.querySelector(".error_email");
const errorPassword = document.querySelector(".error_password");
const errorConfirm = document.querySelector(".error_confirm");
const inputEmail = document.querySelector(".inputEmail");
const inputPassword = document.querySelector(".inputPassword");
const inputConfirm = document.querySelector(".inputConfirm");


errorEmail.textContent = "";
errorPassword.textContent = "";
errorConfirm.textContent = "";



const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        errorEmail.textContent = "Thông tin bắt buộc!";
        return false;
    }
    if (!regex.test(email)) {
        errorEmail.textContent = "Email không hợp lệ!";
        return false;
    }
    errorEmail.textContent = "";

    return true;
}

const validatePassword = (mPassword, mErrorPassword) => {
    const hasUpperCase = /[A-Z]/.test(mPassword); // Có ít nhất một chữ cái viết hoa
    const hasLowerCase = /[a-z]/.test(mPassword); // Có ít nhất một chữ cái viết thường
    const hasNumber = /\d/.test(mPassword); // Có ít nhất một số
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(mPassword); // Có ít nhất một ký tự đặc biệt


    if (mPassword === "") {
        mErrorPassword.textContent = "Thông tin bắt buộc!";
        return false;
    }
    if (mPassword.length < 8) {
        mErrorPassword.textContent = "Password phải có ít nhất 8 kí tự";
        return false;
    }
    if (!hasUpperCase) {
        mErrorPassword.textContent = "Password phải có ít nhất một chữ cái viết hoa";
        return false;
    }

    if (!hasLowerCase) {
        mErrorPassword.textContent = "Password phải có ít nhất một chữ cái viết thường";
        return false;
    }
    if (!hasNumber) {
        mErrorPassword.textContent = "Password phải có ít nhất một chữ số";
        return false;
    }
    if (!hasSpecialChar) {
        mErrorPassword.textContent = "Password phải có ít nhất một kí tự đặc biệt";
        return false;
    }
    mErrorPassword.textContent = "";
    return true;

}

const validateConfirm = (confirm, password) => {
    if (validatePassword(confirm, errorConfirm)) {
        if (confirm !== password) {
            errorConfirm.textContent = "Password không trùng khớp.";
            return false;
        }
        errorConfirm.textContent = "";
        return true;
    }
}

inputEmail.addEventListener("change", (event)=>{
    const emailInput = event.target.value;
    if(validateEmail(emailInput)){
        email = emailInput; 
    }

})

inputPassword.addEventListener("change", (event)=>{
    const passwordInput = event.target.value;
    if(validatePassword(passwordInput, errorPassword)){
        password = passwordInput; 
    }

})

inputConfirm.addEventListener("change", (event)=>{
    const confirmInput = event.target.value;
    if(validateConfirm(confirmInput, password)){
        console.log("Confirm success");

    }

})


var user = [];

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("button").addEventListener("click", (event) => {
        // ngăn submit trang (để kiểm tra validate) khi nhấn nút button trong thẻ form
        event.preventDefault(); 
        var email = inputEmail.value;
        var password = inputPassword.value;
        var confirm = inputConfirm.value;

        if (validateEmail(email) && validatePassword(password, errorPassword) && validateConfirm(confirm, password)) {
            var userStorage = localStorage.getItem("user");
            if(userStorage !== null){
                user = JSON.parse(userStorage);
                console.log(user);
                
            }
            if(user.length === 0){
                user = [{email: email, password: password}];
            } else{
                user.push({email: email, password: password});
            }
            console.log("Register success!");
            localStorage.setItem("user", JSON.stringify(user));
            console.log(user);
            alert("Đăng ký tài khoản thành công!");
            inputEmail.value = "";
            inputPassword.value = "";
            inputConfirm.value = "";
                         
        }
    });
});





