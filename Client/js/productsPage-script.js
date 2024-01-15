var container = document.getElementsByClassName("container")[0]
var main = document.getElementsByClassName("main")[0]
var searchInput = document.getElementById("searchBox")
var btnSearch = document.getElementsByClassName("search")[0]
btnSearch.addEventListener("click",searchBooks)

document.addEventListener("DOMContentLoaded",onLoadPage)
function onLoadPage(){
// localStorage.setItem("cartItems","")
localStorage.setItem("selectedProduct","0")
verifyAccountType()
addProducts()
}

function addProducts(){
    //request
    const URL = "http://127.0.0.1:5000/api/books"
    const request = new XMLHttpRequest
    request.open("GET",URL)
    request.setRequestHeader("Access-Control-Allow-Origin", "true");
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = onSuccess
    request.onerror = showError
    request.send()

    function onSuccess()
    {   var books = JSON.parse(request.response)
        loadBooks(books)
    }
    function showError()
    {
        var response = JSON.stringify(request.response)
        console.error(response.message)
    }
}

function searchBooks(){
   var input = searchInput.value
   const URL = `http://127.0.0.1:5000/api/searchBooks/${input}`
   const request = new XMLHttpRequest
   request.open("GET",URL)
   request.setRequestHeader("Access-Control-Allow-Origin", "true");
   request.setRequestHeader("Content-Type", "application/json");
   request.onload = onSuccess
   request.onerror = showError
   request.send()

   function onSuccess()
   {   
    var books = JSON.parse(request.response)
        container.removeChild(main)
        createAndAppend(container,"div","main")
        main = document.getElementsByClassName("main")[0]
       loadBooks(books)
   }
   function showError()
   {
       var response = JSON.stringify(request.response)
   }
}

function loadBooks(books)
{
    for(let key in books){
        var product = createAndAppend(main,"div","product")
        var productContent = createAndAppend(product,"div","productContent")
        productContent.id = books[key].id
        productContent.addEventListener("click", itemClick)

        var bookImg = createAndAppend(productContent,'img')
        bookSorce = "./assets/productImages/book" + books[key].id +".jpeg"
        bookImg.src = bookSorce
        bookImg.id = books[key].id
        productContent.addEventListener("click", itemClick)

        createAndAppend(productContent,'hr')

        var title = createAndAppend(productContent,'div',"title")
        title.textContent = books[key].title
        title.id = books[key].id
        title.addEventListener("click", itemClick)

        var author = createAndAppend(productContent,'div',"title")
        author.textContent = "by "+books[key].author
        author.id = books[key].id
        author.addEventListener("click", itemClick)

        var price = createAndAppend(productContent,'div',"title")
        price.textContent = books[key].price + " lei"
        price.id = books[key].id
        price.addEventListener("click", itemClick)

        var addToCartBTN= createAndAppend(product,"button","addToCart")
        addToCartBTN.id = books[key].id
        addToCartBTN.addEventListener("click",function(){
            var cartItems =localStorage.getItem("cartItems")
            cartItems = cartItems+ ` ${event.target.id}`
            localStorage.setItem("cartItems",cartItems)
        })
        addToCartBTN.textContent = "Add to cart"

        main.appendChild(product)
    }
}


function itemClick(){
    localStorage.setItem("selectedProduct",event.target.id)
    window.location.replace("productDetails.html")
}