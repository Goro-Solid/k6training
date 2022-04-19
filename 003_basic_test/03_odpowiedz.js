import http from 'k6/http';
import { sleep } from 'k6';

const URL = "https://appxx.azurewebsites.net/"

export default function () {
    sendGet();
    sleep(1); //introducing delays
    sendPost();
}

function sendPost() {
    let url = `${URL}/post/add/newpost`
    let payload = JSON.stringify(
        {
            "body": "k6 x " + Math.random(),
            "title": "Post from Gabriel's k6"
        }
    )
        ;
    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    http.request('POST', url, payload, params);
}

function sendGet() {
    http.request('GET', URL);
}
