const { WebClient } = require('@slack/web-api');
import * as process from 'process';
require('dotenv').config();

const slack_token = 'your_token';
// this process.env doesn't work for me yet...returns undefined each time:(
// const slack_token = process.env.SLACK_TOKEN;
const web = new WebClient(slack_token);

interface ITodo {
    id: number;
    name: string;
    state: boolean;
}
// this is a class which will create a todo Item
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

// this class will do all main operations with the list of todos
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
                if (item.id === itemId) {
                    return false; // drop 
                } else {
                    return true; // keep 
                }
            });
        }
    }

    toggleTodo(itemId: number): void {
        if (itemId) {
            let todo = this.findById(itemId);
            
            switch (todo.state) {
                case false:
                    todo.state = true;
                    break;
                case true:
                    todo.state = false;
                    break;
            }
        }
    }

    private findById(itemId: number): TodoItem {
        var filtered = TodoList.allTodos.filter(
            x => x.id == itemId
        );
        if (filtered.length) {
            return filtered[0];
        }
        return null;
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
        if (todoName != '') {
        let todo = new TodoList();
        todo.addTodo(todoName);
        this.render(todo.getAll());}
    }

    removeFromList(todoId: number): void {
        if (todoId) {
            console.log("item to remove: ", todoId);
            let todo = new TodoList();
            todo.removeTodo(todoId);
            this.render(todo.getAll());
        }
    }

    toggleDone(todoId: number): void {
        if (todoId) {
            let todo = new TodoList();
            todo.toggleTodo(todoId);
            this.render(todo.getAll());
        }
    }

    handleInputEnter(event:KeyboardEvent) {
        // Check for 'Enter' key
        if (event.key === 'Enter') {
            let todoName = this.getInput();
            this.addToList(todoName);
        }
      }

    generateSlackList() {
        let todoList = new TodoList();
        let slackArray: string[] = [];
        this.slackListDiv.innerHTML = '';
        console.log('Generating list of done items');
        const textarea = document.createElement('SPAN');
        this.slackListDiv.appendChild(textarea);
        todoList.getAll().forEach(item => {
            if (item.state == true) {
                slackArray.push(item.name);
                const text = document.createTextNode(item.name);
                textarea.appendChild(text);
            }
        })
        const conversationId = 'general';
        let myList = '';
        for (let i=0; i< slackArray.length; i++) {
            myList = myList.concat(slackArray[i] + '\n');
        }
        (async () => {
        const res = await web.chat.postMessage({ channel: conversationId,
            attachments:  [
                {
                    "color": "#2eb886",
                    "title": "Done for today",
                    "text": myList,
                }
            ]
    })
})();
          
        
    }

    render(todoList: TodoItem[]): void {
        this.todoListDiv.innerHTML = '';
        console.log("Updating the rendered todo list");
        const ul = document.createElement('ul');
        ul.setAttribute('id', 'todoListUl');
        this.todoListDiv.appendChild(ul);

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


