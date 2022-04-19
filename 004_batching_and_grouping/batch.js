import http from 'k6/http';
import {sleep, group} from 'k6';

const URL = "https://appxx.azurewebsites.net/"

export default function () {
   let requests = [
       { method: 'GET', url: URL},
       { method: 'GET', url: URL}
   ]
    let namedRequests = { //you can mix URLs and objects
        'first' : URL,
        'second': { method: 'GET', url: URL}
    }
    group('Batch test', function() {
        group('Get Main Page over 2 TCP connections - named', function () {
            http.batch(namedRequests);
        });
        group('Get Main Page over 2 TCP connections - array', function () {
            http.batch(requests);
        });
        sleep(1);
    });
}