verifyAccountType()

var userId =  localStorage.getItem("userId")

var myDetailsButton = document.getElementsByClassName("user")[0]
myDetailsButton.addEventListener("click",showDetails)



var myCardsButton = document.getElementsByClassName("cardsButton")[0]
myCardsButton.addEventListener("click",showCards)


function showDetails(){
    let rightSide = document.getElementsByClassName("rightSide")[0]

    let content =document.getElementsByClassName("content")[0]
    rightSide.removeChild(content)

    createRightSideContent_MyDetails()
}


function showCards(){
    let rightSide = document.getElementsByClassName("rightSide")[0]

    let content =document.getElementsByClassName("content")[0]
    rightSide.removeChild(content)

    createRightSideContent_MyCards()

}


function createRightSideContent_MyDetails()
{
    //request
    const URL = `http://127.0.0.1:5000/api/user/${userId}`
    const request1 = new XMLHttpRequest
    request1.open("GET",URL)
    request1.setRequestHeader("Access-Control-Allow-Origin", "true");
    request1.setRequestHeader("Content-Type", "application/json");
    request1.onload = onSuccess
    request1.onerror = showError
    request1.send()
    function onSuccess()
    {   
        let user = JSON.parse(request1.response)
        let rightSide = document.getElementsByClassName("rightSide")[0] 

        let content = createAndAppend(rightSide,"div","content1")
        content.classList.add("content")    

        createAndAppend(content,"hr")
        let saveBTN = createAndAppend(content,'button','saveChanges')
        saveBTN.textContent = "Save"
        saveBTN.addEventListener("click",saveDetails)

        createAndAppend(content,"hr")
        //username container creation
        let usernameContainer = createAndAppend(content,'div','usernameContainer')
        //label
        let usernameLabel = createAndAppend(usernameContainer,'label')
        usernameLabel.textContent = "Username:"
        
        //details
        let usernameDetails = createAndAppend(usernameContainer,'div','usernameDetails')
        
        //username details
        let usernameInput = createAndAppend(usernameDetails,"input","username")
        usernameInput.type = "text" 
        usernameInput.value = user.username


        createAndAppend(content,"hr")   


        //email container creation
        let emailContainer = createAndAppend(content,'div','emailContainer')
        //label
        let emailLabel = createAndAppend(emailContainer,'label')
        emailLabel.textContent = "Email:"   

        //details
        let emailDetails = createAndAppend(emailContainer,'div','emailDetails')
        
        //email details
        let emailInput = createAndAppend(emailDetails,"input","email")
        emailInput.type = "text"    
        emailInput.value= user.email


        createAndAppend(content,"hr")   


        // password container creation
        let passwordContainer = createAndAppend(content,'div','passwordContainer')
        //label
        let passwordLabel = createAndAppend(passwordContainer,'label')
        passwordLabel.textContent = "Password:" 

        //details
        let passwordDetails = createAndAppend(passwordContainer,'div','passwordDetails')
        
        //password details
        let passwordInput = createAndAppend(passwordDetails,"input","password")
        passwordInput.type = "password"
        passwordInput.value = user.password
        let viewPasswordBTN = createAndAppend(passwordDetails,"button","view")
        viewPasswordBTN.textContent = "View"
        viewPasswordBTN.addEventListener("click",viewPassword)  


        createAndAppend(content,"hr")   

        let adressContainer = createAndAppend(content,"div","adressContainer")
        //adress text
        let adressText = createAndAppend(adressContainer,"div","adressText")    

        //adress text content
        let adressTextLabel = createAndAppend(adressText,"label")
        adressTextLabel.textContent = "Adress"
        let adressInput = createAndAppend(adressText,'input','adressInput')
        adressInput.placeholder = "Type your adress here"
        let adressTextBTN = createAndAppend(adressText,"button", "addAdress")
        adressTextBTN.textContent ="Add"    
        adressTextBTN.addEventListener('click',addAdress)

        //adresses
        var adresses = createAndAppend(adressContainer,"div","adresses")  

       //load adresses
        
        //request
        const URL = `http://127.0.0.1:5000/api/adresses/${userId}`
        const request2 = new XMLHttpRequest
        request2.open("GET",URL)
        request2.setRequestHeader("Access-Control-Allow-Origin", "true");
        request2.setRequestHeader("Content-Type", "application/json");
        request2.onload = onSuccess
        request2.onerror = showError
        request2.send()

        function onSuccess()
        {   var response = JSON.parse(request2.response)
            //adress container
            for(let adressId in response){
                // add all adresses from db 

                var adressItem = createAndAppend(adresses,'div','adressItem')
                //adress item content
                let pElement = createAndAppend(adressItem,'p','details') 
                pElement.textContent= response[adressId].details
                let btnDelete = createAndAppend(adressItem,"button",'delete')
                btnDelete.textContent ="Delete"
                btnDelete.id = response[adressId].adressId
                btnDelete.addEventListener("click",deleteAdress)
                adresses.appendChild(adressItem)
            }
            
        }

        function showError()
        {
            var response = JSON.stringify(request2.response)
            console.error(response.message)
        }
    
        createAndAppend(content,"hr")   


        rightSide.appendChild(content)
    }
    function showError()
    {
        var response = JSON.stringify(request1.response)
        console.error(response.message)
    }
    
}

