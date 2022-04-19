import { group, sleep } from 'k6';
import http from 'k6/http';

// Version: 1.2
// Creator: WebInspector

export let options = {
    maxRedirects: 0,
};

export default function() {

	group("page_1 - https://red-water-022d04b03.azurestaticapps.net/", function() {
		let req, res;
		req = [{
			"method": "get",
			"url": "https://jsonplaceholder.typicode.com/todos/1",
			"params": {
				"headers": {
					"pragma": "no-cache",
					"cache-control": "no-cache",
					"sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
					"sec-ch-ua-mobile": "?0",
					"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36",
					"sec-ch-ua-platform": "\"macOS\"",
					"accept": "*/*",
					"origin": "https://red-water-022d04b03.azurestaticapps.net",
					"sec-fetch-site": "cross-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-GB,en-US;q=0.9,en;q=0.8"
				}
			}
		}];
		res = http.batch(req);
		sleep(2.88);
		req = [{
			"method": "get",
			"url": "https://jsonplaceholder.typicode.com/todos/2",
			"params": {
				"headers": {
					"pragma": "no-cache",
					"cache-control": "no-cache",
					"sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
					"sec-ch-ua-mobile": "?0",
					"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36",
					"sec-ch-ua-platform": "\"macOS\"",
					"accept": "*/*",
					"origin": "https://red-water-022d04b03.azurestaticapps.net",
					"sec-fetch-site": "cross-site",
					"sec-fetch-mode": "cors",
					"sec-fetch-dest": "empty",
					"accept-encoding": "gzip, deflate, br",
					"accept-language": "en-GB,en-US;q=0.9,en;q=0.8"
				}
			}
		}];
		res = http.batch(req);
		// Random sleep between 20s and 40s
		sleep(Math.floor(Math.random()*20+20));
	});

}
