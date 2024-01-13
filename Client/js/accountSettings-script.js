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

function createAndAppend(parent,tag,className){
    let element = document.createElement(tag)
    if(className)
        element.classList.add(className)
    parent.appendChild(element)
    return element
}

function createRightSideContent_MyDetails()
{
    let rightSide = document.getElementsByClassName("rightSide")[0]

    let content = createAndAppend(rightSide,"div","content1")
    content.classList.add("content")

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
    let changeUsernameBTN = createAndAppend(usernameDetails, "button", "changeUsername")
    changeUsernameBTN.textContent = "Change"



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
    let changeEmailBTN = createAndAppend(emailDetails, "button", "changeEmail")
    changeEmailBTN.textContent = "Change"


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
    let changePasswordBTN = createAndAppend(passwordDetails, "button", "changePassword")
    changePasswordBTN.textContent = "Change"
    let viewPasswordBTN = createAndAppend(passwordDetails,"button","view")
    viewPasswordBTN.textContent = "View"
    viewPasswordBTN.addEventListener("click",viewPassword)


    createAndAppend(content,"hr")

    //adress container
    let adressContainer = createAndAppend(content,"div","adressContainer")
    //adress text
    let adressText = createAndAppend(adressContainer,"div","adressText")

    //adress text content
    let adressTextLabel = createAndAppend(adressText,"label")
    adressTextLabel.textContent = "Adress"
    let adressTextBTN = createAndAppend(adressText,"button", "addAdress")
    adressTextBTN.textContent ="Add"

    //adresses
    let adresses = createAndAppend(adressContainer,"div","adresses")

    // add all adresses from db

    let adressItem = createAndAppend(adresses,'div','adressItem')
    
    //adress item content
    // let pElement = createAndAppend(adressItem,'p','details')

    // pElement.textContent= from DB
    // let btnDelete = createAndAppend(adressItem,"button",'delete')
    // btnDelete.textContent ="Delete"
    // btnDelete.id = from DB

    createAndAppend(content,"hr")


rightSide.appendChild(content)
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

    createAndAppend(content,"hr")
    
    //cards container
    let cards = createAndAppend(content,'div','cards')
    
    //card 
    let card = createAndAppend(cards,'div','card')

    createAndAppend(card,"hr")

    let top = createAndAppend(card,'div','top')
    let cardType = createAndAppend(top,'p','cardType')
    cardType.textContent = "Visa"//from db

    let cardNumber = createAndAppend (top,'p','cardNumber')
    cardNumber.textContent = "3912873091" // from db

    let middle = createAndAppend(card,'div','middle')
    let cardHolderName = createAndAppend(middle,'p','cardHolderName')
    cardHolderName.textContent ="Robert"//from db

    createAndAppend(card,"hr")
    let bottom = createAndAppend(card,'div','bottom')
    let btnDelete = createAndAppend(bottom,'button','delete')
    btnDelete.textContent = "Delete"
    // btnDelete.id = from DB
    
    createAndAppend(card,"hr")
    createAndAppend(content,"hr")


}
function viewPassword(){
    let passwordInput = document.getElementsByClassName("password")[0]
    if(passwordInput.type == "password")
        passwordInput.type = "text"
    else
        passwordInput.type = "password"

}

