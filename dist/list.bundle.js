!function(t){var e={};function o(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=1)}([function(t,e){var o;o=function(){return this}();try{o=o||new Function("return this")()}catch(t){"object"==typeof window&&(o=window)}t.exports=o},function(t,e,o){(function(e){t.exports=e.Library=o(2)}).call(this,o(0))},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){void 0===e&&(e=!1),this.name=t,this.state=e,this.id=(new Date).getTime()}return Object.defineProperty(t.prototype,"TodoItemName",{get:function(){return this.name},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"TodoItemId",{get:function(){return this.id},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"TodoItemState",{get:function(){return this.state},enumerable:!0,configurable:!0}),t.prototype.ToggleState=function(t){this.state=t},t}();e.TodoItem=n;var r=function(){function t(t){this._todoList=[],Array.isArray(t)&&t.length&&(this._todoList=this._todoList.concat(t))}return Object.defineProperty(t.prototype,"TodoList",{get:function(){return this._todoList},enumerable:!0,configurable:!0}),t.prototype.findById=function(t){return this._todoList.find((function(e){return e.TodoItemId==t}))},t.prototype.addTodo=function(t){t&&(this._todoList=this._todoList.concat(t))},t.prototype.deleteTodo=function(t){t&&(this._todoList=this._todoList.filter((function(e){return e.TodoItemId!==t})))},t.prototype.toggleTodo=function(t){if(t){var e=this.findById(t);e&&(e.state=!e.state)}},t}();e.TodoList=r}]);