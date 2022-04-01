# HTML

Podobnie jak w przypadku parsowania odpowiedzi JSON z użyciem G(J)SON, czasem w teście zachodzi potrzeba parsowania strony HTML, żeby np:
- wyciągnąć token CSRF
- zrobić checka na wartości taga HTML (np. wersja aplikacji)
- wydobyć lokalizację "embedded resources" np. obrazki, style, skrypty JS, ...

![html](../000_intro/img/browser.png)

W JMeterze zaleca się użycie selektora CSS a w k6 mamy do dyspozycji [selektor](https://k6.io/docs/javascript-api/k6-html/selection/selection-filter-selector) zbliżony do JQuery.

Przykład:

```javascript
import { parseHTML } from 'k6/html';
import http from 'k6/http';

export default function () {
  const res = http.get('https://k6.io');
  const doc = parseHTML(res.body); // equivalent to res.html()
  const pageTitle = doc.find('head title').text(); //selector use
  const langAttr = doc.find('html').attr('lang');
}

```

Przeanalizujmy źródło strony https://red-water-022d04b03.azurestaticapps.net/ i wykonajmy test:

```powershell
k6 run .\02_html.js --out csv
```




