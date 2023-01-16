function menuToggle(){
    const buttonMenu = document.querySelector(".header__buttonCollapse")
    buttonMenu.addEventListener("click", (e) => {
        const menu = document.querySelector(".header__menu")
        menu.classList.toggle("active")

        if(menu.classList.contains("active")) {
            document.querySelector(".icon").src = "../img/Vector x.svg"
        } else {
            document.querySelector(".icon").src = "../img/Vector barra.svg"
        }
    })
}
menuToggle()
