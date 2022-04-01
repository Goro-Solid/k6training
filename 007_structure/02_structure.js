import http from 'k6/http';
import { group, sleep } from 'k6';
var fileContent = "linia1,linia2";
//let data = http.get('https://appxx.azurewebsites.net/').body;

export function setup() {
    let data = {}
    data['key'] = http.get('https://appxx.azurewebsites.net/').body; //tak się da
    data['file'] = fileContent;
    return data;
}

export default function (data) {
    group('Main scenario', function () {
        console.log('Data in main block: ' + JSON.stringify(data));
        console.log(fileContent === data['file']); //dane z init dostępne w bloku VU
        data['key'] = "foo data"
        let res = http.get('https://appxx.azurewebsites.net');
    });

}

export function teardown(data) {
    if (data.key != 'Hello, World!') {
        throw new Error('incorrect data: ' + JSON.stringify(data));
    } else {
        console.log('Data in teardow block: \n ' + JSON.stringify(data, null, 2) + "\n\n");
    }
}
