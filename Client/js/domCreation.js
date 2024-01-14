function createAndAppend(parent,tag,className){
    let element = document.createElement(tag)
    if(className)
        element.classList.add(className)
    parent.appendChild(element)
    return element
}