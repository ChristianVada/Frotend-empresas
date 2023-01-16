export function redirecToLogin(){
    const loginButton = document.querySelector(".header__login-button")

    loginButton.addEventListener("click", (event) => {
        window.location.replace("/src/pages/login.html")
    })
}

export function redirecToRegister(){
    const registerButton = document.querySelector(".header__register-button")

    registerButton.addEventListener("click", (event) => {
        window.location.replace("/src/pages/register.html")
    })
}

export function redirecToHome(){
    const homeButton = document.querySelector(".header__home-button")

    homeButton.addEventListener("click", (event) => {
        window.location.replace("http://127.0.0.1:5500/")
    })
}