const http = require('http');
const PORT = 3000;
var server = http.createServer(function(request, response){
    console.log("URL страницы: " + request.url + '; Метод: ' + request.method);
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.write('<h1>Привет мир!</h1>');
    response.write('<p>Меня зовут сервер:))</p>')
    response.end();
});
server.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log('Слушаем порт ' + PORT);
});