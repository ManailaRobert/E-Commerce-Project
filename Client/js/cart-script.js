var cartPrice

document.addEventListener("DOMContentLoaded",onLoad)
var userId = localStorage.getItem("userId")
function onLoad(){
    verifyAccountType()
    showCartProducts()
    calculateTotalPrice()
    loadCards()
    loadAdresses()
}


function showCartProducts(){
    let cartItemsContent = localStorage.getItem("cartItems")

    if(cartItemsContent.length !== 0){
        let cartItems = cartItemsContent.split(";")

        for(let el in cartItems)
        {
        let id = parseInt(el) + 1
                    
        const URL = `http://127.0.0.1:5000/api/book/${id}`
        const request = new XMLHttpRequest
        request.open("GET",URL)
        request.setRequestHeader("Access-Control-Allow-Origin", "true");
        request.setRequestHeader("Content-Type", "application/json");
        request.onload = onSuccess
        request.onerror = showError
        request.send()
    
            function onSuccess()
            {   
                if(request.status == 200){
                    const book = JSON.parse(request.response)
                    var bookId = book.id
                    let bookPrice = book.price
                    let bookTitle = book.title
    
                    let itemsElement =  document.getElementsByClassName("items")[0]
                    let item = createAndAppend(itemsElement,"div","item")
                    item.id = bookId
                    let imgElement = createAndAppend(item,"img",'bookImg')
                    imgElement.src = `./assets/productImages/book${bookId}.jpeg`
                    imgElement.id = bookId
                    imgElement.addEventListener("click",function(){
                        localStorage.setItem("selectedProduct",event.target.id)
                        window.location.replace("productDetails.html")
                    })
                    let titleElement = createAndAppend(item,"p","title")
                    titleElement.innerHTML = bookTitle
                    titleElement.id = bookId
                    titleElement.addEventListener("click",function(){
                        localStorage.setItem("selectedProduct",event.target.id)
                        window.location.replace("productDetails.html")
                    })
                    let priceElement = createAndAppend(item,"p","price")
                    priceElement.innerHTML = `${bookPrice} lei`
    
                    let deleteBTN = createAndAppend(item,"button")
                    deleteBTN.innerHTML = "Remove from Cart"
                    deleteBTN.id = bookId
                    deleteBTN.classList = "removeItemBTN"
                    deleteBTN.addEventListener("click",removeCartItem)
    
                    }    
            }
    
            function showError()
            {
            var response = JSON.parse(request.response)
            console.error(response.message)
            }
    
        }
    
    
    }
    
}

function calculateTotalPrice(){
    let cartItemsContent = localStorage.getItem("cartItems")
    if(cartItemsContent.length !== 0)
    {
        let cartItems = cartItemsContent.split(";")
        var cartItemsData = {
            "products":{ }
        }
    
        for(let el in cartItems)
        {
            let id = parseInt(el) + 1
            cartItemsData["products"][id] = id
        }
    
        
    
        let data = JSON.stringify(cartItemsData)
        const URL = `http://127.0.0.1:5000/api/totalPriceForItems`
        const request = new XMLHttpRequest
        request.open("POST",URL)
        request.setRequestHeader("Access-Control-Allow-Origin", "true");
        request.setRequestHeader("Content-Type", "application/json");
        request.onload = onSuccess
        request.onerror = showError
        request.send(data)
    
        function onSuccess(){
            let response = JSON.parse(request.response)
            if(request.status === 200)
            {
                let totalPrice = response.totalPrice
                cartPrice = totalPrice
                let totalPriceElement =  document.getElementsByClassName("totalPrice")[0]
                totalPriceElement.textContent += totalPrice +" lei"
            
            }
        }
    
        function showError()
        {
            var response = JSON.parse(request.response)
            console.error(response.message)
        }
    }
    

}


function loadCards(){
        
        const URL = `http://127.0.0.1:5000/api/paymentMethods/` + userId
        const request = new XMLHttpRequest
        request.open("GET",URL)
        request.setRequestHeader("Access-Control-Allow-Origin", "true");
        request.setRequestHeader("Content-Type", "application/json");
        request.onload = onSuccess
        request.onerror = showError
        request.send()
    
        function onSuccess()
        {   
            if(request.status == 200){
            var response = JSON.parse(request.response)
                let paymentDetailsContainer = document.getElementsByClassName("paymentDetails")[0]
            
                for(let key in response)
                    {
                        let cardDetails = response[key]
                        let paymentDetail = createAndAppend(paymentDetailsContainer,'div','paymentDetail')
                        let radioBTN = createAndAppend(paymentDetail,"input","paymentRadio")
                        radioBTN.type = "radio"
                        radioBTN.classList.add("card")
                        radioBTN.id = key
                        radioBTN.name = "cardRadio"
                        let cardNumberElement = createAndAppend(paymentDetail,"p","cardNumber")
                        cardNumberElement.innerHTML = `${cardDetails.cardType} ${cardDetails.cardNumber}`
                        cardNumberElement.id = key
                        cardNumberElement.addEventListener('click',function(){
                            var radioID = event.target.id
                            var radio = document.querySelector(`input[name="cardRadio"][id = '${radioID}']`)
                            radio.checked = true
                        })
                    }
        
            }
    
            if(request.status == 204)
                {
                    console.log("No cards available.")
                }
                    
        }
        function showError()
        {
            var response = JSON.stringify(request.response)
            console.error(response.message)
        }

}

