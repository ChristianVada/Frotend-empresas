import { allUser, createDepartment, deleteDepartment, deleteUser, dismissEmployee, editDepartment, editUser, readAllCompanys, readAllDepartment, toHireUser, userOutOfWork, validateUser } from "./requests.js";

/* Controle de acesso */
async function renderAdmin(){
    const user = await validateUser()
    if(!user){
        window.location.replace("/")
    }else if(!user.is_admin){
        window.location.replace("/src/pages/user.html")
    }
}
renderAdmin()

/* Parte da criação de todos os card departamentos */
function createCardDepartment(element){
    const li = document.createElement("li")
    const departmentName = document.createElement("h3")
    const description = document.createElement("p")
    const companyName = document.createElement("p")
    const departmentIcons = document.createElement("div")
    const eye = document.createElement("span")
    const pen = document.createElement("span")
    const trash = document.createElement("span")
    const eyeIcon = document.createElement("i")
    const penIcon = document.createElement("i")
    const trashIcon = document.createElement("i")

    li.classList.add("departments__iten")
    departmentName.innerText = element.name
    description.innerText = element.description
    companyName.innerText = element.companies.name
    departmentIcons.classList.add("departments__icon")
    eye.classList.add("eye-button")
    pen.classList.add("pen-button")
    trash.classList.add("trash-button")
    eyeIcon.classList.add("fa-regular")
    eyeIcon.classList.add("fa-eye")
    penIcon.classList.add("fa-sharp")
    penIcon.classList.add("fa-solid")
    penIcon.classList.add("fa-pen")
    trashIcon.classList.add("fa-regular")
    trashIcon.classList.add("fa-trash-can")

    eye.addEventListener("click", () => {
        showModalViewDepartment(element)
    })

    pen.addEventListener("click", () => {
        showModalEditDeparmentDescription(element)
    })

    trash.addEventListener("click", () => {
        showDeleteDepartmentModal(element)
    })

    li.append(departmentName, description, companyName, departmentIcons)
    departmentIcons.append(eye, pen, trash)
    eye.appendChild(eyeIcon)
    pen.appendChild(penIcon)
    trash.appendChild(trashIcon)

    return li
}

function renderCardDepartment(array){
    const list = document.querySelector(".departments__list")

    array.forEach(element => {
        const card = createCardDepartment(element)
        list.appendChild(card)
    })
}

/* Criação option de selecionar empresa */
function renderCopanyOption(array){
    const select = document.querySelector(".departments__select")
    
    array.forEach(element => {
        const option = createOptionCompanys(element)
        select.appendChild(option)
    })
}

function createOptionCompanys(element){
    const option = document.createElement("option")
    option.innerText = element.name
    option.value = element.name
    return option
}

renderCopanyOption(await readAllCompanys())


/* Parte do filtro e render departamentos selecinados por empresa */
function filterCompanysDepartment(array, filterWord){
    const newArray = array.filter(element => {
        if(element.companies.name === filterWord) {
            return element
        }
    })
    return newArray
}

function renderFilteredCompanyDepartment(array){
    const select = document.querySelector(".departments__select")
    const ul = document.querySelector(".departments__list")

    select.addEventListener("change", async (event) => {
        ul.innerHTML = ""

        if(select.value === "Selecionar Empresa"){
            renderCardDepartment(array)
        }

        const filtered = filterCompanysDepartment(array, select.value)
        renderCardDepartment(filtered)
    })
}

renderCardDepartment(await readAllDepartment())
renderFilteredCompanyDepartment(await readAllDepartment())


/* Modal criar departamento */
async function showCreateDepartmentModal(){
    const showButton = document.querySelector(".departments__button")
    const modal = document.querySelector(".modal-create-department")
    showButton.addEventListener("click", (event) => {
        modal.showModal()

        closeCreateDepartmentModal()
    })

    renderCopanyOptionToModal(await readAllCompanys())
}

function renderCopanyOptionToModal(array){
    const select = document.querySelector("#select-company")
    
    array.forEach(element => {
        const option = createOptionCompanysById(element) /* mudar esse */
        select.appendChild(option)
    })
}

function createOptionCompanysById(element){
    const option = document.createElement("option")
    option.innerText = element.name
    option.value = element.uuid
    return option
}

function closeCreateDepartmentModal(){
    const closeButton = document.querySelector(".clone-button")
    const modal = document.querySelector(".modal-create-department")

    closeButton.addEventListener("click", (event) => {
        event.preventDefault()
        modal.close()
    })
}
showCreateDepartmentModal()

