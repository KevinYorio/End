const http = require(`node:http`)

const server = http.createServer((request, response) => {
    response.end('Hi coders')
})

server.listen(8080, () =>{
    console.log(`Server running at port ${port}`)
})