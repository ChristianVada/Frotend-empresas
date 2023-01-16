import {toast} from "./toastify.js"

const red = "#C20803"
const green = "#08C203"

/* Requisiçaõ de usuários */
export function getUser(){
    const user = JSON.parse(localStorage.getItem("user"))
    return user
}

export async function validateUser(){
    const user = getUser()
    if(user !== null){
        const {token} = user
    
        const validadeUser = await fetch(`http://localhost:6278/auth/validate_user`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const validadeUserJson = await validadeUser.json()   
        return validadeUserJson
    }
}

export async function login(data) {
    const loginData = await fetch(`http://localhost:6278/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })

    const loginDataJson = await loginData.json()

    if(!loginData.ok){
        toast(loginDataJson.error, red)
    }else{
        toast("Login realizado com sucesso", green)
        window.location.replace("/src/pages/admin.html")
    }

    return loginDataJson
}

export async function createUser(data) {
    const userData = await fetch(`http://localhost:6278/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })

    const userDataJson = await userData.json()

    if(!userData.ok){
        toast(userDataJson.error, red)
    }else{
        toast("Usuário cadastrado com sucesso", green)
    }
    return userDataJson
}


/* Requisições de departamento */
export async function createDepartment(data){
    const user = getUser()
    const {token} = user

    const department = await fetch(`http://localhost:6278/departments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })

    const departmentJson = await department.json()

    if(!department.ok){
        toast(departmentJson.error, red)
    }else{
        toast("Departamento cadastrado com sucesso", green)
    }
}

export async function editDepartment(data, product_id){
    const user = getUser()
    const {token} = user

    const department = await fetch(`http://localhost:6278/departments/${product_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data), 
    })

    const departmentJson = await department.json()

    if(!department.ok){
        toast(departmentJson.error, red)
    }else{
        toast("Departamento editado", green)
    }

    return departmentJson
}

export async function readAllDepartment(){
    const user = getUser()
    const {token} = user

    const department = await fetch(`http://localhost:6278/departments`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })

    const departmentJson = await department.json()

    if(!department.ok){
        toast(departmentJson.error, red)
    }
    
    return departmentJson
}

export async function deleteDepartment(product_id){
    const user = getUser()
    const {token} = user

    const department = await fetch(`http://localhost:6278/departments/${product_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })

    if(!department.ok){
        toast(department.error, "#C20803")
    }else{
        toast("Departamento deletado com sucesso", green)
    }
}

/* Requisições de companias */
export async function readAllCompanys(){
    const companies = await fetch(`http://localhost:6278/companies`, {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    })
    const companiesJson = companies.json()
    return companiesJson
}

/* Requsição de  usuários*/
export async function userOutOfWork(){
    const user = getUser()
    const {token} = user

    const userOut = await fetch(`http://localhost:6278/admin/out_of_work`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })

    const userOutJson = await userOut.json()

    if(!userOut.ok){
        toast(userOutJson.error, red)
    }
    
    return userOutJson
}

export async function allUser(){
    const user = getUser()
    const {token} = user

    const allUser = await fetch(`http://localhost:6278/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })

    const allUserJson = await allUser.json()

    if(!allUser.ok){
        toast(allUserJson.error, red)
    }
    
    return allUserJson
}

export async function toHireUser(data){
    const user = getUser()
    const {token} = user

    const userToHire = await fetch(`http://localhost:6278/departments/hire/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    const userToHireJson = await userToHire.json()

    if(!userToHire.ok){
        toast(userToHireJson.error, red)
    }else{
        toast("Usuário adicionado com sucesso", green)
    }
    
    return userToHireJson
}

export async function dismissEmployee(data){
    const user = getUser()
    const {token} = user

    const dismiss = await fetch(`http://localhost:6278/departments/dismiss/${data}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })

    const dismissJson = await dismiss.json()

    if(!dismiss.ok){
        toast(dismissJson.error, red)
    }else{
        toast("Usuário removido com sucesso", green)
    }
    
    return dismissJson
}

export async function editUser(data, id){
    const user = getUser()
    const {token} = user

    const editUser = await fetch(`http://localhost:6278/admin/update_user/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    const editUserJson = await editUser.json()

    if(!editUser.ok){
        toast(editUserJson.error, red)
    }else{
        toast("Editado com sucesso", green)
    }
    
    return editUserJson
}

export async function deleteUser(id){
    const user = getUser()
    const {token} = user

    const deleteUser = await fetch(`http://localhost:6278/admin/delete_user/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })

    if(!deleteUser.ok){
        toast(deleteUserJson.error, red)
    }else{
        toast("Usuário deletado com sucesso", green)
    }    
}

/* Funcionários */
export async function searchLoggedEmployee(){
    const user = getUser()
    const {token} = user

    const logeedUser = await fetch(`http://localhost:6278/users/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })

    const logeedUserJson = await logeedUser.json()

    if(!logeedUser.ok){
        toast(logeedUserJson.error, red)
    }
    
    return logeedUserJson
}

export async function loggedEditUser(data){
    const user = getUser()
    const {token} = user

    const loggedEditUser = await fetch(`http://localhost:6278/users`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    const loggedEditUserJson = await loggedEditUser.json()

    if(!loggedEditUser.ok){
        toast(loggedEditUserJson.error, red)
    }else{
        toast("Editado com sucesso", green)
    }
    
    return loggedEditUserJson
}

export async function listCoworkersUser(){
    const user = getUser()
    const {token} = user

    const coworkersUser = await fetch(`http://localhost:6278/users/departments/coworkers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })

    const coworkersUserJson = await coworkersUser.json()

    if(!coworkersUser.ok){
        toast(coworkersUserJson.error, red)
    }
    return coworkersUserJson
}

export async function listDepartmentsUser(){
    const user = getUser()
    const {token} = user

    const deparmentUser = await fetch(`http://localhost:6278/users/departments`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })

    const departmentUserJson = await deparmentUser.json()

    if(!deparmentUser.ok){
        toast(departmentUserJson.error, red)
    }
    return departmentUserJson
}