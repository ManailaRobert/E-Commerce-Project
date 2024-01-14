function verifyAccountType()
{
    var accountType = localStorage.getItem("userType")
    if(accountType == "Admin")
    {
    var leftButtons = document.getElementsByClassName("leftButtons")[0]
    var buttonAdmin = createAndAppend(leftButtons,"button","adminPage")
    buttonAdmin.textContent = "Admin Page"
    buttonAdmin.addEventListener("click",adminPanelOpen)
    }
}
function adminPanelOpen()
{
    window.location.replace("AdminPage.html")
}