function createDepartmentModal(){
    const inputs = document.querySelectorAll(".modal-create-department > form > input")
    const select = document.querySelector("#select-company")
    const buttonSend = document.querySelector(".modal-create-department > form > button")
    const newDepartment = {}

    buttonSend.addEventListener("click", async (event) => {
        event.preventDefault()
        
        inputs.forEach(input => {
            newDepartment[input.name] = input.value
        })

        newDepartment[select.name] = select.value

        const department = await createDepartment(newDepartment)
    })
    return newDepartment
}
createDepartmentModal()


/* modal-view-department */
async function createSelectModalViewDepartment/* And hire button */(element){
    const buttonHire = document.querySelector(".modal-view-department__select-info > button")
    const select = document.querySelector(".modal-view-department__select-info > select")
    const listToHire = await userOutOfWork()

    listToHire.forEach(user => {
        const option = document.createElement("option")
        option.innerText = user.username
        
        select.appendChild(option)
    })

    buttonHire.addEventListener("click", () => {

        const newUser = {}
        listToHire.filter(elementToHire => {

            if(select.value === elementToHire.username){
                newUser.user_uuid = elementToHire.uuid
                newUser.department_uuid = element
            }
            return newUser
        })
        toHireUser(newUser)
    })

    return select
}

async function createUlModalViewDepartment(departmentId){
    const ul = document.querySelector(".modal-view-department__list")
    const listHired = filterAllUserByDepartment(await allUser(), departmentId)

    listHired.forEach(user => {
        const li = document.createElement("li")
        const liTitle = document.createElement("h3")
        const liExp = document.createElement("p")
        const liKindOfWord = document.createElement("p")
        const offButton = document.createElement("button")

        li.classList.add("modal-view-department__iten")
        liTitle.innerText = user.username
        liExp.innerText = user.professional_level
        liKindOfWord.innerText = user.kind_of_work
        offButton.innerText = "Desligar"

        offButton.addEventListener("click", () => {
            dismissEmployee(user.uuid)
        })

        li.append(liTitle, liExp, liKindOfWord, offButton)
        ul.appendChild(li)
    })

    return ul
}

function filterAllUserByDepartment(array, filterId){
    const newArray = array.filter(element => {
        if(element.department_uuid === filterId){
            return element
        }
    })
    return newArray
}

function createModalViewDepartment(element){
    const modal = document.querySelector(".modal-view-department")

    const closeButton  = document.createElement("span")

    /* request do proprio departamento clicado */
    const title = document.createElement("h2")
    const divContainer = document.createElement("div")
    const divInfo = document.createElement("div")
    const h3Info = document.createElement("h3")
    const pInfo = document.createElement("p")

    /* requisição de funcionarios sem departamento */
    const divSelectInfo = document.createElement("div")
    const select = document.createElement("select")
    const option = document.createElement("option")
    const hireButton = document.createElement("button")

    const ul = document.createElement("ul")

    closeButton.innerText = "X"
    title.innerText = element.name
    divContainer.classList.add("modal-view-department__container")
    divInfo.classList.add("modal-view-department__info")
    h3Info.innerText = element.description
    pInfo.innerText = element.companies.name
    
    divSelectInfo.classList.add("modal-view-department__select-info")
    option.innerText = "Selecionar usuário"
    hireButton.classList.add("button--green")
    hireButton.innerText = "Contratar"
    
    ul.classList.add("modal-view-department__list")

    modal.append(closeButton, title, divContainer, ul)
    divContainer.append(divInfo, divSelectInfo)
    divInfo.append(h3Info, pInfo)
    divSelectInfo.append(select, hireButton)
    select.appendChild(option)

    createSelectModalViewDepartment(element.uuid)
    createUlModalViewDepartment(element.uuid)

    return modal
}

function showModalViewDepartment(sector){
    const modal = document.querySelector(".modal-view-department")
    modal.innerHTML = ""
    const modalCreat = createModalViewDepartment(sector)
    modalCreat.showModal()
    closeModalViewDepartment()
}

function closeModalViewDepartment(){
    const closeButton = document.querySelector(".modal-view-department > span")
    const modal = document.querySelector(".modal-view-department")
    
    closeButton.addEventListener("click", (event) => {
        event.preventDefault()
        modal.close()
    })
}

async function createModalEditDeparmentDescription(element){
    const input = document.querySelector(".modal-edit-department__form > input")
    const saveButton = document.querySelector(".modal-edit-department__form > button")
    const newEdit = {}

    input.value = element.description
    
    saveButton.addEventListener("click", (event) => {
        event.preventDefault()
        newEdit[input.name] = input.value
        console.log(newEdit)
        const edit = editDepartment(newEdit, element.uuid)
    })
}

