document.addEventListener("DOMContentLoaded",loadOrders)
var userId = localStorage.getItem("userId")
localStorage.setItem("selectedOrder","0")
var main = document.getElementsByClassName("main")[0]
function loadOrders(){
    const URL = `http://127.0.0.1:5000/api/getAllOrders/${userId}`
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
            for(let key in response)
            {
                let orderID= key
                let datePlaced =response[key].datePlaced
                let dateReceived =response[key].dateReceived
                let totalPrice =response[key].totalPrice
                let productsIds =response[key].productsIds

                let orderItem = createAndAppend(main,"div","order")

                let orderIdText = createAndAppend(orderItem,"p")
                orderIdText.textContent = `Order ID: # ${orderID}`
                createAndAppend(orderItem,"hr")
                
                let imageContainer = createAndAppend(orderItem,'div','productImages') 
                for (let productId in productsIds)
                {
                    let productImage = createAndAppend(imageContainer,'img')
                    productImage.src = `./assets/productImages/book${productId}.jpeg`
                    imageContainer.appendChild(productImage)
                }
                let orderPrice = createAndAppend(orderItem,'p','price')
                orderPrice.textContent = `Total price: ${totalPrice} lei`

                let orderDatePlaced = createAndAppend(orderItem,'p','datePlaced')
                orderDatePlaced= `Date placed: ${datePlaced}`
                let orderStatus = createAndAppend(orderItem,'p','orderStatus')

                if(dateReceived == null)
                    orderStatus.textContent = "Order status: Not delivered"
                else
                    orderStatus.textContent = `Order status: Delivered on ${dateReceived}`

                let orderInfoAnchor = createAndAppend(orderItem,'a','orderInfo')
                orderInfoAnchor.id = orderID
                orderInfoAnchor.textContent = "OrderInfo"
                orderInfoAnchor.addEventListener("click", viewOrderStatus)

                main.appendChild(orderItem)
            }
        }
        
    }
    function showError()
    {
        var response = JSON.stringify(request.response)
        console.error(response.message)
    }
}

function viewOrderStatus(){
    let orderID = event.target.id
    localStorage.setItem("selectedOrder",orderID)
    window.location.replace("orderDetails.html")
}