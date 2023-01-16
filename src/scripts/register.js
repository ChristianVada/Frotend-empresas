import { redirecToHome, redirecToLogin } from "./redirect.js"
import {createUser} from "./requests.js"

function createUserForm() {
    const inputs = document.querySelectorAll(".input-register__list > input")
    const select = document.querySelector("#input-register__professional-level")
    const button = document.querySelector(".input-login__button-register")
    const newUser = {}

    button.addEventListener("click", async (event) => {
        event.preventDefault()

        inputs.forEach(input => {
            newUser[input.name] = input.value
        })
        newUser[select.name] = select.value

        const request = await createUser(newUser)
    })
    return newUser
}

redirecToHome()
redirecToLogin()

createUserForm()
