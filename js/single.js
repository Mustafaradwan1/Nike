let header = document.querySelector(".header")
let pro =localStorage.Single
let product = JSON.parse(pro)
function getSingleData(){
    header.innerHTML = `
    <div class="row">
        <div class="col col-lg-2 col-md-3  col-12">
            <div class="images w-100">
                <img class="img" src="${product.img1}">
                <img class="img" src="${product.img2}" >
                <img class="img" src="${product.img3}" >
            </div>
        </div>
        <div class="col col-lg-6 col-md-9 col-12 mb-5">
            <div class="image">
                <img class="perantImg w-100" src="${product.img}">
            </div>
        </div>
        <div class="col col-lg-4 col-12">
            <div class="box">
                <h2>${product.head}</h2>
                <h3>${product.h3}</h3>
                <span>$${product.price}</span>
                <p class="span">${product.span}</p>
                <p>${product.p}</p>
            </div>
        </div>
    </div>
   `
   let perantImg =document.querySelector(".perantImg")
   let allImg =document.querySelectorAll(".img")
   allImg.forEach(img=>{
    img.addEventListener("mouseover",()=>{
        perantImg.src = img.src
    })
   })
}


   getSingleData()


