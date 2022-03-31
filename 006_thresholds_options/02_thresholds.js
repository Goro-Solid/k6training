import http from 'k6/http';
import { check } from 'k6';

const URL = "http://localhost:5001"

export let options = { //options allow to configure your test rum
    vus: 1,
    iterations: 1,
    thresholds: { //quality gates
        http_req_failed: ['rate<0.01'],   // http errors should be less than 1%
        http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
        //checks: ['rate>0.9'], //checki mogą być również użyte w thresholdach
    },
};

export default function () {
    let res = http.request('GET', URL);
    check(res, {
        'status is 200': (r) => r.status === 200
    })
}



