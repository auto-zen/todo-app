export class TodoItem {
    private id: number;
    private name: string;
    public state: boolean;

    constructor(name: string, completed: boolean = false) {
        this.name = name;
        this.state = completed;
        this.id = new Date().getTime();
    }

    get TodoItemName(): string {
        return this.name;
    }

    get TodoItemId(): number {
        return this.id;
    }

    get TodoItemState(): boolean {
        return this.state;
    }
    
    ToggleState(state: boolean) {
        this.state = state;
    }
}

export class TodoList {
    private _todoList: ReadonlyArray<TodoItem> = [];

    constructor(todoList?: TodoItem[]) {
        if (Array.isArray(todoList) && todoList.length) {
            this._todoList = this._todoList.concat(todoList);
        }
    }

    get TodoList(): ReadonlyArray<TodoItem> {
        return this._todoList;
    }

    private findById(itemId: number): TodoItem {
                return this._todoList.find(x => x.TodoItemId == itemId);
            }

    addTodo(todoItem: TodoItem) {
        if (todoItem) {
            this._todoList = this._todoList.concat(todoItem);
        }
    }

    deleteTodo(itemId: number) {
        if (itemId) {
            this._todoList = this._todoList.filter(item => {
                return item.TodoItemId !== itemId;
            });
        }
    }

    toggleTodo(itemId: number): void {
        if (itemId) {
            let todo =  this.findById(itemId);
            if (todo) {
                todo.state = !todo.state;
            }
        }
    }

}