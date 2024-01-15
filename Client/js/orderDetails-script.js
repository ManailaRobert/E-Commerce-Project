localStorage.setItem("selectedProduct","0")
document.addEventListener("DOMContentLoaded",displayOrder)



function displayOrder(){
    var selectedOrderID =  localStorage.getItem("selectedOrder")
    //request
    const URL = `http://127.0.0.1:5000/api/getOrderDetails/${selectedOrderID}`
    const request = new XMLHttpRequest
    request.open("GET",URL)
    request.setRequestHeader("Access-Control-Allow-Origin", "true");
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = onSuccess
    request.onerror = showError
    request.send()
    function onSuccess()
    {   
        var response = JSON.parse(request.response)
        if(request.status == 200){
            let cardHolderNameDetails = response[selectedOrderID].cardHolderName
            let cardNumberDetails = response[selectedOrderID].cardNumber
            let cardTypeDetails = response[selectedOrderID].cardType
            let datePlacedDetails = response[selectedOrderID].datePlaced
            let dateReceivedDetails = response[selectedOrderID].dateReceived
            let orderAdressDetails = response[selectedOrderID].orderAdress
            let productsDetails = response[selectedOrderID].products
            let totalPriceDetails = response[selectedOrderID].totalPrice

            let orderId = document.getElementsByClassName("orderId")[0]
            orderId.innerHTML = `Order ID: # ${selectedOrderID} |`

            let orderDate = document.getElementsByClassName("orderDate")[0]
            orderDate.innerHTML = `Placed on : ${datePlacedDetails} `
            if(dateReceivedDetails != null)
                orderDate.innerHTML +=`| Delivered on: ${dateReceivedDetails}`

            let orderContent = document.getElementsByClassName("orderContent")[0]

            for(let key in productsDetails)
            {
                let product = productsDetails[key]
                let productId = product.productId
                let productTitle = product.title
                let productPrice = product.price

                let productItem = createAndAppend(orderContent, "div", "item")
                let productImage = createAndAppend(productItem,"img")
                productImage.src = `./assets/productImages/book${productId}.jpeg`
                productImage.addEventListener("click",function(){
                    localStorage.setItem("selectedProduct",productId)
                    window.location.replace("productDetails.html")
                })
                let productAnchor = createAndAppend(productItem,"a")
                productAnchor.addEventListener("click",function(){

                    localStorage.setItem("selectedProduct",productId)
                    window.location.replace("productDetails.html")
                })
                productAnchor.textContent =  productTitle
                let pElement = createAndAppend(productItem,"p","price")
                pElement.textContent =  `${productPrice} lei`

            }
            let totalPrice = document.getElementsByClassName("totalPrice")[0]
            console.log(totalPrice)
            totalPrice.innerHTML = `Total price: ${totalPriceDetails}`
            let adressDetails = document.getElementsByClassName("details")[0]
            adressDetails.innerHTML = orderAdressDetails


            let cardType = document.getElementsByClassName("cardType")[0]
            cardType.innerHTML += cardTypeDetails
            let cardNumber = document.getElementsByClassName("cardNumber")[0]
            cardNumber.innerHTML += cardNumberDetails
            let cardHolderName = document.getElementsByClassName("cardHolderName")[0]
            cardHolderName.innerHTML += cardHolderNameDetails

        
            
        }
    }
    function showError()
    {
        var response = JSON.stringify(request.response)
        console.error(response.message)
    }
    
}