const frontend = {
     entry: [
         './todo_mvc.ts'
     ],
     output: {
        filename: './dist/frontend-output.js'
     }
};

const backend = {
     entry: [
         './todo_backend.ts'
     ],
     output: {
        filename: './dist/backend-output.js'
     },
     target: 'node',
     externals: 'fs' // specify for example node_modules to be not bundled
     // other loaders, plugins etc. specific for backend
};

module.exports = [ frontend, backend ];