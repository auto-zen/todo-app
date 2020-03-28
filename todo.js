/* Question WHY??: Implementing an interface helps maintain code consistency;
in large applications, if any class implements an interface, that would
act as a contract between the class which implements the interface and
the class/module which creates an object of this class. An interface provides
code abstraction and helps us create more manageable code. As we discussed earlier,
an interface is just a TypeScript concept and, upon compilation, no JavaScript code is generated.*/
var Todo = /** @class */ (function () {
    function Todo(name, completed) {
        this.name = name;
        this.completed = completed;
    }
    return Todo;
}());
// another class which will implement all functionality
var TodoList = /** @class */ (function () {
    function TodoList() {
    }
    TodoList.prototype.createTodoItem = function (name) {
        var newItem = new Todo(name, false);
        var totalCount = TodoList.allTodos.push(newItem);
        // Question: is push method calculating number of items in the array?
        return totalCount;
    };
    TodoList.prototype.allTodoItems = function () {
        return TodoList.allTodos;
    };
    TodoList.allTodos = new Array;
    return TodoList;
}());
window.onload = function () {
    var name = document.getElementById('toDoNameInput');
    var addBtn = document.getElementById('addBtn');
    addBtn.addEventListener('click', function () { return addToAllTaskList(name.value); });
};
function addToAllTaskList(task) {
    var todo = new TodoList();
    // create a new todo item
    todo.createTodoItem(task);
    console.log(todo.allTodoItems());
    var divTodo = document.getElementById("todoList");
    var todoList = "<dl class='dl-horizontal'>";
    todo.allTodoItems().forEach(function (element) {
        todoList = todoList + "<dt>" + element.name + "</dt> <dd>" + element.completed + "</dd>";
    });
    todoList += "</dl>";
    divTodo.innerHTML = todoList;
}
//# sourceMappingURL=todo.js.map