function loadAdresses(){

        
    const URL = `http://127.0.0.1:5000/api/adresses/` + userId
    const request = new XMLHttpRequest
    request.open("GET",URL)
    request.setRequestHeader("Access-Control-Allow-Origin", "true");
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = onSuccess
    request.onerror = showError
    request.send()

    function onSuccess()
    {   
        if(request.status == 200){
            var response = JSON.parse(request.response)
            let adressDetailsContainer = document.getElementsByClassName("adressDetails")[0]
        
            for(let key in response)
                {
                    let adress = response[key]
                    let adressId = adress.adressId
                    let adressDetails = adress.details


                    let adressDetail = createAndAppend(adressDetailsContainer,'div','adressDetail')

                    let radioBTN = createAndAppend(adressDetail,"input","adressRadio")
                    radioBTN.type = "radio"
                    radioBTN.classList.add("adress")
                    radioBTN.id = adressId
                    radioBTN.name = "adressRadio"

                    let adressDetailsElement = createAndAppend(adressDetail,"p","details")
                    adressDetailsElement.innerHTML = `${adressDetails}`
                    adressDetailsElement.id = key
                    adressDetailsElement.addEventListener('click',function(){
                        var radioID = event.target.id
                        var radio = document.querySelector(`input[name="adressRadio"][id = '${radioID}']`)
                        radio.checked = true
                    })                }
    
        }

        if(request.status == 204)
            {
                console.log("No cards available.")
            }
                
    }
    function showError()
    {
        var response = JSON.stringify(request.response)
        console.error(response.message)
    }




}

function placeOrder(){


    var userId = localStorage.getItem("userId")
    let datePlaced =getCurentDate()
    let cartItemsContent = localStorage.getItem("cartItems")
    if(cartItemsContent.length === 0)
        alert("No products in cart")
    else{
        let cartItems = cartItemsContent.split(";")
        var cartItemsData = {
            "products":{ }
        }
    
        for(let el in cartItems)
        {
            let id = parseInt(el) + 1
            cartItemsData["products"][id] = id
        }

        try{
            var paymentId = document.querySelector('input[name="cardRadio"]:checked').id
            try{
    
                var adressId = document.querySelector('input[name="adressRadio"]:checked').id
                var data = {
                    "userId":userId,
                    "totalPrice":cartPrice,
                    "datePlaced":datePlaced,
                    "adressId":adressId,
                    "paymentId":paymentId,
                    "products":cartItemsData["products"]
                }
    
            const URL = `http://127.0.0.1:5000/api/createOrder`
            const request = new XMLHttpRequest
            request.open("POST",URL)
            request.setRequestHeader("Access-Control-Allow-Origin", "true");
            request.setRequestHeader("Content-Type", "application/json");
            request.onload = onSuccess
            request.onerror = showError
            var jsonData = JSON.stringify(data)
                
            request.send(jsonData)
    
            function onSuccess()
            {   
                var response = JSON.parse(request.response)
    
                if(request.status == 200){
                    alert(response.message)
                    localStorage.setItem("cartItems",'')
                }
                if(request.status == 400)
                    alert(response.message)
    
    
            }
            function showError()
            {
                var response = JSON.stringify(request.response)
                console.error(response.message)
            }
                
            }
            catch{
                alert("No selected adress.")
            }
        }
        catch{
            alert("No selected payment.")
        }
    }
    

}

function removeCartItem(){
    let itemId = event.target.id
    let itemsElement =  document.getElementsByClassName("items")[0]


    let itemToRemove = document.getElementById(itemId)
    itemsElement.removeChild(itemToRemove)
  
    let availableItems = document.getElementsByClassName("item")
    
    let cartItems = ""
    let array = Array.from(availableItems)
    array.forEach(function (el)
    {
        if(cartItems.length === 0)
            cartItems += el.id 
        else
            cartItems +=";"+ el.id 
    })

    localStorage.setItem("cartItems",cartItems)
}

function getCurentDate(){
    var curentDate = new Date()
    var dayData = curentDate.getDate()
    if(dayData<10)
        var day = 0 + `${dayData}`
    else 
        var day = dayData

    var monthData = curentDate.getMonth()+1
    if(monthData<10)
        var month = 0 + `${monthData}`
    else 
        var month = dayData

    var year = curentDate.getFullYear()
    var date = `${day}/${month}/${year}`
    return date
}