function createRightSideContent_MyCards(){
    let rightSide = document.getElementsByClassName("rightSide")[0]

    let content = createAndAppend(rightSide,"div","content2")
    content.classList.add("content")

    let addCardsContainer = createAndAppend(content,'div','addCards')
    let pElement = createAndAppend(addCardsContainer,'p')
    pElement.textContent = "Add Card:"

    let cardTypeInput = createAndAppend(addCardsContainer,'input','cardTypeInput')
    cardTypeInput.placeholder = "Card Type"

    let cardNumberInput = createAndAppend(addCardsContainer,'input','cardNumberInput')
    cardNumberInput.placeholder = "Card Number"
    cardNumberInput.type = "number"

    let cardHolderNameInput = createAndAppend(addCardsContainer,'input','cardHolderNameInput')
    cardHolderNameInput.placeholder = "Card Holder Name"

    let addCardButton = createAndAppend(addCardsContainer,'button','addCard')
    addCardButton.textContent = "Add"
    addCardButton.addEventListener("click", addCard)

    createAndAppend(content,"hr")
    
    //cards container
    var cardsContainer = createAndAppend(content,'div','cards')
    

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
        var cards = JSON.parse(request.response)
        console.log(cards)
        for(const cardId in cards){
            console.log(cardId)
            let card = createAndAppend(cardsContainer,'div','card')

            createAndAppend(card,"hr")
    
            let top = createAndAppend(card,'div','top')
            let cardType = createAndAppend(top,'p','cardType')
            cardType.textContent = cards[cardId].cardType
    
            let cardNumber = createAndAppend (top,'p','cardNumber')
            cardNumber.textContent = cards[cardId].cardNumber 
    
            let middle = createAndAppend(card,'div','middle')
            let cardHolderName = createAndAppend(middle,'p','cardHolderName')
            cardHolderName.textContent =cards[cardId].cardHolderName
    
            createAndAppend(card,"hr")
            let bottom = createAndAppend(card,'div','bottom')
            let btnDelete = createAndAppend(bottom,'button','delete')
            btnDelete.textContent = "Delete"
            btnDelete.id = cardId
            btnDelete.addEventListener("click",deleteCard)
            
            createAndAppend(card,"hr")
        } 
        createAndAppend(content,"hr")     
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

}

function addAdress(){
    var input = document.getElementsByClassName("adressInput")[0]
    var inputValue = input.value
    const URL = `http://127.0.0.1:5000/api/addAdress/${userId}`
    const request = new XMLHttpRequest
    request.open("POST",URL)
    request.setRequestHeader("Access-Control-Allow-Origin", "true");
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = onSuccess
    request.onerror = showError
    var data = {
     "Details":inputValue
    }
    var jsonData = JSON.stringify(data)
    request.send(jsonData)

    function onSuccess()
    {   
    }
    function showError()
    {
        var response = JSON.stringify(request.response)
        console.error(response.message)
    }
}
function addCard(){
    var inputCardType = document.getElementsByClassName("cardTypeInput")[0]
    var inputCardHolderName = document.getElementsByClassName("cardHolderNameInput")[0]
    var inputCardNumber = document.getElementsByClassName("cardNumberInput")[0]

    var inputCardTypeValue = inputCardType.value
    var inputCardHolderNameValue = inputCardHolderName.value
    var inputCardNumberValue = inputCardNumber.value
    const URL = `http://127.0.0.1:5000/api/addCard/${userId}`
    const request = new XMLHttpRequest
    request.open("POST",URL)
    request.setRequestHeader("Access-Control-Allow-Origin", "true");
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = onSuccess
    request.onerror = showError
    var data = {
        "cardHolderName":inputCardHolderNameValue,
        "cardNumber":inputCardNumberValue,
        "cardType": inputCardTypeValue
    }
    var jsonData = JSON.stringify(data)
    request.send(jsonData)

    function onSuccess()
    {   
    }
    function showError()
    {
        var response = JSON.parse(request.response)
        console.error(response.message)
    }
}
function deleteAdress(){
    let adressId = event.target.id
    const URL = `http://127.0.0.1:5000/api/deleteAdress/` + adressId
    const request = new XMLHttpRequest
    request.open("PUT",URL)
    request.setRequestHeader("Access-Control-Allow-Origin", "true");
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = onSuccess
    request.onerror = showError
    request.send()

    function onSuccess()
    {           
    }
    function showError()
    {
        var response = JSON.stringify(request.response)
        console.error(response.message)
    }
}

function saveDetails(){
    const URL = `http://127.0.0.1:5000/api/editUser/` + userId
    const request = new XMLHttpRequest
    request.open("PUT",URL)
    request.setRequestHeader("Access-Control-Allow-Origin", "true");
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = onSuccess
    request.onerror = showError

    var emailInput =document.getElementsByClassName("email")[0]
    var passwordInput =document.getElementsByClassName("password")[0]
    var usernameInput =document.getElementsByClassName("username")[0]

    var emailValue = emailInput.value
    var passwordValue= passwordInput.value
    var usernameValue= usernameInput.value

    data={
        "username": usernameValue,
        "email": emailValue,
        "password": passwordValue
    }
    var jsonData = JSON.stringify(data)
    request.send(jsonData)

    function onSuccess()
    {       
        var response = JSON.stringify(request.response)
        console.log(response.message)    
    }
    function showError()
    {
        var response = JSON.stringify(request.response)
        console.error(response.message)
    }
}
function deleteCard(){
    let cardId = event.target.id
    const URL = `http://127.0.0.1:5000/api/deleteCard/` + cardId
    const request = new XMLHttpRequest
    request.open("PUT",URL)
    request.setRequestHeader("Access-Control-Allow-Origin", "true");
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = onSuccess
    request.onerror = showError
    request.send()

    function onSuccess()
    {           
    }
    function showError()
    {
        var response = JSON.parse(request.response)
        console.error(response.message)
    }
}