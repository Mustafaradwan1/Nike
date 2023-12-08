let form = document.querySelector(".form")
let theEmail = document.querySelector("#email")
let thePass = document.querySelector("#password")
let erro = document.querySelector(".error4")


form.onsubmit = (e)=>{
    e.preventDefault()
     validInput()
     let a = JSON.parse(localStorage.getItem("pro"))
     a.forEach(e => {
        if(e.email === theEmail.value && e.password === thePass.value){
            setTimeout(()=>{
                location.href="index.html";
            },1500)
            erro.innerHTML = ""
        }else{
            erro.innerHTML = "dont match"
        }
     });

}

const emailValid= emailName =>{
    const re = /^([a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]{3,})/ig;
    return re.test(emailName)
}
const passValid= pass =>{
    const re = /^([a-zA-Z0-9]{4,10})/ig;
    return re.test(pass)
}

function validInput(){
    let theEmail = email;
    theEmail.onblur = ()=>{
        if(emailValid(email.value) === false){
            document.querySelector(".error3").innerText = "user name is needed"
        }else{
              document.querySelector(".error3").innerText = ""
        }
    }
    let thwPass = password;
    thwPass.onblur = ()=>{
        if(passValid(password.value) === false){
            document.querySelector(".error4").innerText = "user name is needed"
        }else{
              document.querySelector(".error4").innerText = ""
        }
    }

}
validInput()