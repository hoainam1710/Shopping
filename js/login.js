
document.querySelector(".btnRequiredSignUp").addEventListener("click", ()=>{
    window.location.href = "/html/register.html";
})

// eye icon
var isShow = true;
document.querySelector(".eye_icon").addEventListener("mousedown", (event)=>{
    event.preventDefault();
    event.stopPropagation();
    if(isShow){
        document.querySelector(".inputPassword").type = "text";
        document.querySelector(".eye_icon").src = "/img/eye-hide.svg";
        isShow = false;
    } else {
        document.querySelector(".inputPassword").type = "password";
        document.querySelector(".eye_icon").src = "/img/eye-show.svg";
        isShow = true;
    }
    
})


const errorEmail = document.querySelector(".error_email");
const errorPassword = document.querySelector(".error_password");
const inputEmail = document.querySelector(".inputEmail");
const inputPassword = document.querySelector(".inputPassword");

errorEmail.textContent = "";
errorPassword.textContent = "";

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


var user = [];

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("button").addEventListener("click", (event) => {
        // ngăn submit trang (để kiểm tra validate) khi nhấn nút button trong thẻ form
        event.preventDefault(); 
        var email = inputEmail.value;
        var password = inputPassword.value;

        if (validateEmail(email) && validatePassword(password, errorPassword)) {
            var userStorage = localStorage.getItem("user");
            if(userStorage !== null){
                user = JSON.parse(userStorage);
                console.log(user);  
                
                for(let item of user){
                    if(item.email === email && item.password === password){
                        alert("Đăng nhập thành công");
                        window.location.href = "/index.html";
                        return;
                    }
                }
                alert("Đăng nhập thất bại|\nEmail hoặc password không đúng.");
            } else alert("Tài khoản không tồn tại!")                 
        }
    });
});


