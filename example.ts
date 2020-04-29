// const { WebClient } = require('@slack/web-api');
// require('dotenv').config();

// const slack_token = 'your_token';
// const web = new WebClient(slack_token);

// interface ITodo {
//     id: number;
//     name: string;
//     state: boolean;
// }

// class TodoItem implements ITodo {
//     public id: number;
//     public name: string;
//     public state: boolean;
//     constructor(name: string, completed: boolean = false) {
//         this.name = name;
//         this.state = completed;
//         this.id = new Date().getTime();
//     }
// }

// class TodoList {
//     public static allTodos: TodoItem[] = new Array;

//     getAll(): TodoItem[] {
//         return TodoList.allTodos;
//     }

//     addTodo(todoItemName: string): number {
//         let newItem = new TodoItem(todoItemName);
//         let totalCount = TodoList.allTodos.push(newItem);
//         return totalCount;
//     }

//     removeTodo(itemId: number) {
//         if (itemId) {
//             TodoList.allTodos = TodoList.allTodos.filter(item => {
//                 return item.id !== itemId;
//             });
//         }
//     }

//     // Something to consider, removing this doesn't remove the eventListeners on the elements that existed previously
//     toggleTodo(itemId: number): void {
//         if (itemId) {
//             let todo = this.findById(itemId);
//             if (todo) {
//                 todo.state = !todo.state;
//             }
//         }
//     }

//     private findById(itemId: number): TodoItem {
//         return TodoList.allTodos.find(x => x.id == itemId);
//     }
// }

// // probably needs interface
// class HTMLSingleTodoItem {

//     public readonly todoSpan: HTMLElement;
//     public readonly todoLi: HTMLLIElement;
//     public readonly todoText: Text;

//     constructor() {
//         this.todoLi = <HTMLLIElement>document.createElement('li');
//         this.todoSpan = <HTMLElement>document.createElement('SPAN');
//         this.todoText = <Text>document.createTextNode("\u00D7");
//     }

//     public renderSingleTodo(todoName: string) {
//         console.log('trying to render')
//             this.todoSpan.className = "close";
//             this.todoSpan.appendChild(this.todoText);
//             this.todoLi.setAttribute('class', 'todo-list-item');
//             this.todoLi.innerHTML = `${todoName}`;
//             this.todoLi.appendChild(this.todoSpan);
//             return this.todoLi;
//     }

//     public addEventListeners() {
//         this.todoLi.addEventListener('click', () => this.toggleDone(item.id));
//             if (item.state) {
//                 console.log('here should be changing class');
//                 li.setAttribute('class', 'checked');
//             }
//             span.addEventListener('click', () => this.removeFromList(item.id));
//     }
// }

// interface TodoListView {
//     render(todoList): void;
//     getInput(): string;
//     clearInput(): void;
//     addToList(todoName: string): void;
// }

// class HTMLTodoListView implements TodoListView {

//     public readonly todoInput: HTMLInputElement;
//     public readonly todoListDiv: HTMLDivElement;
//     public readonly slackListDiv: HTMLDivElement;

//     private todo: TodoList = new TodoList();

//     constructor() {
//         this.todoInput = <HTMLInputElement>document.getElementById('toDoNameInput');
//         this.todoListDiv = <HTMLDivElement>document.getElementById('todoList');
//         this.slackListDiv = <HTMLDivElement>document.getElementById('slackDiv');
//     }

//     clearInput(): void {
//         this.todoInput.value = '';
//     }

//     getInput(): string {
//         const todoInputValue: string = this.todoInput.value.trim();
//         return todoInputValue;
//     }

//     addToList(todoName: string): void {
//         if (todoName != '') {
//             let todo = new TodoList();
//             todo.addTodo(todoName);
//             this.render(todo.getAll());
//         }
//     }

//     removeFromList(todoId: number): void {
//         if (todoId) {
//             console.log("item to remove: ", todoId);
//             this.todo.removeTodo(todoId);
//             this.render(this.todo.getAll());
//         }
//     }

//     toggleDone(todoId: number): void {
//         if (todoId) {
//             this.todo.toggleTodo(todoId);
//             this.render(this.todo.getAll());
//         }
//     }

//     handleInputEnter(event: KeyboardEvent) {
//         if (event.key === '13') {
//             let todoName = this.getInput();
//             this.addToList(todoName);
//         }
//     }

//     render(todoList: TodoItem[]): void {
//         this.todoListDiv.innerHTML = '';
//         console.log("Updating the rendered todo list");
//         const ul = document.createElement('ul');
//         ul.setAttribute('id', 'todoListUl');
//         this.todoListDiv.appendChild(ul);

//         todoList.forEach(item => {
//             let todoHtmlItem = new HTMLSingleTodoItem();
//             let li = todoHtmlItem.renderSingleTodo(item.name);
//             ul.appendChild(li);
//         });
//         this.clearInput();
//     }
// }

// window.onload = function () {
//     const view = new HTMLTodoListView();
//     document.getElementById('toDoNameInput').addEventListener('keypress', (event) => view.handleInputEnter(event));
//     document.getElementById('addBtn').addEventListener('click', () => view.addToList(view.getInput()));
//     // document.getElementById('slackBtn').addEventListener('click', () => view.generateSlackList());
//     // console.log(require('dotenv').config())
// }


