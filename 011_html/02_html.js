import http from 'k6/http';
import { parseHTML } from 'k6/html';

export default function () { //https://stackoverflow.com/questions/21117160/what-is-export-default-in-javascript
    const res = http.get('https://red-water-022d04b03.azurestaticapps.net/');
    const doc = parseHTML(res.body);

    //jQuaery like parsing - https://k6.io/docs/javascript-api/k6-html/parsehtml-src
    const pageTitle = doc.find('head title').text();
    const langAttr = doc.find('html').attr('lang')

    console.log("Our page has: " + pageTitle + '');
    console.log("Our page has: " + langAttr);

    //https://k6.io/docs/javascript-api/k6-html/selection/selection-filter-selector
    const links = doc.find('body div a');
    console.log("Our page has links: ");
    links.toArray().forEach((link)=>console.log(" -- " + link.text()))

}
