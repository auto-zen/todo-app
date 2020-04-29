import { HTMLTodoListView } from "./todo_view";

export const view = new HTMLTodoListView();
// export const todoController = new TodoController(view);

window.onload = function () {
    view.getTodoData(view);
    document.getElementById('addBtn').addEventListener('click', () => view.addTodo());
}

