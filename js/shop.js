let row = document.querySelector(".row-data")
let shopIcon = document.querySelectorAll(".shopIcon")
let spanIcon = document.querySelectorAll(".shopIcon span")
let contentData = document.querySelector(".contentData")
let boxs = document.querySelector(".contentData .boxs")
let contentIcon = document.querySelector(".contentData i")
let product;
let CatPro;
let findData=[]
if(localStorage.Single != null){
    product = JSON.parse(localStorage.Single)
}else{

    product={}
}
if(localStorage.Cart != null){
    CatPro = JSON.parse(localStorage.Cart)
}else{

    CatPro=[]
}
if(localStorage.findD != null){
    findData = JSON.parse(localStorage.findD)
   
}else{

    findData=[]
}

shopIcon.forEach(ele=>{
    ele.addEventListener("click",()=>{
        contentData.style.right = "0"
    })
})
contentIcon.addEventListener("click",()=>{
    contentData.style.right = "-180%"
})
// get json file 
async function getData(){
let api = await fetch("shop.json")
let response = await api.json()
return response
}
// get single product 
 async function singleData(id){
    const apiData =  await getData();
     apiData.find((find)=>{
        if(find.id === id){
             product = {
                img:find.img,
                head:find.head,
                h3:find.h3,
                price:find.price,
                span:find.span,
                p:find.discription,
                img1:find.img1,
                img2:find.img2,
                img3:find.img3,
            }
            localStorage.setItem("Single",JSON.stringify(product))  
            }
     
    })
}
// get cart product 
 async function CartData(id){
    const apiData =  await getData();
     apiData.find((find)=>{
        if(find.id === id){
            console.log(find.id)
            a = {
               id:find.id,
               img:find.img,
               quantity:find.quantity,
               head:find.head,
               h3:find.h3,
               price:find.price,
               span:find.span,
               color:find.color,
               p:find.discription
           }
           CatPro.push(a)
           localStorage.setItem("Cart",JSON.stringify(CatPro))  
           }
    })
}
// get bag product 
async function getId(id){
    const apiData =  await getData();
     apiData.find((find)=>{
        if(find.id === id){
            let findElement = {
                img:find.img,
                head:find.head,
                h3:find.h3,
                price:find.price,
                span:find.span,
                quantity:find.quantity
            }
            findData.push(findElement)
            localStorage.setItem("findD",JSON.stringify(findData));
            }
     
    })
    if(localStorage.findD !== null){
        let cartona = ``;
        for(let i = 0; i<findData.length; i++){
            cartona +=   `
            <div class="box d-flex justify-content-around mb-3">
            <div class="image">
                <img src="${findData[i].img}" >
            </div>
            <div class="text">
                <div class="info">
                    <h4>${findData[i].head}</h4>
                    <h5>${findData[i].h3}</h5>
                    <span>$${findData[i].price}</span>
                    <p>${findData[i].span}</p>
                </div>
            </div>
        </div>
               `
        }
        boxs.innerHTML = cartona
    }
    spanIcon.forEach(ele=>{
        ele.textContent = findData.length
    })
}

