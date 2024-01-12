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
   return isValid
}

