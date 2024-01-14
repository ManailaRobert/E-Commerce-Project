verifyAccountType()

document.addEventListener("DOMContentLoaded",loadSelectedBook)

function loadSelectedBook(){
  var selectedProduct =  localStorage.getItem("selectedProduct")
//request
const URL = `http://127.0.0.1:5000/api/book/${selectedProduct}`
const request = new XMLHttpRequest
request.open("GET",URL)
request.setRequestHeader("Access-Control-Allow-Origin", "true");
request.setRequestHeader("Content-Type", "application/json");
request.onload = onSuccess
request.onerror = showError
request.send()
function onSuccess()
{   var book = JSON.parse(request.response)
    var bookId = book.id
    var bookTitle = book.title
    var bookDescription = book.description
    var bookAuthor = book.author
    var bookPrice = book.price
    var bookImg = document.getElementsByTagName("img")[0]
    bookImg.src = `./assets/productImages/book${bookId}.jpeg`

    var title = document.getElementsByClassName("title")[0]
    title.innerHTML = bookTitle

    var author = document.getElementsByClassName("author")[0]
    author.innerHTML = "by "+bookAuthor

    var price = document.getElementsByClassName("price")[0]
    price.innerHTML = bookPrice +' lei'

    var addToCartBTN = document.getElementsByClassName("addToCart")[0]
    addToCartBTN.id =bookId
    addToCartBTN.addEventListener("click", function(){
        var cartItems =localStorage.getItem("cartItems")
        cartItems = cartItems+ ` ${event.target.id}`
        localStorage.setItem("cartItems",cartItems)
    })

    var productDescription = document.getElementsByClassName("productDescription")[0]
    productDescription.innerHTML = bookDescription
}
function showError()
{
    var response = JSON.stringify(request.response)
    console.error(response.message)
}
}
