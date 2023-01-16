import { redirecToLogin, redirecToRegister } from "./redirect.js"

/* Alternar menu e seleçao de filtro */
function menuToggle(){
    const buttonMenu = document.querySelector(".header__buttonCollapse")
    buttonMenu.addEventListener("click", (e) => {
        const menu = document.querySelector(".header__menu")
        menu.classList.toggle("active")

        if(menu.classList.contains("active")) {
            document.querySelector(".icon").src = "./src/img/Vector x.svg"
        } else {
            document.querySelector(".icon").src = "./src/img/Vector barra.svg"
        }
    })
} 

function filterToggle(){
    const button = document.querySelector(".selectSector__icon")
    button.addEventListener("click", (e) => {
        const ul = document.querySelector(".filter")
        ul.classList.toggle("active")
    })
}

menuToggle()
filterToggle()

/* Requisição */
async function receiveList(){
    const companies = await fetch(`http://localhost:6278/companies`, {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    })
    .then((response) => {
        return response.json()
    })
    .then((response) =>{
        renderCards(response)
        renderFilterCompanys(response)
        return response
    })
}

receiveList()

/* Cards */
function createCards(element){
    const li = document.createElement("li")
    const title = document.createElement("p")
    const hour = document.createElement("span")
    const sector = document.createElement("span")

    li.classList.add("company__card")
    title.classList.add("company__name")
    title.innerText = element.name
    hour.classList.add("company__time")
    hour.innerText = element.opening_hours
    sector.classList.add("company__sector")
    sector.innerText = element.sectors.description

    li.append(title, hour, sector)
    return li
}

function renderCards(array){
    const list = document.querySelector(".company")

    array.forEach(element => {
        const card = createCards(element)
        list.appendChild(card)
    })
}

/* Filtro de dados home */
function filterCompanys(array, filterWord){
    const newArray = array.filter(element => {
        if(element.sectors.description === filterWord) {
            return element
        }
    })
    return newArray
}

function renderFilterCompanys(array){
    const buttons = document.querySelectorAll(".filter__item")
    const ul = document.querySelector(".company")

    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            ul.innerHTML = ""
            
            if(e.target.innerText === "Todos") {
                renderCards(array)
            }

            const filteredCompanys = filterCompanys(array, e.target.innerText)

            renderCards(filteredCompanys)
        })
    })
}

/* Redirecionamento de paginas */
redirecToLogin()
redirecToRegister()