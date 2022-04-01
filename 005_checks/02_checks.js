import http from 'k6/http';
import { check } from 'k6';

const URL = "https://appxx.azurewebsites.net/"

export default function () {
    let res = http.request('GET', URL);
    console.log(JSON.stringify(res, null, 2))
    let checkResult = check(res, {
        'response code was 200': (res) => res.status == 200,
        'remote port was 443': (res) => res.remote_port === 443,
        'dummy check': () => 'a' === 'a',
        'foo': true,
        'x': 9
    });
    console.log("Check Result " + checkResult)
}