getId()
function hideBox(id){
    let hideAndShow = document.querySelector(".gotoLogin")
    if(localStorage.pro !== undefined){
        getId(id)
        CartData(id)
        hideAndShow.innerHTML = `
        <div class="icon">
            <i class="fa-solid fa-circle-xmark "></i>
        </div>
        <div class="box">
            <h5>product is added in card</h5
        </div>
        `
        hideAndShow.classList.add("show")

    }else{
        hideAndShow.innerHTML = `
        <div class="icon">
            <i class="fa-solid fa-circle-xmark "></i>
        </div>
        <div class="box">
            <h5>cant add product in cart </h5>
            <a href="login.html">login in now</a>
        </div>
        `
        hideAndShow.classList.add("show")
        
    }
    let icon = document.querySelector(".gotoLogin .icon")
    icon.addEventListener("click",()=>{
        hideAndShow.classList.remove("show")
    })
    setTimeout(()=>{
        hideAndShow.classList.remove("show")
    },5000)
}
async function showData(){
    // get all product
    const apiData =  await getData();
    const apiDataRandom = apiData.sort((a,b)=> 0.5-Math.random())
    // const resalutdata = apiDataRandom.slice(0,10);
    let mapData = apiDataRandom.map(ele=>{
    return `
    <div class="col col-lg-4 col-6 mb-5">
    <div class="box">
        <div class="image">
            <a href="single.html"><img src="${ele.img}" onclick="singleData(${ele.id})"></a>
        </div>
        <div class="text">
            <div class="box">
                <h2 >${ele.title}</h2>
                <h3>${ele.h3}</h3>

            </div>
            <span>$${ele.price}</span>
            <p>${ele.span}</p>
            <button class="btn btn-primary"  onclick="hideBox(${ele.id})">add to card</button>
        </div>
    </div>
</div>
    `
 }).join("")
 row.innerHTML = mapData
 fData(apiData)
}
showData()

