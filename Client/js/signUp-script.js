var pass = document.getElementById("password")

pass.addEventListener("keyup", keyUpPass)

var userId = localStorage.getItem("userId")
if(userId != "0")
    window.location.replace("ProductsPage.html")

function validateForm(){
    const username = document.getElementById("username").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const password2 = document.getElementById("password2").value
    const strengthBarValue =document.getElementById("strength"). value
    
    document.getElementById("name-error").innerHTML = ""
    document.getElementById("email-error").innerHTML = ""
    document.getElementById("password-error").innerHTML = ""
    document.getElementById("password2-error").innerHTML = ""
    
    let isValid = true;
    
    if(username === ""){
        document.getElementById("name-error").innerHTML = "Username Invalid"
        isValid =false
    }

//email validation
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(email ==="")
    {
        document.getElementById("email-error").innerHTML = "Email Invalid"
        isValid =false
    }
    else if (email.match(pattern) === null)
    {
        document.getElementById("email-error").innerHTML = "Email Invalid"
        isValid =false
        console.log(email.match(pattern))
    }
     

//password validation
    if(password === ""){
        document.getElementById("password-error").innerHTML = "Password Invalid"
    isValid =false
    }else if(strengthBarValue <60)
    {
        document.getElementById("password-error").innerHTML = "Password strength is too low. Strength rules: \n Adds strength for each character until 2, \n More them 5 characters, \n One of the following characters: '~','<','>','?',\n One of the following characters !,@,#,$,%,^,&,*,(,) "
        isValid =false
    }
    if(password !== password2){
        document.getElementById("password2-error").innerHTML = "Passwords are not matching"
    isValid =false
    }

    if(isValid == true)
    {
        const URL = "http://127.0.0.1:5000/api/createUser"
        const request = new XMLHttpRequest
        request.open("POST",URL)
        request.setRequestHeader("Access-Control-Allow-Origin", "true");
        request.setRequestHeader("Content-Type", "application/json");
        request.onload = logIn
        request.onerror = showError

        var data = {
            "username":username,
            "email":email,
            "password":password
        }
        var jsonData= JSON.stringify(data)
        request.send(jsonData)

        function logIn()
        {   var response = JSON.parse(request.response).message
            console.log(response)
            if(request.status ===200) window.location.replace("signIn.html")
            
            if(request.status === 400)
            {
                document.getElementById("email-error").innerHTML = response
                isValid =false
            }
        }
        function showError()
        {
            var response = JSON.parse(request.response)
            console.error(response.message)
            isValid =false
        }
    }
        
}
function keyUpPass(){
    checkPassword(pass.value)
}
//strength checker
function checkPassword(password)
{
    var strengthBar = document.getElementById("strength")
    var strength = 1

    if (password === null || password === "")
    strength = 0
    if(password.match(/[a-zA-Z0-9][a-zA-Z0-9]+/))
        strength+=1
    if(password.match(/[~<>?]+/))
        strength+=1
    if(password.match(/[!@#$%^&*()]+/))
        strength+=1
    if(password.length >5)
        strength+=1

        switch(strength)
        {
            case 0:
                strengthBar.value = 0;
                break
            case 1:
                strengthBar.value = 20;
                break
            case 2:
                strengthBar.value = 40;
                break
            case 3:
                strengthBar.value = 60;
            break
            case 4:
                strengthBar.value = 80;
                break
            case 5:
                strengthBar.value = 100;
                break

        }
}
function togglePassword(){
    var id = event.target.id
    if(id ==1){
        passwordInput = document.getElementById('password');
        passwordToggle = document.querySelector('.passwordToggle1'); 
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordToggle.textContent = 'Hide';
          } else {
            passwordInput.type = 'password';
            passwordToggle.textContent = 'Show';
          }
    }
    else
    {
        passwordInput = document.getElementById('password2');
        passwordToggle = document.querySelector('.passwordToggle2'); 
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordToggle.textContent = 'Hide';
          } else {
            passwordInput.type = 'password';
            passwordToggle.textContent = 'Show';
          }
    }


}