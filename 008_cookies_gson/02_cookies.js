import http from 'k6/http';

export default function () {
    cookies();
    gson();
}
//przykład użycia cookieJar() i gson
function cookies() {
    const jar = http.cookieJar();
    jar.set('https://httpbin.org/cookies', 'my_cookie', 'hello world');
    http.get('https://httpbin.org/cookies');
    http.get('https://httpbin.org/cookies');
    jar.set('https://httpbin.org/cookies', 'my_cookie 2', 'hello world 2');
    http.get('https://httpbin.org/cookies');
}

function gson() {
    let res = http.get('https://jsonplaceholder.typicode.com/todos/1');
    console.log("ID is" + res.json("id")) //https://github.com/tidwall/gjson#path-syntax
}
