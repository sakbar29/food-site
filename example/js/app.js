
const tabs = document.querySelectorAll(".tabheader__item")
const tabsParent = document.querySelector(".tabheader__items")
const tabContent = document.querySelectorAll(".tabcontent")
const tabContentImages = document.querySelectorAll('.tabcontent img')
const hideTabContent = () => {
    tabContent.forEach((item) => {
        item.style.display = "none"
    })
    tabs.forEach((item) => {
        item.classList.remove("tabheader__item_active")
    })
    tabContentImages.forEach((item) => {
        item.style.opacity = '0.5'
    })
}
const showTabContent = (i = 3) => {
    tabContent[i].style.display = "block"
    setTimeout(() => {
        tabContentImages[i].style.opacity = '1'
    },0)
    tabs[i].classList.add("tabheader__item_active")
}
hideTabContent()
showTabContent()
hideTabContent()
showTabContent()
tabsParent.addEventListener("click", (event) => {
    const target = event.target
    if(target.classList.contains("tabheader__item")){
        tabs.forEach((item, i) => {
            if(target === item){
                console.log(i)
                hideTabContent()
                showTabContent(i)
            }
        })
    }
})
let currSlide = 0;
setInterval(() => {
    if (currSlide <= 3) {
        hideTabContent()
        showTabContent(currSlide)
        currSlide++
    } else {
        currSlide = 0
        hideTabContent()
        showTabContent(currSlide)
    }
},5000);
const modal = document.querySelector(".modal")
const modalTrigger = document.querySelector(".btn_white")
const closeModalBtn = document.querySelector(".modal__close")
const openModal = () => {
    modal.classList.add("show")
    modal.classList.remove("hide")
    document.body.style.overflow = "hidden"
}
modalTrigger.addEventListener("click", openModal)



const closeModal = () => {
    modal.classList.add("hide")
    modal.classList.remove("show")
    document.body.style.overflow = ""
}
closeModalBtn.addEventListener('click',closeModal);

let isModalOpened = false
window.onscroll = () => {
    if (document.documentElement.scrollTop >= 3400 && isModalOpened === false) {
        isModalOpened = true
        openModal();
    }
}
document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('show')) {
        closeModal();
    }
});

const message = {
    loading: "Идет загрузка...",
    success:"Спасибо, скоро свяжемся",
    fail:"Что-то пошло не так"
}
const forms = document.querySelectorAll("form")
const postData = (form) => {
    form.addEventListener("submit", (e) =>{
        e.preventDefault()
        const messageBlock = document.createElement("div")
        messageBlock.textContent = message.loading
        form.append(messageBlock)
        const request = new XMLHttpRequest()
        request.open("POST","server.php")
        request.setRequestHeader("Content-type","application/json")
        const formData = new FormData(form)
        const object ={}
        formData.forEach((item,i) => {
            const arr = [item,i]
            console.log(arr)
            object[i] = item
        })
        console.log(object)
        const json = JSON.stringify(object)
        request.send(json)
        request.addEventListener("load", ()=>{
            if (request.status === 200) {
                console.log("ok")
                console.log("good")
                messageBlock.textContent = message.success
            }else {
                console.log("not ok")
                console.log("bad")
                messageBlock.textContent = message.fail
            }
        })
    })
}
forms.forEach((item) => {
    postData(item)
})

