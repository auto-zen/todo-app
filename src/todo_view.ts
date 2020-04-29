import { TodoItem, TodoList } from "./todo_list";
import { view } from "./todo_controller";

interface TodoListView {
    render(todoList: ReadonlyArray<TodoItem>): void;
    getInput(): TodoItem;
    clearInput(): void;
}

export class HTMLTodoListView implements TodoListView {
    public readonly todoInput: HTMLInputElement;
    public readonly todoListDiv: HTMLDivElement;
    public readonly slackListDiv: HTMLDivElement;

    constructor() {
        this.todoInput = <HTMLInputElement>document.getElementById('toDoNameInput');
        this.todoListDiv = <HTMLDivElement>document.getElementById('todoList');
        this.slackListDiv = <HTMLDivElement>document.getElementById('slackDiv');
    }

    private readonly _todoList: TodoList = new TodoList();

    clearInput(): void {
        this.todoInput.value = '';
    }

    getInput(): TodoItem {
        const todoInputValue: string = this.todoInput.value.trim();
        const retTodoItem = new TodoItem(todoInputValue);
        return retTodoItem;
    }

    generateSingleHTMLItem(item: TodoItem): HTMLLIElement {
        const span = document.createElement("SPAN");
        const txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        const li = document.createElement('li');
        li.setAttribute('class', 'todo-list-item');
        li.innerHTML = `${item.TodoItemName}`;
        li.appendChild(span);
        this.addDeleteEventListener(span, item);
        this.addToggleEventListener(li, item);
        return li;
    }

    addDeleteEventListener(span: HTMLElement, item: TodoItem) {
        span.addEventListener('click', () => this.removeTodo(item.TodoItemId));
    }

    addToggleEventListener(li: HTMLLIElement, item: TodoItem) {
        li.addEventListener('click', () => this.toggleTodo(item.TodoItemId));
        if (item.TodoItemState) {
            console.log('here should be changing class');
            li.setAttribute('class', 'checked');
        }
    }

    render(todoList: ReadonlyArray<TodoItem>): void {
        this.todoListDiv.innerHTML = '';
        console.log("Updating the rendered todo list");
        const ul = document.createElement('ul');
        ul.setAttribute('id', 'todoListUl');
        this.todoListDiv.appendChild(ul);

        todoList.forEach(item => {
            const li: HTMLLIElement = this.generateSingleHTMLItem(item);
            ul.appendChild(li);
        });
    }

    addTodo(): void {
        // get the value from the view
        const todoValue = this.getInput();
        // verify there is something to add
        if ('' !== todoValue.TodoItemName) {
            console.log('adding todo from controller');
            // add new item to the list
            this._todoList.addTodo(todoValue);
            this.clearInput();
            this.render(this._todoList.TodoList);
        }
    }

    removeTodo(id: number): void {
        if (id) {
            this._todoList.deleteTodo(id);
            this.render(this._todoList.TodoList);
        }
    }

    toggleTodo(id: number): void {
        if (id) {
            this._todoList.toggleTodo(id);
            this.render(this._todoList.TodoList);
        }
    }

    getTodoData(view: HTMLTodoListView) {
        console.log('getting data from JSON file');
        let request = new XMLHttpRequest();
        
        request.open('GET', './src/todo.json', true);
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText) {
                    let todoParsed = view.parseTodoItems(this.responseText);            
                    view.render(todoParsed);
                } else { console.log('no file'); }
            }
        }
        request.send();
    }

    parseTodoItems(todoJSON) {
        if (todoJSON) {
            let todoArray = JSON.parse(todoJSON)
            for (let i = 0; i < todoArray.length; i++) {
                let todoItem = new TodoItem(todoArray[i].name, todoArray[i].state);
                this._todoList.addTodo(todoItem);
            }
        }
        console.log('parsed array:', this._todoList.TodoList)
        return this._todoList.TodoList;
    }
}


