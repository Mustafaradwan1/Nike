let product = JSON.parse(localStorage.Cart)
let find = JSON.parse(localStorage.findD)
function setData(){
let curr = 1;
    let head = document.querySelector(".header .Data")
        let cartona=``;
        for(let i =0; i<product.length; i++){
            cartona +=          `
            <div class="box">
                <div class="row">
                    <div class="col  col-4 mb-4">
                        <div class="image">
                            <img class="w-100 h-100" src="${product[i].img}">
                        </div>
                    </div>
                    <div class="col mb-5  col-8">
                        <div class="text">
                            <div class="d-flex justify-content-between">
                                <h5>${product[i].head}</h5>
                                <span class="fw-bold price">${product[i].price}</span>
                            </div>
                            <p class="m-0">${product[i].h3}</p>
                            <p class="mb-4">${product[i].color}</p>
                            <div class="Quantity d-flex align-item-center">
                                Quantity :
                                <div class="icon ms-3"><i class="fa-solid fa-plus plus"></i></div> 
                                <span class="sp mx-2">${product[i].quantity}</span>
                                <div class="icon"><i class="fa-solid fa-minus minus"></i></div> 
                            </div>
                            <div class=" iconDelate mt-3">
                                <i class="fa-regular fa-heart me-4 fs-4"></i>
                                <i class="fa-solid fa-trash-can fs-4 Delate" onclick="DelateA(${i})"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        }
    head.innerHTML = cartona
    let price = document.querySelectorAll(".price")
    let sp = document.querySelectorAll(".sp")
    let plus= document.querySelectorAll(".plus")
    let minus = document.querySelectorAll(".minus")

    // click plus icon
    for(let i = 0; i<plus.length; i++){
        plus[i].addEventListener("click",()=>{
            product[i].quantity++
            sp[i].textContent =  product[i].quantity
            let a  =   product[i].price * product[i].quantity
            price[i].textContent =  a
            subtotalEle()
        })
    }
    // click minus icon
    for(let i = 0; i<minus.length; i++){
        let b = product[i].price
        minus[i].addEventListener("click",()=>{
            if(product[i].quantity > 1){
                product[i].quantity--
                sp[i].textContent =  product[i].quantity;
                console.log(product[i].quantity)
                let a  =   product[i].price * product[i].quantity;
                price[i].textContent =  a;
                subtotalEle()
            }
        })
    }
   
    let total = document.querySelector(".total")
    let numOfEstimated = document.querySelector(".numOfEstimated")
    let numOfTotal = document.querySelector(".numOfTotal")
    let Estimated = 7;
    function subtotalEle(){
        if(product.length >=1){
            let num = 0;
            for(let i = 0; i < product.length; i++){
                num += +price[i].textContent
                console.log(product[i])
                total.textContent = "$" + num;
            }
            numOfEstimated.textContent = "$" + Estimated;
            let totalPrice = num + Estimated
            numOfTotal.textContent = "$" + totalPrice;
        }else{
            total.textContent = "$0"
            numOfEstimated.textContent = "$0"
            numOfTotal.textContent = "$0";
        }
    }
    subtotalEle()
}
setData()
let hideAndShow = document.querySelector(".gotoLogin")
if(product.length >= 1){
    function DelateA(i){
        product.splice(i,1)
        localStorage.Cart = JSON.stringify(product)
        find.splice(i,1)
        localStorage.findD = JSON.stringify(find)
        hideAndShow.classList.add("show")
        hideAndShow.innerHTML = `
        <div class="icon">
            <i class="fa-solid fa-circle-xmark "></i>
        </div>
        <div class="box">
            <h5> product is removed </h5>
        </div>
        `
        let icon = document.querySelector(".gotoLogin .icon")
        icon.addEventListener("click",()=>{
            hideAndShow.classList.remove("show")
        })
        setTimeout(()=>{
            hideAndShow.classList.remove("show")
        },5000)
        setData()
    }
}else{
    hideAndShow.classList.add("show")
    hideAndShow.innerHTML = `
    <div class="icon">
    </div>
    <div class="box">
        <h5> no data to show </h5>
    </div>
    `
}


