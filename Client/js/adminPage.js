verifyAccountType()
document.addEventListener("DOMContentLoaded",loadUsers)
var selectedUser 
function loadUsers(){

        
        const URL = `http://127.0.0.1:5000/api/users`
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
                    const users = JSON.parse(request.response)
                    var userContainer = document.getElementsByClassName("userContainer")[0]
                    for(let key in users)
                    {
                        var userId = key
                        var email = users[key]
                        var user = createAndAppend(userContainer,'p',"email")
                        user.textContent = email
                        user.id = userId
                        user.addEventListener("click",function (){
                            var users =document.getElementsByClassName("email")

                            var usersArray = Array.from(users)
                            usersArray.forEach(function(el){
                                try{
                                    el.classList.remove("selected")
                                }catch{}
                            })
                            selectedUser = event.target.id
                            var item = document.getElementById(selectedUser)
                            item.classList.add("selected")
                            var main = document.getElementsByClassName("main")[0]

                            main.removeChild(document.getElementsByClassName("middle")[0])
                            var middle = createAndAppend(main,"div",'middle')
                            createAndAppend(middle,'hr')
                            createAndAppend(middle,'div','userDetails')
                            createAndAppend(middle,'hr')

                            main.removeChild(document.getElementsByClassName("right")[0])
                            createAndAppend(main,'div','right')

                            loadUserDetails(selectedUser)
                        })
                    }

                }    
            }
    
            function showError()
            {
            var response = JSON.parse(request.response)
            console.error(response.message)
            }

}


function loadUserDetails(id){
    const URL = `http://127.0.0.1:5000/api/user/${id}`
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
                const userDetails = JSON.parse(request.response)
                const username = userDetails.username
                const email = userDetails.email
                var userDetailsContainer = document.getElementsByClassName("userDetails")[0]

                var usernameLabel = createAndAppend(userDetailsContainer,"label")
                usernameLabel.textContent = "Username"

                var usernameInput = createAndAppend(userDetailsContainer,"input","username")
                usernameInput.value = username
                usernameInput.classList.add("usernameInput")

                var emailLabel = createAndAppend(userDetailsContainer,"label")
                emailLabel.textContent = "Email"
                emailLabel.classList.add("emailLabel")

                var emailInput = createAndAppend(userDetailsContainer,"input","email")
                emailInput.value = email
                emailInput.classList.add("emailInput")

                var rightContainer = document.getElementsByClassName("right")[0]
                var btnSave = createAndAppend(rightContainer,"button","save")
                btnSave.textContent = "Save"
                btnSave.addEventListener("click",saveDetails)

                var btnDelete = createAndAppend(rightContainer,"button","delete")
                btnDelete.textContent = "Delete"
                btnDelete.addEventListener("click",deleteDetails)


            }    
        }

        function showError()
        {
        var response = JSON.parse(request.response)
        console.error(response.message)
        }
}

function deleteDetails(){
    const URL = `http://127.0.0.1:5000/api/deleteUser/${selectedUser}`
    const request = new XMLHttpRequest
    request.open("PUT",URL)
    request.setRequestHeader("Access-Control-Allow-Origin", "true");
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = onSuccess
    request.onerror = showError

    request.send()

        function onSuccess()
        {   
            if(request.status == 200){
                var response = JSON.parse(request.response)
                alert(response.message)
            }    
        }

        function showError()
        {
        var response = JSON.parse(request.response)
        console.error(response.message)
        }
}

function saveDetails(){
    const URL = `http://127.0.0.1:5000/api/editUser/${selectedUser}`
    const request = new XMLHttpRequest
    request.open("PUT",URL)
    request.setRequestHeader("Access-Control-Allow-Origin", "true");
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = onSuccess
    request.onerror = showError

    var username = document.getElementsByClassName("usernameInput")[0].value
    var email = document.getElementsByClassName("emailInput")[0].value
    var data ={
        "username":username,
        "email":email
    }

    var jsonData = JSON.stringify(data)
    request.send(jsonData)

        function onSuccess()
        {   
            if(request.status == 200){
                var response = JSON.parse(request.response)
                alert(response.message)
            }    
        }

        function showError()
        {
        var response = JSON.parse(request.response)
        console.error(response.message)
        }
  
}