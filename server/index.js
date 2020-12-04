const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);




const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`Server runing on port ${port}`))