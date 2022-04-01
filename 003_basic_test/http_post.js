import http from 'k6/http';
import { check, group, sleep } from 'k6';

export default function () {
    let url = "https://appxx.azurewebsites.net/post/add/newpost"
    let payload = {
        body: "Something",
        title: "Title"
    }
    let params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let res = http.post(url, JSON.stringify(payload), params);
    check(res, {
        'is status code 201': (res) => res.status === 201
    });
    console.log(JSON.stringify(res, null, 2))
};