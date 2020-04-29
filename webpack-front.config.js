module.exports = {
    resolve: {
        extensions: ['.ts', '.js']
    },
    entry: {
        controller: "./src/todo_controller.ts",
      },
      output: {
        filename: "[name].bundle.js",
      },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: [{
                    loader: 'expose-loader',
                    options: 'Library'
                  }, {
                    loader: 'ts-loader'
                  }],
            }
        ]
    },
    node: {
        fs: 'empty',
    },
}