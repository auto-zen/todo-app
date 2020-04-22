const { WebClient } = require('@slack/web-api');
require('dotenv').config();

const slack_token = 'your_token';
const web = new WebClient(slack_token);

interface ITodo {
    id: number;
    name: string;
    state: boolean;
}

class TodoItem implements ITodo {
    public id: number;
    public name: string;
    public state: boolean;
    constructor(name: string, completed: boolean = false) {
        this.name = name;
        this.state = completed;
        this.id = new Date().getTime();
    }
}

class TodoList {
    public static allTodos: TodoItem[] = new Array;

    getAll(): TodoItem[] {
        return TodoList.allTodos;
    }

    addTodo(todoItemName: string): number {
        let newItem = new TodoItem(todoItemName);
        let totalCount = TodoList.allTodos.push(newItem);
        return totalCount;
    }

    removeTodo(itemId: number) {
        if (itemId) {
            TodoList.allTodos = TodoList.allTodos.filter(item => {
                return item.id !== itemId;
            });
        }
    }

    // Something to consider, removing this doesn't remove the eventListeners on the elements that existed previously
    toggleTodo(itemId: number): void {
        if (itemId) {
            let todo = this.findById(itemId);
            if (todo) {
                todo.state = !todo.state;
            }
        }
    }

    private findById(itemId: number): TodoItem {
        return TodoList.allTodos.find(x => x.id == itemId);
    }
}

interface TodoListView {
    render(todoList): void;
    getInput(): string;
    clearInput(): void;
    addToList(todoName: string): void;
}

class HTMLTodoListView implements TodoListView {

    public readonly todoInput: HTMLInputElement;
    public readonly todoListDiv: HTMLDivElement;
    public readonly slackListDiv: HTMLDivElement;

    private todo: TodoList = new TodoList();

    constructor() {
        this.todoInput = <HTMLInputElement>document.getElementById('toDoNameInput');
        this.todoListDiv = <HTMLDivElement>document.getElementById('todoList');
        this.slackListDiv = <HTMLDivElement>document.getElementById('slackDiv');
    }

    clearInput(): void {
        this.todoInput.value = '';
    }

    getInput(): string {
        const todoInputValue: string = this.todoInput.value.trim();
        return todoInputValue;
    }

    addToList(todoName: string): void {
        // Formatting is off, also I think the check could just be if (todoName)? not sure
        if (todoName != '') {
            let todo = new TodoList();
            todo.addTodo(todoName);
            this.render(todo.getAll());
        }
    }

    removeFromList(todoId: number): void {
        if (todoId) {
            console.log("item to remove: ", todoId);
            this.todo.removeTodo(todoId);
            this.render(this.todo.getAll());
        }
    }

    toggleDone(todoId: number): void {
        if (todoId) {
            this.todo.toggleTodo(todoId);
            this.render(this.todo.getAll());
        }
    }

    handleInputEnter(event: KeyboardEvent) {
        if (event.key === '13') {
            let todoName = this.getInput();
            this.addToList(todoName);
        }
    }

    generateSlackList() {
        const conversationId = 'general';
        let myList = '';
        // let todoList = new TodoList();
        let slackArray: string[] = [];
        this.slackListDiv.innerHTML = '';
        console.log('Generating list of done items');
        const textarea = document.createElement('SPAN');
        this.slackListDiv.appendChild(textarea);
        this.todo.getAll().forEach(item => {
            if (item.state === true) {
                slackArray.push(item.name);
                myList.concat(item.name + '\n');
                const text = document.createTextNode(item.name);
                textarea.appendChild(text);
            }
        })
       
        // async () => {
        //     const res = await web.chat.postMessage({
        //         channel: conversationId,
        //         attachments: [
        //             {
        //                 "color": "#2eb886",
        //                 "title": "Done for today",
        //                 "text": myList,
        //             }
        //         ]
        //     })
        //     // You could check if response is successful or not, and alert the user somehow
        // };


    }

    render(todoList: TodoItem[]): void {
        this.todoListDiv.innerHTML = '';
        console.log("Updating the rendered todo list");
        const ul = document.createElement('ul');
        ul.setAttribute('id', 'todoListUl');
        this.todoListDiv.appendChild(ul);

        // This loop seem complicated, and also this code isn't the cleanest. Just so you're aware
        // You could move the creation of a todo-item into a method, then adding event listeners into another method
        // Just to make it easier to read/follow
        todoList.forEach(item => {
            const span = document.createElement("SPAN");
            const txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(txt);
            const li = document.createElement('li');
            li.setAttribute('class', 'todo-list-item');
            li.innerHTML = `${item.name}`;
            li.appendChild(span);
            li.addEventListener('click', () => this.toggleDone(item.id));
            if (item.state) {
                console.log('here should be changing class');
                li.setAttribute('class', 'checked');
            }
            span.addEventListener('click', () => this.removeFromList(item.id));
            ul.appendChild(li);
        });
        this.clearInput();
    }
}

window.onload = function () {
    const view = new HTMLTodoListView();
    document.getElementById('toDoNameInput').addEventListener('keypress', (event) => view.handleInputEnter(event));
    document.getElementById('addBtn').addEventListener('click', () => view.addToList(view.getInput()));
    document.getElementById('slackBtn').addEventListener('click', () => view.generateSlackList());
    console.log(require('dotenv').config())
}


