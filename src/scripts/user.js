import { listCoworkersUser, listDepartmentsUser, loggedEditUser, searchLoggedEmployee, validateUser } from "./requests.js"

/* proteção de rota */
async function renderUser(){
    const user = await validateUser()
    if(!user){
        window.location.replace("/")
    }else if(user.is_admin){
        window.location.replace("/src/pages/admin.html")
    }
}
renderUser()

/* section data-user */
function createDataUser(element){
    const section = document.querySelector(".data-user")

    const username = document.createElement("h2")
    const divContainer = document.createElement("div")
    const email = document.createElement("p")
    const experience = document.createElement("p")
    const kindOfWork = document.createElement("p")
    const editButton = document.createElement("span")
    const iconPen = document.createElement("i")

    username.innerText = element.username
    divContainer.classList.add("data-user__container")
    email.innerText = element.email
    experience.innerText = element.professional_level
    kindOfWork.innerText = element.kind_of_work
    iconPen.classList.add("fa-solid")
    iconPen.classList.add("fa-pen")

    section.append(username, divContainer, editButton)
    divContainer.append(email, experience, kindOfWork)
    editButton.append(iconPen)

    editButton.addEventListener("click", () => {
        showModalEditUser()
    })

    return section
}

async function renderDataUser(){
    const requests = await searchLoggedEmployee()
    createDataUser(requests)
}
renderDataUser()

/* modal edit user */
function captureModalEditUser(){
    const modal = document.querySelector(".modal-edit-user")
    const inputName = document.querySelector(".name")
    const inputEmail = document.querySelector(".email")
    const inputPassword = document.querySelector(".password")
    const button = document.querySelector(".modal-edit-user__container > button")
    const newObjetc = {}

    button.addEventListener("click", async(event) => {
        event.preventDefault()
        newObjetc.username = inputName.value
        newObjetc.email = inputEmail.value
        newObjetc.password = inputPassword.value

        const request = await loggedEditUser(newObjetc)
    })
}

function showModalEditUser(){
    const modal = document.querySelector(".modal-edit-user")
    modal.showModal()
    closeModalEditUser()
}

function closeModalEditUser(){
    const modal = document.querySelector(".modal-edit-user")
    const closeButton = document.querySelector(".modal-edit-user__container > span")

    closeButton.addEventListener("click", () => {
        modal.close()
    })
}

captureModalEditUser()

/* lista coworkes */
function createItenCoworkers(element){
    const li = document.createElement("li")
    const name = document.createElement("p")
    const level = document.createElement("p")

    li.classList.add("iten-coworkes")
    name.classList.add("nameCoworkes")
    name.innerText = element.username
    level.classList.add("levelCoworkes")
    level.innerText = element.kind_of_work

    li.append(name, level)

    return li
}

async function renderItenCoworkes(){
    const ul = document.querySelector(".list-coworkers")
    const request = await listCoworkersUser()
    const newArray = request[0].users
    
    newArray.forEach(async (element) => {
        const requestsLogged = await searchLoggedEmployee()

        if(element.username !== requestsLogged.username){
            const li = createItenCoworkers(element)
            ul.append(li)
        }
    })
}

renderItenCoworkes()

/* title coworkes */
async function headerCompany(){
    const request = await listDepartmentsUser()
    const divHeader = document.querySelector(".header-company")
    const title = document.createElement("h1")
    title.innerText = `${request.name}`

    divHeader.append(title)

    return divHeader
}

headerCompany()


/* logout */
function logOut(){
    const button = document.querySelector(".header__button")
    button.addEventListener("click", () => {
        localStorage.setItem('user', "")
        window.location.replace("/")
    })
}

logOut()