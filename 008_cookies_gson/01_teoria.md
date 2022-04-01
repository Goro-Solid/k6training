# Użyteczne elementy: ciasteczka i GJSON

## Cookies

Protokół HTTP jest bezstanowy. To znaczy że dwa kolejne żądania HTTP nie są ze sobą związane. Ciasteczka są mechanizmem pozwalającym zapisywać stan na urządzeniu użytkownika (np. sessionId) i wiązać wiele żądań do jednej sesji.

![cookies](img/cookies.png)

``docs.microsoft.com``


K6 zarządza [ciasteczkami](https://k6.io/docs/using-k6/cookies/) automatycznie, podobnie jak JMeter. W przypadku konieczności ręcznej modyfikacji Cookie można skorzystać z parametrów

```javascript
import http from 'k6/http';

export default function () {
  http.get('https://httpbin.org/cookies', {
    cookies: {
      my_cookie: 'hello world',
    },
  });
}
```

lub `http.cookieJar()`
 
Uruchomimy skrypt i zanalizujemy ciasteczka.

```powershell
    k6 run .\02_cookies.js --http-debug=full
```

## GJSON - ekstrakcja danych z obiektów JSON

Często w testach zachodzi potrzeba ekstrahowania elementów z obiektów/odpowiedzi typu JSON np:
- tokeny dostępowe, CSRF, etc ..
- wartości obiektów


```javascript
import http from 'k6/http';
export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/')
    console.log(res.json());
}

```
W k6 metoda [json(selector)](https://k6.io/docs/javascript-api/k6-http/response/response-json-selector/) przyjmuje argument wg [syntaktyki GJSON](https://github.com/tidwall/gjson#path-syntax). Oto przykładowy obiekt:

```javascript
{
  "name": {"first": "Tom", "last": "Anderson"},
  "age":37,
  "children": ["Sara","Alex","Jack"],
  "fav.movie": "Deer Hunter",
  "friends": [
    {"first": "Dale", "last": "Murphy", "age": 44, "nets": ["ig", "fb", "tw"]},
    {"first": "Roger", "last": "Craig", "age": 68, "nets": ["fb", "tw"]},
    {"first": "Jane", "last": "Murphy", "age": 47, "nets": ["ig", "tw"]}
  ]
}
```
i zapytania w tym języku:

```"name.last"          >> "Anderson"
"age"                >> 37
"children"           >> ["Sara","Alex","Jack"]
"children.#"         >> 3
"children.1"         >> "Alex"
"child*.2"           >> "Jack"
"c?ildren.0"         >> "Sara"
"fav\.movie"         >> "Deer Hunter"
"friends.#.first"    >> ["Dale","Roger","Jane"]
"friends.1.last"     >> "Craig"```
