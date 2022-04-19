import http from 'k6/http';
import { check, group, sleep } from 'k6';

export default function () {
    let res = http.get('https://appxx.azurewebsites.net/');
    check(res, {
        'is status code 200': (r) => r.status === 200
    });
    sleep(0.3);
};