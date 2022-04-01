import http from 'k6/http';
import { check } from 'k6';

const URL = "http://localhost:5001"

export let options = { //options allow to configure your test rum

};

export default function () {
    let res = http.request('GET', URL);
    check(res, {
        'status is 200': (r) => r.status === 200
    })
}



