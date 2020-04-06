interface ITodo{
    id: string;
    name:string;
    completed: boolean;
}

class Todo implements ITodo{
    public 
    public name:string;
    public completed: boolean;
    constructor(name:string, completed:boolean){
        this.name = name;
        this.completed = completed;
    }
}
// another class which will implement all functionality!!
class TodoList {
    public static allTodos: Todo[] = new Array;
    createTodoItem(name: string) {
        let newItem = new Todo(name, false);

        let totalCount: number = TodoList.allTodos.push(newItem);
        // Question: is push method calculating number of items in the array?
        return totalCount;
    }

    allTodoItems(): Todo[] {
        return TodoList.allTodos;
    }
}

window.onload = function() {
    let name = <HTMLInputElement>document.getElementById('toDoNameInput');
    let addBtn = <HTMLInputElement>document.getElementById('addBtn');
    addBtn.addEventListener('click', () => addToAllTaskList(name.value))
}

function addToAllTaskList(task:string) {
    let todo = new TodoList();
    // create a new todo item
    todo.createTodoItem(task);
    console.log(todo.allTodoItems());
    const divTodo = <HTMLInputElement>document.getElementById("todoList");
    let todoList = "<dl class='dl-horizontal'>";
    todo.allTodoItems().forEach(element => {
        todoList = todoList + "<dt>" + element.name + "</dt> <dd>" + element.completed + "</dd>";
    });
    todoList += "</dl>"
    divTodo.innerHTML = todoList;

}