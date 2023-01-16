import { redirecToHome, redirecToRegister } from "./redirect.js"
import{ login, validateUser } from "./requests.js"

function loginForm() {
    const inputs = document.querySelectorAll(".input-login__list > input")
    const button = document.querySelector(".input-login__button-login")
    const loginUser = {}

    button.addEventListener("click", async (event) => {
        event.preventDefault()

        inputs.forEach(input => {
            loginUser[input.name] = input.value
        })

        const request = await login(loginUser)
        if(!request.error){
            localStorage.setItem('user', JSON.stringify(request))
        }
    })

}

async function renderLogin(){
    const user = await validateUser()
    if(user && user.is_admin){
        window.location.replace("/src/pages/admin.html")
    }else if(user && !user.is_admin){
        window.location.replace("/src/pages/user.html")
    }
}

redirecToHome()
redirecToRegister()

renderLogin()
loginForm()

 