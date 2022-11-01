require('dotenv').config()

const http = require('http');
const app = require('./app');

const port = process.env.PORT || 8180;
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
});