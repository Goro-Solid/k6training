import http from 'k6/http';
import { check, group, sleep } from 'k6';

//simplest test possible
export default function () { //https://stackoverflow.com/questions/21117160/what-is-export-default-in-javascript
    //początek iteracji
    let res = http.get('https://appxx.azurewebsites.net/'); //request - response
    console.log(JSON.stringify(res, null, 2)); //The JSON.stringify() method converts a JavaScript object or value to a JSON string
    //koniec iteracji
    check(res, {
        'my check': (res) => res['request']['method'] == "GET"
    });
}
