import http from 'k6/http';

export let options = {
    scenarios: {
        admins: { //default
            executor: 'shared-iterations',
            vus: 1,
            iterations: 1,
            exec: 'admins'
        },
        users: { //default
            executor: 'constant-vus',
            vus: 5,
            duration: '10s',
            exec: 'users',
        },
    }
};

export function admins() { //https://stackoverflow.com/questions/21117160/what-is-export-default-in-javascript
    http.get('https://test.k6.io/contacts.php');
}

export function users() { //https://stackoverflow.com/questions/21117160/what-is-export-default-in-javascript
    http.get('https://appxx.azurewebsites.net/');
}
