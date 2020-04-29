// import * as fs from 'fs';
// const xx = require('fs')
// import * as fs from 'fs';
// import fs = require('fs-extra');


////////////////////////////////////////////////////////////////////////////////////////////


//     getTodoData() {
//         let request = new XMLHttpRequest();
//         let xx = new TodoList();
//         request.open('GET', './src/todo.json', true);
//         request.onreadystatechange = function() {
//             if (this.readyState == 4 && this.status == 200) {
//                 if (this.responseText) {
//                     let todoJSON = this.responseText;
//                     let todoArray = JSON.parse(todoJSON)
//             for (let i=0; i< todoArray.length; i++) {
//                 let todoItem = new TodoItem(todoArray[i].name, todoArray[i].state);
//                 xx.TodoList = xx.TodoList.concat(todoItem);
//             }
//         }
//                 }                    
//             }  
//         }
//         request.send();
//         console.log('We are there:', xx._todoList)
//         return xx._todoList;
//     }

//     parseTodoItems(todoJSON) {
//         if (todoJSON) {
//             let todoArray = JSON.parse(todoJSON)
//             for (let i=0; i< todoArray.length; i++) {
//                 let todoItem = new TodoItem(todoArray[i].name, todoArray[i].state);
//                 this._todoList = this._todoList.concat(todoItem);
//             }
//         }
//         console.log('Todo array: ', this._todoList);
//         return this._todoList;
//     }
// }
/////////////////////////////////////////////////////////////////////////////////////////////