function showModalEditDeparmentDescription(element){
    const modal = document.querySelector(".modal-edit-department")
    createModalEditDeparmentDescription(element)
    modal.showModal()
    closeModalEditDeparmentDescription()
}

function closeModalEditDeparmentDescription(){
    const modal = document.querySelector(".modal-edit-department")
    const closeButton = document.querySelector(".modal-edit-department-close-button")

    closeButton.addEventListener("click", (event) => {
        event.preventDefault()
        modal.close()
    })
}
 
/* modal-delete-department */
function createDeleteDepartmentModal(element){
    const title = document.querySelector(".modal-edit-delete__container > h2")
    const deleteButton = document.querySelector(".modal-edit-delete__container > button")

    title.innerText = `Realmente deseja deletar o Departamento ${element.name} e demitir seus funcionários?`

    deleteButton.addEventListener("click", (event) => {
        event.preventDefault()
        deleteDepartment(element.uuid)
    })
}

function showDeleteDepartmentModal(element){
    const modal = document.querySelector(".modal-edit-delete")
    createDeleteDepartmentModal(element)
    modal.showModal()
    closeDeleteDepartmentModal()
}

function closeDeleteDepartmentModal(){
    const modal = document.querySelector(".modal-edit-delete")
    const closeButton = document.querySelector(".modal-edit-delete__container > span")

    closeButton.addEventListener("click", (event) => {
        event.preventDefault()
        modal.close()
    })
}

/* usuario cadastrado */
function createCardRegisterdUser(element){
    const li = document.createElement("li")
    const name = document.createElement("h3")
    const experience = document.createElement("p")
    const kindOfWork = document.createElement("p")
    const divIcon = document.createElement("div")
    const pen = document.createElement("span")
    const iconPen = document.createElement("i")
    const trash = document.createElement("span")
    const iconTrash = document.createElement("i")

    li.classList.add("registered-users__iten")
    name.innerText = element.username
    experience.innerText = element.professional_level
    kindOfWork.innerText = element.kind_of_work
    divIcon.classList.add("registered-user__icon")
    iconPen.classList.add("fa-sharp")
    iconPen.classList.add("fa-solid")
    iconPen.classList.add("fa-pen")
    iconTrash.classList.add("fa-regular")
    iconTrash.classList.add("fa-trash-can")

    li.append(name, experience, kindOfWork, divIcon)
    divIcon.append(pen, trash)
    pen.appendChild(iconPen)
    trash.appendChild(iconTrash)

    pen.addEventListener("click", (event) => {
        event.preventDefault()
        captureDataModalEditeUser(element.uuid)
        showModalEditUser()
    })

    trash.addEventListener("click", () => {
        modalDeleteEditUser(element)
    })

    return li
}

async function appendRegisterUserInList(){
    const ul = document.querySelector(".registered-users__list")
    const list = await allUser()

    list.forEach(iten => {
        if(iten.username !== "ADMIN"){
            const li = createCardRegisterdUser(iten)
            ul.appendChild(li)
        }
    })
}
appendRegisterUserInList()

/* modal edit user */
function showModalEditUser(){
    const modal = document.querySelector(".modal-edit-user")
    modal.showModal()
    closeModalEditeUser()
}

function closeModalEditeUser(){
    const modal = document.querySelector(".modal-edit-user")
    const closeButton = document.querySelector(".modal-edit-user__container > span")

    closeButton.addEventListener("click", () => {
        modal.close()
    })
}

function captureDataModalEditeUser(id){
    const selectWorkType = document.querySelector(".kindOfWord")
    const selectExperience = document.querySelector(".experience")
    const editButon = document.querySelector(".modal-edit-user__container > button")
    const newObject = {}
    
    editButon.addEventListener("click", async () => {
        newObject.kind_of_work = selectWorkType.value
        newObject.professional_level = selectExperience.value
        
        const request = await editUser(newObject, id)
    })
}

function modalDeleteEditUser(element){
    const modal = document.querySelector(".modal-delete-user")
    modal.showModal()

    const closeButton = document.querySelector(".modal-delete-user__container > span")
    closeButton.addEventListener("click", () => {
        modal.close()
    })

    const name = document.querySelector(".modal-delete-user__container > h2")
    name.innerText = `Realmente deseja remover o usuário ${element.username}?`

    const deleteButton = document.querySelector(".modal-delete-user__container > button")
    deleteButton.addEventListener("click", async() => {
        await deleteUser(element.uuid)
    })
}

/* logout */
function logOut(){
    const button = document.querySelector(".header__button")
    button.addEventListener("click", () => {
        localStorage.setItem('user', "")
        window.location.replace("/")
    })
}
logOut()