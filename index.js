const http = require('http');
const { URL } = require('url');


const routes = require('./routes');


const server = http.createServer((request, response) =>{
  const parsedUrl = new URL(`http://localhost:3000${request.url}`);

  // console.log(Object.fromEntries(parsedUrl.searchParams));
  // console.log(`Request: ${request.method} | Endpoint: ${parsedUrl.pathname}`);

  let { pathname } = parsedUrl;
  
  //splitEnd point vai dividir todas as '/' da url, função filter Boolean vai indentificar o vazio como falso e retirar ela do Obj.
  const splitEndpoint = pathname.split('/').filter(Boolean);
  // console.log(splitEndpoint);
  
  if(splitEndpoint.length > 1)
  {
    pathname = `/${splitEndpoint[0]}/:id`;
  }

  const route = routes.find((routeObj) => (
    routeObj.endpoint === parsedUrl.pathname && routeObj.method === request.method
  ));

  if(route)
  {
    request.query = parsedUrl.query;
    request.params = { id };
    
    request.query = Object.fromEntries(parsedUrl.searchParams);
    route.handler(request, response);
  }else{
    response.writeHead(404, {'Content-Type':'text/html'});
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
  }

  
});

server.listen(3000, () =>{
    console.log('Subiu Server na porta 3000');
}); 