import http from 'k6/http';
import { sleep } from 'k6';


//k6 run .\03_externally_controlled.js
//k6 stats
//k6 pause
//k6 resume
//k6 scale -u 1
//k6 status
//k6 scale -u 51

export let options = {
    discardResponseBodies: true,
    scenarios: {
        contacts: {
            executor: 'externally-controlled',
            //vus: 10 - domyslnie bedzie zero
            maxVUs: 50, //limit to scale up to
            duration: '1m',
        },
    },
};

export default function () {
    http.get('https://test.k6.io/contacts.php');
    sleep('1s');
}
