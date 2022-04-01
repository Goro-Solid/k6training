import http from 'k6/http';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export let options = {
    scenarios: {
        noTags: {
            executor: 'per-vu-iterations',
            vus: 1,
            exec: 'noTags',
            iterations: 2,
        },
        withTags: {
            executor: 'per-vu-iterations',
            exec: 'withTags',
            vus: 1,
            iterations: 2,
        }
    },
    thresholds: {
        'http_req_duration{scenario:withTags, secondRequest:true}': ['p(95)<80'],
    }

};

export function setup() {
    console.log('Setup')
}

export function noTags() {
    http.get(BASE_URL + '/todos/1');
    http.get(BASE_URL + '/todos/2');
    http.get(BASE_URL + '/todos/3');
}

export function withTags() {
    let requestName = BASE_URL + '/todos/{n}'
    http.get(BASE_URL + '/todos/1', {tags: {name: requestName}});
    http.get(BASE_URL + '/todos/2', {tags: {name: requestName, secondRequest: 'true'}});
    http.get(BASE_URL + '/todos/3', {tags: {name: requestName}});
}

export function teardown() {
    console.log('Teardown')
}
