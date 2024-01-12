function validateForm(){
    const email = document.getElementById("email").value
    console.log(email)
    const password = document.getElementById("password").value
    const strengthBarValue =document.getElementById("strength"). value
    
    document.getElementById("email-error").innerHTML = ""
    document.getElementById("password-error").innerHTML = ""
    
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
    }
   return isValid
}

