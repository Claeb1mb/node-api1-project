// require is how you import for node.js

const server = require('./server')

const PORT = 3000;





server.listen(PORT, () => {
    console.log(`server listing on port 3000 ${PORT}`);
})