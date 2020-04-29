import { HTMLTodoListView } from "./todo_view";
import { TodoList } from "./todo_list";


interface TodoListController {
    addTodo(): void;
    removeTodo(id: number): void;
    toggleTodo(id: number): void;
}

export class TodoController implements TodoListController {
    private readonly _todoList: TodoList = new TodoList();

    constructor(private _todoListView: HTMLTodoListView) {
        console.log("Todo Controller starts");
        if (!_todoListView) {
            throw new Error("The todo list view implementation is required to properly initialize controller!");
        }
    }

    addTodo(): void {
        // get the value from the view
        const todoValue = this._todoListView.getInput();
        // verify there is something to add
        if ('' !== todoValue.TodoItemName) {
            console.log('adding todo from controller');
            // add new item to the list
            this._todoList.addTodo(todoValue);
            this._todoListView.clearInput();
            this._todoListView.render(this._todoList.TodoList);
        }
    }

    removeTodo(id: number): void {
        if (id) {
            this._todoList.deleteTodo(id);
            this._todoListView.render(this._todoList.TodoList);
        }
    }

    toggleTodo(id:number): void {
        if(id) {
            this._todoList.toggleTodo(id);
            this._todoListView.render(this._todoList.TodoList);
        }
    }

}

export const view = new HTMLTodoListView();
export const todoController = new TodoController(view);

window.onload = function () {
    document.getElementById('addBtn').addEventListener('click', () => todoController.addTodo());
}