// class todoItem
class TodoItem {
    private _id: string;

    constructor(private _name: string, private status: boolean = false, id?: string){
        if(id){
            this._id = id
        } else {
            this._id = new Date().getTime().toString();
        }
    }

    get todoId(): string {
        return this._id;
    }

    get todoName(): string {
        return this._name
    }
}



// class todoList
class TodoList {
    private _todoList:ReadonlyArray<TodoItem> = [];

    constructor(todoList: TodoItem[]) {
       // here should be a check if array is correct
       this._todoList = this._todoList.concat(todoList);
    }

    get todoList(): ReadonlyArray<TodoItem> {
        return this._todoList;
    }

    addTodo(todoItem:TodoItem) {
        if(todoItem) {
            this._todoList = this._todoList.concat(todoItem);
        }
    }

    removeTodo(itemId: string) {
        if(itemId) {
            // Returns the elements of an array that meet the condition specified in a callback function.
            this._todoList = this._todoList.filter(item => {
                if(item.identifier === itemId) {
                    return false; // drop
                } else {
                    return true; // keep
                }
            });
        }
    }

}

// interface TodoListView
interface TodoListView {
    getInput(): TodoItem;
    clearInput(): void;
    render(todoList: ReadonlyArray<TodoItem>): void;
}

// class HTMLTodoListView
class HTMLTodoListView implements TodoListView {
    private readonly todoInput: HTMLInputElement;
    private readonly todoListDiv: HTMLDivElement;
    
    constructor() {
        this.todoInput = document.getElementById('') as HTMLInputElement;
        this.todoListDiv = document.getElementById('') as HTMLDivElement;

        // add some more checks if Input exists

    }

    clearInput():void {
        this.todoInput.value = '';
    }

    getInput(): TodoItem {
        const todoInputValue: string = this.todoInput.value.trim();
        const retTodo: TodoItem = new TodoItem(todoInputValue);
        return retTodo;
    }

    render(todoList: ReadonlyArray<TodoItem>): void {
        const sortedList = todoList;
        // add elements sorting if needed
        this.todoListDiv.innerHTML = '';
        // add another code for Edge
        const ul = document.createElement('ul');
        ul.setAttribute('id', 'todoList');
        this.todoListDiv.appendChild(ul);
        sortedList.forEach(item => {
            const li = document.createElement('li');
            li.setAttribute('class','todo-list-item');
            li.innerHTML = `<a href='#' onclick='todo.deleteTodo("${item.identifier}")'>${item.description}</a>`;
            ul.appendChild(li);
        })
    }
}



// interface todoListController
interface TodoListController {
    addTodo(): void;
    deleteTodo(id: string): void;
}
// class Todo implements interface
class Todo implements TodoListController {

}
