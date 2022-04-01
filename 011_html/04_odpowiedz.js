import http from 'k6/http';
import {parseHTML} from 'k6/html';
import {check, group} from 'k6';

const URL = 'https://red-water-022d04b03.azurestaticapps.net/';
export let options = {
    batch: 2 //max parallel request in batch
}
export default function () {
    group('Get Main Page', function () {
        let res = http.get(URL);
        check(res, { //check one or iterate over
            'main page response code was 200': (res) => res.status == 200,
        });
        let embeddedSources = getEmbeddedSource(res);
        group('Get Embedded Resources', function () { //iterate over embedded resources and download
            let parallelRequests = []
            embeddedSources.forEach(
                (resource) => {
                    if (resource.startsWith('http')) {
                        parallelRequests.push(['GET', resource])
                    } else {
                        parallelRequests.push(['GET', URL + resource])
                    }
                }
            )
            let responses = http.batch(parallelRequests)
            check(responses[0], { //check one or iterate over
                'embedded response code was 200': (res) => res.status == 200,
                'all resources have been downloaded': () => responses.length === 3
            });
        });
    });

}

/*
    Get all > src and link > href sources
 */
function getEmbeddedSource(res) {
    let sources = [];
    let source;
    const req_script = parseHTML(res.body);
    console.log("Sources detected: " )
    req_script.find('script,img,link').toArray().forEach((item) => {
        if (item.attr('src')) {
            source = item.attr('src');
        } else if (item.attr('href')) {
            source = item.attr('href');
        }
        console.log(" -- " + source)
        sources.unshift(source)
    });
    return sources;
}
