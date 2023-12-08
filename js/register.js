let form = document.querySelector(".form");
let fname = document.querySelector("#fname");
let lname = document.querySelector("#lname");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let rePassword = document.querySelector("#repassword");
let btn = document.querySelector(".btn");

let newArr;
if(localStorage.pro != null){
    newArr = JSON.parse(localStorage.pro)
}else{

     newArr=[]
}


// كل الارقام من 0 الى 9 
// ^ not
// \s مسافة 
// \d ارقام 
// \m حرف

let num = /[0-9]/ 

const clear = ()=>{
    fname.value = ""
    lname.value= ""
    email.value= ""
    password.value= ""
    rePassword.value= ""
} 
form.onsubmit = function(e){
    e.preventDefault()
    validInput()
    function obj(fName,lName,em,thePassword,theRepasswird){
        let a = {
            fname : fName,
            lname:lName,
            email: em,
            password:thePassword,
            rePassword:theRepasswird
        }
        newArr.push(a)
        localStorage.setItem("pro", JSON.stringify(newArr))
    }
    if(fnameValid(fname.value) && lnameValid(lname.value) && emailValid(email.value) && passValid(password.value) && (rePassword.value === password.value)){
        obj(fname.value,lname.value,email.value,password.value,rePassword.value)
        clear()
        setTimeout(()=>{
            location.href='login.html';
        },1500)
        
        }else{
            return false
        }
}
const fnameValid= firstName =>{
    const re = /^[a-z0-9_-]{3,16}$/ig
    return re.test(firstName)
}
const lnameValid= firstName =>{
    const re = /^[a-z0-9_-]{3,16}$/ig
    return re.test(firstName)
}
const emailValid= emailName =>{
    const re = /^([a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]{3,})/ig;
    return re.test(emailName)
}
const passValid= pass =>{
    const re = /^([a-zA-Z0-9]{4,10})/ig;
    return re.test(pass)
}
const repassValid= repass =>{
    const re = /^([a-zA-Z0-9]{4,10})/ig;
    return re.test(repass)
 }

function validInput(){
    let theFirstName = fname;
    theFirstName.onblur = ()=>{
        if(fnameValid(fname.value) === false){
            document.querySelector(".error1").innerText = "minLength is 3 and maxLength is 16"
        }else{
              document.querySelector(".error1").innerText = ""
        };
    }
    let theLastName = lname;
    theLastName.onblur = ()=>{
        if(lnameValid(lname.value) === false){
            document.querySelector(".error2").innerText = "minLength is 3 and maxLength is 16"
        }else{
              document.querySelector(".error2").innerText = ""
        }
    }
    let theEmail = email;
    theEmail.onblur = ()=>{
        if(newArr.length === 0){
            if(emailValid(email.value) === false){
                document.querySelector(".error3").innerText = "Invalid email format"
            }else{
                if(email.value === ""){
                }
                  document.querySelector(".error3").innerText = ""
            }
        }else{
            for(let i = 0; i<newArr.length;i++){
                if(newArr[i].email === email.value){
                    document.querySelector(".error3").innerText = "email already here"
                }else{
                    if(emailValid(email.value) === false){
                        document.querySelector(".error3").innerText = "Invalid email format"
                    }else{
                        if(email.value === ""){
                        }
                          document.querySelector(".error3").innerText = ""
                    }
                }
            }

        }


    }
    let thwPass = password;
    thwPass.onblur = ()=>{
        if(passValid(password.value) === false){
            document.querySelector(".error4").innerText = "Invalid password "
        }else{
              document.querySelector(".error4").innerText = ""
        }
    }
    let theRepass = rePassword;
    theRepass.onblur = ()=>{
        if(rePassword.value === password.value){
            document.querySelector(".error5").innerText = ""
        }else{
            document.querySelector(".error5").innerText = "rePassword do not match"
        }
    }
}
validInput()