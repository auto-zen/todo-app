import { TodoItem, TodoList } from "./todo_list";
import { todoController } from "./todo_controller";



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
        span.addEventListener('click', () => todoController.removeTodo(item.TodoItemId));
    }

    addToggleEventListener(li: HTMLLIElement, item: TodoItem) {
        li.addEventListener('click', () => todoController.toggleTodo(item.TodoItemId));
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
}