function fData(api){
// sort high and low 
let sortData = document.querySelectorAll(".sortData li")
function compare(a, b) {
    const bandA = a.price;
    const bandB = b.price;
    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }
function compareHigh (a, b) {
    const bandA = a.price;
    const bandB = b.price;
    let comparison = 0;
    if (bandA < bandB) {
      comparison = 1;
    } else if (bandA > bandB) {
      comparison = -1;
    }
    return comparison;
  }
sortData.forEach(ele=>{
    ele.addEventListener("click",()=>{
        if(ele.className === "low"){
            let sortLow = api.sort(compare)
            let apiData = sortLow.map(ele=>{
                return `
            <div class="col col-md-4 mb-5">
            <div class="box">
                <div class="image">
                <a href="single.html"><img src="${ele.img}" onclick="singleData(${ele.id})"></a>
                </div>
                <div class="text">
                    <div class="box">
                        <h2>${ele.head}</h2>
                        <h3>${ele.h3}</h3>
                    </div>
                    <span>$${ele.price}</span>
                    <p>${ele.span}</p>
                    <button class="btn btn-primary"  onclick="hideBox(${ele.id})">add to card</button>
                </div>
            </div>
        </div>
            `
        }).join("")
        row.innerHTML = apiData;
        }else{
            let sortLow = api.sort(compareHigh)
            let apiData = sortLow.map(ele=>{
                return `
            <div class="col col-md-4 mb-5">
            <div class="box">
                <div class="image">
                <a href="single.html"><img src="${ele.img}" onclick="singleData(${ele.id})"></a>
                </div>
                <div class="text">
                    <div class="box">
                        <h2>${ele.head}</h2>
                        <h3>${ele.h3}</h3>
                    </div>
                    <span>$${ele.price}</span>
                    <p>${ele.span}</p>
                    <button class="btn btn-primary"  onclick="hideBox(${ele.id})">add to card</button>
                </div>
            </div>
        </div>
            `
        }).join("")
        row.innerHTML = apiData;
        }
    })
})

// filter by price
let check = document.querySelectorAll("input[name='radio']")
check.forEach(ele=>{
    ele.addEventListener("change",function(){
        let a = document.querySelector("input[name='radio']:checked").value
        let b = api.filter(solo=>{
            if(a === "0-50"){
                if(solo.price > 0 && solo.price < 50 ){
                    return solo
                }
            }else if(a === "50-100"){
                if(solo.price > 50 && solo.price < 100){
                    return solo
                }
            }else if(a === "100-150"){
                 if(solo.price > 100 && solo.price < 150){
                    return solo
                }
            }else if(a === "over$150"){
                if(solo.price > 150){
                    return solo
                }
            }
        }).map(ele=>{
                     return `
            <div class="col col-md-4 mb-5">
            <div class="box">
                <div class="image">
                <a href="single.html"><img src="${ele.img}" onclick="singleData(${ele.id})"></a>
                </div>
                <div class="text">
                    <div class="box">
                        <h2>${ele.head}</h2>
                        <h3>${ele.h3}</h3>
                    </div>
                    <span>$${ele.price}</span>
                    <p>${ele.span}</p>
                    <button class="btn btn-primary"  onclick="hideBox(${ele.id})">add to card</button>
                </div>
            </div>
        </div>
            `
        }).join("")
        row.innerHTML = b;
    })
})
// filter by  gender 
let ge = document.querySelectorAll(".gender li")
ge.forEach(ele =>{
    ele.addEventListener("click",()=>{
        let a = api.filter(fil=>{
            if(fil.gender === ele.textContent){
                return fil
            }
        }).map(ele=>{
            return `
            <div class="col col-md-4 mb-5">
            <div class="box">
                <div class="image">
                    <a href="single.html"><img src="${ele.img}" onclick="singleData(${ele.id})"></a>
                </div>
                <div class="text">
                    <div class="box">
                        <h2>${ele.head}</h2>
                        <h3>${ele.h3}</h3>
                    </div>
                    <span>$${ele.price}</span>
                    <p>${ele.span}</p>
                    <button class="btn btn-primary"  onclick="hideBox(${ele.id})">add to card</button>
                </div>
            </div>
        </div>
            `
        }).join("")
        row.innerHTML = a
    })
})

// filter by title 
let tit = document.querySelectorAll(".title li")
tit.forEach(ele =>{
    ele.addEventListener("click",()=>{
        let a = api.filter(fil=>{
            if(fil.title === ele.getAttribute("value")){
                return fil
            }
        }).map(ele=>{
            return `
            <div class="col col-md-4 mb-5">
            <div class="box">
                <div class="image">
                <a href="single.html"><img src="${ele.img}" onclick="singleData(${ele.id})"></a>
                </div>
                <div class="text">
                    <div class="box">
                        <h2>${ele.head}</h2>
                        <h3>${ele.h3}</h3>
                    </div>
                    <span>$${ele.price}</span>
                    <p>${ele.span}</p>
                    <button class="btn btn-primary"  onclick="hideBox(${ele.id})">add to card</button>
                </div>
            </div>
        </div>
            `
        }).join("")
        row.innerHTML = a
    })
})

// filter by color 
let colorSpan = document.querySelectorAll(".color .box span")
colorSpan.forEach(ele=>{
    let color = ele.getAttribute("value")
    ele.style.background = color
    ele.addEventListener("click",()=>{
        let filterData = api.filter(fill=>{
            if(ele.getAttribute("value")=== fill.color){
                return fill
            }
        }).map(ele=>{
            return `
            <div class="col col-md-4 mb-5">
            <div class="box">
                <div class="image">
                <a href="single.html"><img src="${ele.img}" onclick="singleData(${ele.id})"></a>
                </div>
                <div class="text">
                    <div class="box">
                        <h2>${ele.head}</h2>
                        <h3>${ele.h3}</h3>
                    </div>
                    <span>$${ele.price}</span>
                    <p>${ele.span}</p>
                    <button class="btn btn-primary"  onclick="hideBox(${ele.id})">add to card</button>
                </div>
            </div>
        </div>
            `
        }).join("")
        row.innerHTML = filterData
    })
})

}
let pSpan = document.querySelector(".fill p span")
let b = document.querySelector(".showFilter .fill")
let lol = document.querySelector(".boxDta .lol")
let kol = document.querySelector(".boxDta .kol")
let closeFilter = document.querySelector(".closeFilter")
var x = window.matchMedia("(max-width: 992px)")


function myFunction(x) {
  if (x.matches) { 
      b.addEventListener("click",()=>{
        lol.classList.replace("hide","show")
    })
    closeFilter.addEventListener("click",()=>{
        lol.classList.replace("show","hide")
    })

  } else {
    b.addEventListener("click",()=>{
        if(pSpan.textContent === "Hide"){
            pSpan.textContent = "Show"
        }else{
            pSpan.textContent = "Hide"
        }
    
        lol.classList.toggle("active1")
        kol.classList.toggle("active2")
    })
  }
}
myFunction(x);
x.addEventListener("change", function() {
  myFunction(x);
});

