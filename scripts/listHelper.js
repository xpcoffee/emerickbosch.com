/*
 * Author:  Rick Bosch
 * email:   xpc.dev@gmail.com
 */

/*
 * Creates HTML unordered list from an array, places it after "previous element"
 */
function createULFromArray(previousElement, array) {
    createListFromArray(previousElement, array, "ul");
}

/*
 * Creates HTML ordered list from an array, places it after "previous element"
 */
function createOLFromArray(previousElement, array) {
    createListFromArray(previousElement, array, "ol");
}

/*
 * Creates a list from a given array and places it after a given element.
 */
function createListFromArray(previousElement, array, type) {
    var newList = getList(type);
    for (i in array) {
        var element = array[i];
        var li = document.createElement("li");
        if(Array.isArray(element)) {
            createListFromArray(newList.lastChild, element, type);
        } else {
            li.innerHTML = element;
            newList.appendChild(li);
        }
    }
    previousElement.parentNode.insertBefore(newList, previousElement.nextSibling);
}

/*
 * Returns HTML list of given type
 */
function getList(type) {
    switch(type){
        case "ul":
            return document.createElement("ul");
        case "ol":
            return document.createElement("ol");
        default:
            return null;
    }
}