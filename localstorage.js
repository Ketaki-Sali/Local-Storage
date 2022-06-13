var todoArray = [];
function saveTodo() {
    let title = document.getElementById("title").value;
    todoArray.push(title);
    localStorage.setItem("todos", todoArray.toString());
    document.getElementById("title").value = "";
    fetchTodos();
}

function fetchTodos() {
    let str = localStorage.getItem("todos");
    // converting string to array
    todoArray = str.split(",");
    let htmlString = `
    <tr>
        <th> Sr.No. </th>
        <th> Title </th>
        <th> Actions </th>
    </tr>
    `
    let counter = 0;
    todoArray.forEach(ele => {
        counter++;
        htmlString += `
        <tr>
            <td>` + counter + `</td> 
            <td> `+ ele +  `</td>
            <td> <button class="btn btn-outline-warning"
            onclick="editTodo(`+ counter +`)"
            > Edit </button> 
                <button class="btn btn-outline-info"
                onclick="deleteTitle(`+ counter +`)"
                > Delete </button>
            </td>
        </tr>` 
    })

    document.getElementById("todoTable").innerHTML = htmlString

}

function editTodo(counter) {
    let title = todoArray[counter-1];
    let newValue = prompt("Do you really want to change this title?", title);
    if (newValue != null && newValue != "") {
        todoArray[counter-1] = newValue;
        localStorage.setItem("todos", todoArray.toString());
        fetchTodos();
    }
}

function deleteTitle(counter) {
    todoArray.splice(counter-1, 1);
    localStorage.setItem("todos", todoArray.toString());
    fetchTodos();
}

function clearData() {
    // localStorage.clear();
    localStorage.removeItem("todos");
    todoArray = [];
    document.getElementById("todoTable").innerHTML = "";
}