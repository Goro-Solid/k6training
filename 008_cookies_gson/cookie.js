import http from 'k6/http';

export default function () {
    http.get('https://httpbin.org/cookies', {
        cookies: {
            my_cookie: 'hello world',
        },
    });
}