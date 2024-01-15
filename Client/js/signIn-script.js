var userId = localStorage.getItem("userId")
if(userId != "0")
    window.location.replace("ProductsPage.html")

function validateForm(){
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    
    document.getElementById("email-error").innerHTML = ""
    document.getElementById("password-error").innerHTML = ""
    
    let isValid = true;
    

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
    }
     

//password validation
    if(password === ""){
        document.getElementById("password-error").innerHTML = "Password Invalid"
        isValid =false
    }
    if(isValid == true)
    {
        const URL = "http://127.0.0.1:5000/api/signIn"
        const request = new XMLHttpRequest
        request.open("POST",URL)
        request.setRequestHeader("Access-Control-Allow-Origin", "true");
        request.setRequestHeader("Content-Type", "application/json");
        request.onload = logIn
        request.onerror = showError

        var data = {
            "email":email,
            "password":password
        }
        var jsonData= JSON.stringify(data)
        request.send(jsonData)

        function logIn()
        {   var response = JSON.parse(request.response)
            if(request.status == 200)
            {
                localStorage.setItem("userId",response.userId)
                localStorage.setItem("userType",response.accountType)
                window.location.replace("ProductsPage.html")
            }
                
            if(request.status == 400)
            {
                if(response.problem =="email")
                    {
                        console.log(response.problem)
                        document.getElementById("email-error").innerHTML = "Email Invalid"
                        isValid =false
                    }
                if(response.problem =="password")
                {
                    console.log(response.problem)
                    document.getElementById("password-error").innerHTML = "Password Invalid"
                    isValid =false
                    console.error(response.message)
                }
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

function togglePassword(){
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.querySelector('.passwordToggle');

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      passwordToggle.textContent = 'Hide';
    } else {
      passwordInput.type = 'password';
      passwordToggle.textContent = 'Show';
    }
}