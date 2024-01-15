document.addEventListener("DOMContentLoaded",onLoad)
var userId = localStorage.getItem("userId")
function onLoad(){
    //cards

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
                    radioBTN.addEventListener("checked",removeCheck)
                    let cardNumberElement = createAndAppend(paymentDetail,"p","cardNumber")
                    cardNumberElement.innerHTML = `${cardDetails.cardType} ${cardDetails.cardNumber}`

                    paymentDetailsContainer.appendChild(paymentDetail)
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




function viewPassword(){
    let passwordInput = document.getElementsByClassName("password")[0]
    if(passwordInput.type == "password")
        passwordInput.type = "text"
    else
        passwordInput.type = "password"


    //adresses
}

function removeCheck(){

}