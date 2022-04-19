import http from 'k6/http';
import { check, group, sleep } from 'k6';

export default function () {
    let url = __ENV.url || 'https://appxx.azurewebsites.net'
    let res = http.get(url);
    check(res, {
        'did I sent to correct URL?': (res) => res['request']['url'] === url,
    });
};