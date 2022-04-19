import http from 'k6/http';
import { check, group, sleep } from 'k6';

const URL = "https://appxx.azurewebsites.net/"
const DURATION = __ENV.DURATION || 40;

export let options = {
    vus: 3,
    iterations: 3,
    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: [`p(95)<${DURATION}`]

    }
};

// init end
export function setup() {
    return {

    }
}

//VU
export default function (data) {
    group('Grupa 1', function () {
        let res = http.get(URL);
        check(res, {
            'is status code 200': (r) => r.status === 200
        });
    });
    grupa2();
    group('Grupa Rownolegla', function () {
        http.batch([
            ['GET', URL, null, null],
            ['GET', URL, null, null],
            ['GET', URL, null, null],
        ])
    });

};

//teardown
export function teardown(data) {

}

function grupa2() {
    group('Grupa 2', function () {
        let res = http.get(URL);
        check(res, {
            'is status code 200': (r) => r.status === 200
        });
    });
}